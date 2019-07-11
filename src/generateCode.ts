import { Project, Symbol, Type, TypeGuards, FunctionDeclarationStructure,
    CodeBlockWriter, VariableStatementStructure, StructureKind, VariableDeclarationKind, ts, MemberExpression } from "ts-morph";
import { Factory, FactoryFunction, Parameter, Node, NodeProperty } from "./compilerApi";

export function generateCode(typeScriptModuleName = "typescript") {
    const indentText = "  ";
    const newlineText = "\\n";
    const factory = new Factory();
    const project = new Project();
    const newSourceFile = project.createSourceFile("____temp___.ts");
    const tsSourceFile = project.addExistingSourceFile(`node_modules/${typeScriptModuleName}/lib/typescript.d.ts`);
    const tsSymbol = tsSourceFile.getNamespaceOrThrow("ts").getSymbolOrThrow();
    const tsNodeSymbol = tsSymbol.getExportOrThrow("Node");

    const factoryFunctions = Array.from(getFactoryFunctions());

    const functionStructures = factoryFunctions.map(getFunctionStructure);
    newSourceFile.addStatements([{
        kind: StructureKind.ImportDeclaration,
        namespaceImport: "tsCompiler",
        moduleSpecifier: "typescript"
    }, {
        kind: StructureKind.Function,
        name: "generate",
        parameters: [{ name: "ts", type: "typeof tsCompiler" }, { name: "sourceFile", type: `(typeof ts)["SourceFile"]` }],
        statements: [writer => {
                writer.writeLine("const syntaxKindToName = createSyntaxKindToNameMap();");
                writer.writeLine("return getNodeText(sourceFile);");
            },
            getNodeTextFunction(),
            ...functionStructures,
            getSyntaxKindToNameFunction(),
            getFlagValuesFunction()
        ]
    }]);

    return newSourceFile.getFullText();

    function getFactoryFunctions() {
        const map = new Map<string, FactoryFunction>();
        for (const func of getInternal()) {
            for (const name of func.getNode().getKindNames()) {
                if (map.has(name))
                    throw new Error(`Found duplicate name: ${name} (existing: ${map.get(name)!.getName()}, new: ${func.getName()})`);
                map.set(name, func);
            }
        }
        return map.values();

        function* getInternal(): IterableIterator<FactoryFunction> {
            for (const symbol of tsSymbol.getExports()) {
                if (!symbol.getName().startsWith("create"))
                    continue;
                const valueDec = symbol.getValueDeclaration();
                if (valueDec == null || !TypeGuards.isFunctionDeclaration(valueDec))
                    continue;
                const returnType = valueDec.getReturnType();
                if (returnType.getProperty("kind") == null)
                    continue;
                //console.log(symbol.getName() + ": " + returnType.getText());
                const factoryFunction = factory.getFactoryFunction(valueDec);
                if (isAllowedFactoryFunction(factoryFunction))
                    yield factoryFunction;
            }
        }
    }

    function getNodeTextFunction(): FunctionDeclarationStructure {
        return {
            kind: StructureKind.Function,
            name: "getNodeText",
            parameters: [{ name: "node", type: "ts.Node" }],
            statements: writer => {
                writer.write("switch (node.kind)").block(() => {
                    for (const factoryFunc of factoryFunctions) {
                        for (const kindName of factoryFunc.getNode().getKindNames())
                            writer.writeLine(`case ts.SyntaxKind.${kindName}:`);
                        writer.indent().write(`return get${factoryFunc.getNode().getName()}(node);`).newLine();
                    }
                    writer.writeLine(`default:`);
                    writer.indent().write("throw new Error(").quote("Unhandled node kind: ").write(" + node.kind);").newLine();
                });
            }
        };
    }

    function getFunctionStructure(func: FactoryFunction): FunctionDeclarationStructure {
        return {
            kind: StructureKind.Function,
            name: `get${func.getNode().getName()}`,
            parameters: [{ name: "node", type: `ts.${func.getNode().getName()}` }],
            statements: writer => printBody(writer)
        };

        function printBody(writer: CodeBlockWriter) {
            const params = func.getParameters();
            writer.write(`return "ts.${func.getName()}("${newlineText}`).newLine();
            writer.indentBlock(() => {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if (i > 0)
                        writer.write(` + ",${newlineText}\"`).newLine();
                    writer.write(`+ "${indentText}" + `);
                    printParamText(writer, param);
                }
            });
            writer.write(`+ "${newlineText});";`);
        }

        function printParamText(writer: CodeBlockWriter, param: Parameter) {
            const customParamText = getCustomParamText(func, param);
            if (customParamText) {
                writer.write(customParamText);
                return;
            }
            const prop = func.getNode().getPropertyForParam(param);
            const propAccess = `node.${prop.getName()}`;

            if (prop.getType().isNullable())
                writer.write(`${propAccess} == null ? undefined : `);

            writeTypeText();

            if (param.getType().isNullable() && !prop.getType().isNullable()) {
                if (param.isArray())
                    writer.write("[]");
            }

            function writeTypeText() {
                if (param.isArray()) {
                    const arrayElementType = param.getArrayElementType()!;
                    writer.write(`"[${newlineText}"`);
                    writer.write(` + "${newlineText}${indentText}" + ${propAccess}.map(item => ${getTextForType("item", arrayElementType)}).join(",${newlineText}${indentText}")`)
                    writer.write(` + "${newlineText}]"`);
                }
                else {
                    writer.write(getTextForType(propAccess, param.getType()));
                }
            }

            // todo: rename
            function getTextForType(text: string, type: Type) {
                if (isNodeType())
                    return `getNodeText(${text})`
                else if (isSyntaxKindType())
                    return `syntaxKindToName[${text}]`;
                else if (type.isString() || type.isStringLiteral() || type.isBoolean() || type.isBooleanLiteral())
                    return text;
                else if (type.getText().endsWith(".NodeFlags"))
                    return `getFlagValues(NodeFlags, "NodeFlags", ${text} || 0)`;
                else {
                    return text;
                }

                function isSyntaxKindType() {
                    // good enough...
                    return isSyntaxKind(type) || type.getUnionTypes().some(isSyntaxKind);

                    function isSyntaxKind(t: Type) {
                        return (t.isEnum() || t.isEnumLiteral()) && t.getText().includes(".SyntaxKind");
                    }
                }

                function isNodeType() {
                    // always default to using the node union type
                    return type.getProperty("kind") != null
                        || type.getUnionTypes().some(t => t.getProperty("kind") != null);
                }
            }
        }
    }

    function getSyntaxKindToNameFunction(): FunctionDeclarationStructure {
        return {
            kind: StructureKind.Function,
            name: "createSyntaxKindToNameMap",
            statements: writer => {
                writer.writeLine("const map: { [kind: number]: string } = {};");
                writer.write("for (const name of Object.keys(ts.SyntaxKind).filter(k => isNaN(parseInt(k, 10)))").block(() => {

                    writer.writeLine(`const value = (ts.SyntaxKind as any)[name] as number;`);
                    writer.writeLine(`if (map[value] == null)`);
                    writer.indent().write(`map[value] = name;`).newLine();
                });
                writer.write("return map;")
            }
        }
    }

    function getFlagValuesFunction(): FunctionDeclarationStructure {
        return {
            kind: StructureKind.Function,
            name: "getFlagValues",
            parameters: [
                { name: "enumObj", type: "any" },
                { name: "enumName", type: "text" },
                { name: "value", type: "number" }
            ],
            statements: writer => {
                writer.writeLine("const members: string[] = [];");
                writer.write("for (const prop in enumObj)").block(() => {
                    writer.writeLine(`if (typeof enumObj[prop] === "string")`);
                    writer.indent().write("continue;").newLine();
                    writer.write("if (enumObj[prop] & enumObj !== 0)")
                    writer.indent().write(`members.push(enumName + "." + prop);`).newLine();
                });
                writer.writeLine("return members;");
            }
        }
    }
}

