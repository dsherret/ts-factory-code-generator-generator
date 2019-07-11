import { Project, Symbol, Type, TypeGuards, FunctionDeclarationStructure, CodeBlockWriter, VariableStatementStructure, StructureKind, VariableDeclarationKind } from "ts-morph";
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
            getSyntaxKindToNameFunction()
        ]
    }]);

    return newSourceFile.getFullText();

    function* getFactoryFunctions(): IterableIterator<FactoryFunction> {
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

    function getNodeTextFunction(): FunctionDeclarationStructure {
        return {
            kind: StructureKind.Function,
            name: "getNodeText",
            parameters: [{ name: "node", type: "ts.Node" }],
            statements: writer => {
                writer.write("switch (node.kind)").block(() => {
                    for (const factoryFunc of factoryFunctions) {
                        writer.writeLine(`case ts.SyntaxKind.${factoryFunc.getNode().getKindName()}:`);
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
            writer.write(`return "ts.${func.getName()}("`).newLine();
            writer.indentBlock(() => {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if (i > 0)
                        writer.write(` + ",${newlineText}\"`).newLine();
                    writer.write(`+ "${indentText}" + `);
                    printParamText(writer, param);
                }
            });
            writer.write(`+ ");";`);
        }

        function printParamText(writer: CodeBlockWriter, param: Parameter) {
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
                if (type.getProperty("kind") != null)
                    return `getNodeText(${text})`
                else if (isSyntaxKindType())
                    return `syntaxKindToName[${text}]`;
                else
                    return text;

                function isSyntaxKindType() {
                    // todo: not correct
                    return type.isEnum() || type.isEnumLiteral() || type.getUnionTypes().length > 0 && type.getUnionTypes().some(t => t.isEnum() || t.isEnumLiteral())
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
}

function isAllowedFactoryFunction(func: FactoryFunction) {
    switch (func.getName()) {
        case "createNode":
            return false;
    }
    return func.isNodeValid();
}