function getCustomParamText(func: FactoryFunction, param: Parameter) {
    if (func.getName() === "createNumericLiteral" && param.getName() === "numericLiteralFlags")
        return handleNumericLiteralFlags();

    return undefined;

    function handleNumericLiteralFlags() {
        return `getFlagValues(TokenFlags, "TokenFlags", (node as any).numericLiteralFlags || 0)`;
    }
}

function isAllowedFactoryFunction(func: FactoryFunction) {
    switch (func.getName()) {
        case nameof(ts.createNode):
        case nameof(ts.createSourceFile):
        case nameof(ts.createLanguageServiceSourceFile):
        case nameof(ts.createLiteral):
        case nameof(ts.createTempVariable):
        case nameof(ts.createLoopVariable):
        case nameof(ts.createUniqueName):
        case nameof(ts.createOptimisticUniqueName):
        case nameof(ts.createFileLevelUniqueName):
        case nameof(ts.createToken):
        case nameof(ts.createModifier):
        case nameof(ts.createModifiersFromModifierFlags):
        case nameof(ts.createVoidZero):
        case nameof(ts.createLogicalAnd):
        case nameof(ts.createLogicalOr):
        case nameof(ts.createLogicalNot):
        case nameof(ts.createAdd):
        case nameof(ts.createSubtract):
        case nameof(ts.createStrictEquality):
        case nameof(ts.createStrictInequality):
        case nameof(ts.createLessThan):
        case nameof(ts.createComma):
        case nameof(ts.createImmediatelyInvokedFunctionExpression):
        case nameof(ts.createImmediatelyInvokedArrowFunction):
        case nameof(ts.createInputFiles):
        case nameof(ts.createBundle):
        case nameof(ts.createUnparsedSourceFile):
        case nameof(ts.createPostfixIncrement):
        case nameof(ts.createExternalModuleExport):
            return false;
    }

    return func.isNodeValid();
}