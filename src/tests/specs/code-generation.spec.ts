import CodeBlockWriter from "code-block-writer";

export function generateFactoryCode(ts: typeof import("typescript-3.5.3"), initialNode: import("typescript-3.5.3").Node) {
    const writer = new CodeBlockWriter({ newLine: "\n", indentNumberOfSpaces: 2 });
    const syntaxKindToName = createSyntaxKindToNameMap();

    if (ts.isSourceFile(initialNode)) {
        writer.write("[");
        if (initialNode.statements.length > 0) {
            writer.indentBlock(() => {
                for (let i = 0; i < initialNode.statements.length; i++) {
                    const statement = initialNode.statements[i];
                    if (i > 0)
                        writer.write(",");
                    writer.newLine();
                    writeNodeText(statement);
                }
            }).newLine();
        }
        writer.write("];");
    }
    else {
        writeNodeText(initialNode);
    }

    return writer.toString();

    function writeNodeText(node: import("typescript-3.5.3").Node) {
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
                createNumericLiteral(node as import("typescript-3.5.3").NumericLiteral);
            case ts.SyntaxKind.BigIntLiteral:
                createBigIntLiteral(node as import("typescript-3.5.3").BigIntLiteral);
            case ts.SyntaxKind.StringLiteral:
                createStringLiteral(node as import("typescript-3.5.3").StringLiteral);
            case ts.SyntaxKind.RegularExpressionLiteral:
                createRegularExpressionLiteral(node as import("typescript-3.5.3").RegularExpressionLiteral);
            case ts.SyntaxKind.Identifier:
                createIdentifier(node as import("typescript-3.5.3").Identifier);
            case ts.SyntaxKind.SuperKeyword:
                createSuper(node as import("typescript-3.5.3").SuperExpression);
            case ts.SyntaxKind.ThisKeyword:
                createThis(node as import("typescript-3.5.3").ThisExpression);
            case ts.SyntaxKind.NullKeyword:
                createNull(node as import("typescript-3.5.3").NullLiteral);
            case ts.SyntaxKind.TrueKeyword:
                createTrue(node as import("typescript-3.5.3").BooleanLiteral);
            case ts.SyntaxKind.FalseKeyword:
                createFalse(node as import("typescript-3.5.3").BooleanLiteral);
            case ts.SyntaxKind.QualifiedName:
                createQualifiedName(node as import("typescript-3.5.3").QualifiedName);
            case ts.SyntaxKind.ComputedPropertyName:
                createComputedPropertyName(node as import("typescript-3.5.3").ComputedPropertyName);
            case ts.SyntaxKind.TypeParameter:
                createTypeParameterDeclaration(node as import("typescript-3.5.3").TypeParameterDeclaration);
            case ts.SyntaxKind.Parameter:
                createParameter(node as import("typescript-3.5.3").ParameterDeclaration);
            case ts.SyntaxKind.Decorator:
                createDecorator(node as import("typescript-3.5.3").Decorator);
            case ts.SyntaxKind.PropertySignature:
                createPropertySignature(node as import("typescript-3.5.3").PropertySignature);
            case ts.SyntaxKind.PropertyDeclaration:
                createProperty(node as import("typescript-3.5.3").PropertyDeclaration);
            case ts.SyntaxKind.MethodSignature:
                createMethodSignature(node as import("typescript-3.5.3").MethodSignature);
            case ts.SyntaxKind.MethodDeclaration:
                createMethod(node as import("typescript-3.5.3").MethodDeclaration);
            case ts.SyntaxKind.Constructor:
                createConstructor(node as import("typescript-3.5.3").ConstructorDeclaration);
            case ts.SyntaxKind.GetAccessor:
                createGetAccessor(node as import("typescript-3.5.3").GetAccessorDeclaration);
            case ts.SyntaxKind.SetAccessor:
                createSetAccessor(node as import("typescript-3.5.3").SetAccessorDeclaration);
            case ts.SyntaxKind.CallSignature:
                createCallSignature(node as import("typescript-3.5.3").CallSignatureDeclaration);
            case ts.SyntaxKind.ConstructSignature:
                createConstructSignature(node as import("typescript-3.5.3").ConstructSignatureDeclaration);
            case ts.SyntaxKind.IndexSignature:
                createIndexSignature(node as import("typescript-3.5.3").IndexSignatureDeclaration);
            case ts.SyntaxKind.VoidKeyword:
            case ts.SyntaxKind.AnyKeyword:
            case ts.SyntaxKind.BooleanKeyword:
            case ts.SyntaxKind.NeverKeyword:
            case ts.SyntaxKind.NumberKeyword:
            case ts.SyntaxKind.ObjectKeyword:
            case ts.SyntaxKind.StringKeyword:
            case ts.SyntaxKind.SymbolKeyword:
            case ts.SyntaxKind.UndefinedKeyword:
            case ts.SyntaxKind.UnknownKeyword:
            case ts.SyntaxKind.BigIntKeyword:
                createKeywordTypeNode(node as import("typescript-3.5.3").KeywordTypeNode);
            case ts.SyntaxKind.TypePredicate:
                createTypePredicateNode(node as import("typescript-3.5.3").TypePredicateNode);
            case ts.SyntaxKind.TypeReference:
                createTypeReferenceNode(node as import("typescript-3.5.3").TypeReferenceNode);
            case ts.SyntaxKind.FunctionType:
                createFunctionTypeNode(node as import("typescript-3.5.3").FunctionTypeNode);
            case ts.SyntaxKind.ConstructorType:
                createConstructorTypeNode(node as import("typescript-3.5.3").ConstructorTypeNode);
            case ts.SyntaxKind.TypeQuery:
                createTypeQueryNode(node as import("typescript-3.5.3").TypeQueryNode);
            case ts.SyntaxKind.TypeLiteral:
                createTypeLiteralNode(node as import("typescript-3.5.3").TypeLiteralNode);
            case ts.SyntaxKind.ArrayType:
                createArrayTypeNode(node as import("typescript-3.5.3").ArrayTypeNode);
            case ts.SyntaxKind.TupleType:
                createTupleTypeNode(node as import("typescript-3.5.3").TupleTypeNode);
            case ts.SyntaxKind.OptionalType:
                createOptionalTypeNode(node as import("typescript-3.5.3").OptionalTypeNode);
            case ts.SyntaxKind.RestType:
                createRestTypeNode(node as import("typescript-3.5.3").RestTypeNode);
            case ts.SyntaxKind.UnionType:
                createUnionTypeNode(node as import("typescript-3.5.3").UnionTypeNode);
            case ts.SyntaxKind.IntersectionType:
                createIntersectionTypeNode(node as import("typescript-3.5.3").IntersectionTypeNode);
            case ts.SyntaxKind.ConditionalType:
                createConditionalTypeNode(node as import("typescript-3.5.3").ConditionalTypeNode);
            case ts.SyntaxKind.InferType:
                createInferTypeNode(node as import("typescript-3.5.3").InferTypeNode);
            case ts.SyntaxKind.ImportType:
                createImportTypeNode(node as import("typescript-3.5.3").ImportTypeNode);
            case ts.SyntaxKind.ParenthesizedType:
                createParenthesizedType(node as import("typescript-3.5.3").ParenthesizedTypeNode);
            case ts.SyntaxKind.ThisType:
                createThisTypeNode(node as import("typescript-3.5.3").ThisTypeNode);
            case ts.SyntaxKind.TypeOperator:
                createTypeOperatorNode(node as import("typescript-3.5.3").TypeOperatorNode);
            case ts.SyntaxKind.IndexedAccessType:
                createIndexedAccessTypeNode(node as import("typescript-3.5.3").IndexedAccessTypeNode);
            case ts.SyntaxKind.MappedType:
                createMappedTypeNode(node as import("typescript-3.5.3").MappedTypeNode);
            case ts.SyntaxKind.LiteralType:
                createLiteralTypeNode(node as import("typescript-3.5.3").LiteralTypeNode);
            case ts.SyntaxKind.ObjectBindingPattern:
                createObjectBindingPattern(node as import("typescript-3.5.3").ObjectBindingPattern);
            case ts.SyntaxKind.ArrayBindingPattern:
                createArrayBindingPattern(node as import("typescript-3.5.3").ArrayBindingPattern);
            case ts.SyntaxKind.BindingElement:
                createBindingElement(node as import("typescript-3.5.3").BindingElement);
            case ts.SyntaxKind.ArrayLiteralExpression:
                createArrayLiteral(node as import("typescript-3.5.3").ArrayLiteralExpression);
            case ts.SyntaxKind.ObjectLiteralExpression:
                createObjectLiteral(node as import("typescript-3.5.3").ObjectLiteralExpression);
            case ts.SyntaxKind.PropertyAccessExpression:
                createPropertyAccess(node as import("typescript-3.5.3").PropertyAccessExpression);
            case ts.SyntaxKind.ElementAccessExpression:
                createElementAccess(node as import("typescript-3.5.3").ElementAccessExpression);
            case ts.SyntaxKind.CallExpression:
                createCall(node as import("typescript-3.5.3").CallExpression);
            case ts.SyntaxKind.NewExpression:
                createNew(node as import("typescript-3.5.3").NewExpression);
            case ts.SyntaxKind.TaggedTemplateExpression:
                createTaggedTemplate(node as import("typescript-3.5.3").TaggedTemplateExpression);
            case ts.SyntaxKind.TypeAssertionExpression:
                createTypeAssertion(node as import("typescript-3.5.3").TypeAssertion);
            case ts.SyntaxKind.ParenthesizedExpression:
                createParen(node as import("typescript-3.5.3").ParenthesizedExpression);
            case ts.SyntaxKind.FunctionExpression:
                createFunctionExpression(node as import("typescript-3.5.3").FunctionExpression);
            case ts.SyntaxKind.ArrowFunction:
                createArrowFunction(node as import("typescript-3.5.3").ArrowFunction);
            case ts.SyntaxKind.DeleteExpression:
                createDelete(node as import("typescript-3.5.3").DeleteExpression);
            case ts.SyntaxKind.TypeOfExpression:
                createTypeOf(node as import("typescript-3.5.3").TypeOfExpression);
            case ts.SyntaxKind.VoidExpression:
                createVoid(node as import("typescript-3.5.3").VoidExpression);
            case ts.SyntaxKind.AwaitExpression:
                createAwait(node as import("typescript-3.5.3").AwaitExpression);
            case ts.SyntaxKind.PrefixUnaryExpression:
                createPrefix(node as import("typescript-3.5.3").PrefixUnaryExpression);
            case ts.SyntaxKind.PostfixUnaryExpression:
                createPostfix(node as import("typescript-3.5.3").PostfixUnaryExpression);
            case ts.SyntaxKind.BinaryExpression:
                createBinary(node as import("typescript-3.5.3").BinaryExpression);
            case ts.SyntaxKind.ConditionalExpression:
                createConditional(node as import("typescript-3.5.3").ConditionalExpression);
            case ts.SyntaxKind.TemplateExpression:
                createTemplateExpression(node as import("typescript-3.5.3").TemplateExpression);
            case ts.SyntaxKind.TemplateHead:
                createTemplateHead(node as import("typescript-3.5.3").TemplateHead);
            case ts.SyntaxKind.TemplateMiddle:
                createTemplateMiddle(node as import("typescript-3.5.3").TemplateMiddle);
            case ts.SyntaxKind.TemplateTail:
                createTemplateTail(node as import("typescript-3.5.3").TemplateTail);
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                createNoSubstitutionTemplateLiteral(node as import("typescript-3.5.3").NoSubstitutionTemplateLiteral);
            case ts.SyntaxKind.YieldExpression:
                createYield(node as import("typescript-3.5.3").YieldExpression);
            case ts.SyntaxKind.SpreadElement:
                createSpread(node as import("typescript-3.5.3").SpreadElement);
            case ts.SyntaxKind.ClassExpression:
                createClassExpression(node as import("typescript-3.5.3").ClassExpression);
            case ts.SyntaxKind.OmittedExpression:
                createOmittedExpression(node as import("typescript-3.5.3").OmittedExpression);
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                createExpressionWithTypeArguments(node as import("typescript-3.5.3").ExpressionWithTypeArguments);
            case ts.SyntaxKind.AsExpression:
                createAsExpression(node as import("typescript-3.5.3").AsExpression);
            case ts.SyntaxKind.NonNullExpression:
                createNonNullExpression(node as import("typescript-3.5.3").NonNullExpression);
            case ts.SyntaxKind.MetaProperty:
                createMetaProperty(node as import("typescript-3.5.3").MetaProperty);
            case ts.SyntaxKind.TemplateSpan:
                createTemplateSpan(node as import("typescript-3.5.3").TemplateSpan);
            case ts.SyntaxKind.SemicolonClassElement:
                createSemicolonClassElement(node as import("typescript-3.5.3").SemicolonClassElement);
            case ts.SyntaxKind.Block:
                createBlock(node as import("typescript-3.5.3").Block);
            case ts.SyntaxKind.VariableStatement:
                createVariableStatement(node as import("typescript-3.5.3").VariableStatement);
            case ts.SyntaxKind.EmptyStatement:
                createEmptyStatement(node as import("typescript-3.5.3").EmptyStatement);
            case ts.SyntaxKind.ExpressionStatement:
                createExpressionStatement(node as import("typescript-3.5.3").ExpressionStatement);
            case ts.SyntaxKind.IfStatement:
                createIf(node as import("typescript-3.5.3").IfStatement);
            case ts.SyntaxKind.DoStatement:
                createDo(node as import("typescript-3.5.3").DoStatement);
            case ts.SyntaxKind.WhileStatement:
                createWhile(node as import("typescript-3.5.3").WhileStatement);
            case ts.SyntaxKind.ForStatement:
                createFor(node as import("typescript-3.5.3").ForStatement);
            case ts.SyntaxKind.ForInStatement:
                createForIn(node as import("typescript-3.5.3").ForInStatement);
            case ts.SyntaxKind.ForOfStatement:
                createForOf(node as import("typescript-3.5.3").ForOfStatement);
            case ts.SyntaxKind.ContinueStatement:
                createContinue(node as import("typescript-3.5.3").ContinueStatement);
            case ts.SyntaxKind.BreakStatement:
                createBreak(node as import("typescript-3.5.3").BreakStatement);
            case ts.SyntaxKind.ReturnStatement:
                createReturn(node as import("typescript-3.5.3").ReturnStatement);
            case ts.SyntaxKind.WithStatement:
                createWith(node as import("typescript-3.5.3").WithStatement);
            case ts.SyntaxKind.SwitchStatement:
                createSwitch(node as import("typescript-3.5.3").SwitchStatement);
            case ts.SyntaxKind.LabeledStatement:
                createLabel(node as import("typescript-3.5.3").LabeledStatement);
            case ts.SyntaxKind.ThrowStatement:
                createThrow(node as import("typescript-3.5.3").ThrowStatement);
            case ts.SyntaxKind.TryStatement:
                createTry(node as import("typescript-3.5.3").TryStatement);
            case ts.SyntaxKind.DebuggerStatement:
                createDebuggerStatement(node as import("typescript-3.5.3").DebuggerStatement);
            case ts.SyntaxKind.VariableDeclaration:
                createVariableDeclaration(node as import("typescript-3.5.3").VariableDeclaration);
            case ts.SyntaxKind.VariableDeclarationList:
                createVariableDeclarationList(node as import("typescript-3.5.3").VariableDeclarationList);
            case ts.SyntaxKind.FunctionDeclaration:
                createFunctionDeclaration(node as import("typescript-3.5.3").FunctionDeclaration);
            case ts.SyntaxKind.ClassDeclaration:
                createClassDeclaration(node as import("typescript-3.5.3").ClassDeclaration);
            case ts.SyntaxKind.InterfaceDeclaration:
                createInterfaceDeclaration(node as import("typescript-3.5.3").InterfaceDeclaration);
            case ts.SyntaxKind.TypeAliasDeclaration:
                createTypeAliasDeclaration(node as import("typescript-3.5.3").TypeAliasDeclaration);
            case ts.SyntaxKind.EnumDeclaration:
                createEnumDeclaration(node as import("typescript-3.5.3").EnumDeclaration);
            case ts.SyntaxKind.ModuleDeclaration:
                createModuleDeclaration(node as import("typescript-3.5.3").ModuleDeclaration);
            case ts.SyntaxKind.ModuleBlock:
                createModuleBlock(node as import("typescript-3.5.3").ModuleBlock);
            case ts.SyntaxKind.CaseBlock:
                createCaseBlock(node as import("typescript-3.5.3").CaseBlock);
            case ts.SyntaxKind.NamespaceExportDeclaration:
                createNamespaceExportDeclaration(node as import("typescript-3.5.3").NamespaceExportDeclaration);
            case ts.SyntaxKind.ImportEqualsDeclaration:
                createImportEqualsDeclaration(node as import("typescript-3.5.3").ImportEqualsDeclaration);
            case ts.SyntaxKind.ImportDeclaration:
                createImportDeclaration(node as import("typescript-3.5.3").ImportDeclaration);
            case ts.SyntaxKind.ImportClause:
                createImportClause(node as import("typescript-3.5.3").ImportClause);
            case ts.SyntaxKind.NamespaceImport:
                createNamespaceImport(node as import("typescript-3.5.3").NamespaceImport);
            case ts.SyntaxKind.NamedImports:
                createNamedImports(node as import("typescript-3.5.3").NamedImports);
            case ts.SyntaxKind.ImportSpecifier:
                createImportSpecifier(node as import("typescript-3.5.3").ImportSpecifier);
            case ts.SyntaxKind.ExportAssignment:
                createExportAssignment(node as import("typescript-3.5.3").ExportAssignment);
            case ts.SyntaxKind.ExportDeclaration:
                createExportDeclaration(node as import("typescript-3.5.3").ExportDeclaration);
            case ts.SyntaxKind.NamedExports:
                createNamedExports(node as import("typescript-3.5.3").NamedExports);
            case ts.SyntaxKind.ExportSpecifier:
                createExportSpecifier(node as import("typescript-3.5.3").ExportSpecifier);
            case ts.SyntaxKind.ExternalModuleReference:
                createExternalModuleReference(node as import("typescript-3.5.3").ExternalModuleReference);
            case ts.SyntaxKind.JsxElement:
                createJsxElement(node as import("typescript-3.5.3").JsxElement);
            case ts.SyntaxKind.JsxSelfClosingElement:
                createJsxSelfClosingElement(node as import("typescript-3.5.3").JsxSelfClosingElement);
            case ts.SyntaxKind.JsxOpeningElement:
                createJsxOpeningElement(node as import("typescript-3.5.3").JsxOpeningElement);
            case ts.SyntaxKind.JsxClosingElement:
                createJsxClosingElement(node as import("typescript-3.5.3").JsxClosingElement);
            case ts.SyntaxKind.JsxFragment:
                createJsxFragment(node as import("typescript-3.5.3").JsxFragment);
            case ts.SyntaxKind.JsxText:
                createJsxText(node as import("typescript-3.5.3").JsxText);
            case ts.SyntaxKind.JsxOpeningFragment:
                createJsxOpeningFragment(node as import("typescript-3.5.3").JsxOpeningFragment);
            case ts.SyntaxKind.JsxClosingFragment:
                createJsxJsxClosingFragment(node as import("typescript-3.5.3").JsxClosingFragment);
            case ts.SyntaxKind.JsxAttribute:
                createJsxAttribute(node as import("typescript-3.5.3").JsxAttribute);
            case ts.SyntaxKind.JsxAttributes:
                createJsxAttributes(node as import("typescript-3.5.3").JsxAttributes);
            case ts.SyntaxKind.JsxSpreadAttribute:
                createJsxSpreadAttribute(node as import("typescript-3.5.3").JsxSpreadAttribute);
            case ts.SyntaxKind.JsxExpression:
                createJsxExpression(node as import("typescript-3.5.3").JsxExpression);
            case ts.SyntaxKind.CaseClause:
                createCaseClause(node as import("typescript-3.5.3").CaseClause);
            case ts.SyntaxKind.DefaultClause:
                createDefaultClause(node as import("typescript-3.5.3").DefaultClause);
            case ts.SyntaxKind.HeritageClause:
                createHeritageClause(node as import("typescript-3.5.3").HeritageClause);
            case ts.SyntaxKind.CatchClause:
                createCatchClause(node as import("typescript-3.5.3").CatchClause);
            case ts.SyntaxKind.PropertyAssignment:
                createPropertyAssignment(node as import("typescript-3.5.3").PropertyAssignment);
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                createShorthandPropertyAssignment(node as import("typescript-3.5.3").ShorthandPropertyAssignment);
            case ts.SyntaxKind.SpreadAssignment:
                createSpreadAssignment(node as import("typescript-3.5.3").SpreadAssignment);
            case ts.SyntaxKind.EnumMember:
                createEnumMember(node as import("typescript-3.5.3").EnumMember);
            case ts.SyntaxKind.CommaListExpression:
                createCommaList(node as import("typescript-3.5.3").CommaListExpression);
            default:
                throw new Error("Unhandled node kind: " + syntaxKindToName[node.kind]);
        }
    }

    function createNumericLiteral(node: import("typescript-3.5.3").NumericLiteral) {
        writer.write("ts.createNumericLiteral(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            getFlagValues(ts.TokenFlags, "TokenFlags", (node as any).numericLiteralFlags || 0)
        });
        writer.write(")");
    }

    function createBigIntLiteral(node: import("typescript-3.5.3").BigIntLiteral) {
        writer.write("ts.createBigIntLiteral(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createStringLiteral(node: import("typescript-3.5.3").StringLiteral) {
        writer.write("ts.createStringLiteral(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createRegularExpressionLiteral(node: import("typescript-3.5.3").RegularExpressionLiteral) {
        writer.write("ts.createRegularExpressionLiteral(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createIdentifier(node: import("typescript-3.5.3").Identifier) {
        writer.write("ts.createIdentifier(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createSuper(node: import("typescript-3.5.3").SuperExpression) {
        writer.write("ts.createSuper(");
        writer.write(")");
    }

    function createThis(node: import("typescript-3.5.3").ThisExpression) {
        writer.write("ts.createThis(");
        writer.write(")");
    }

    function createNull(node: import("typescript-3.5.3").NullLiteral) {
        writer.write("ts.createNull(");
        writer.write(")");
    }

    function createTrue(node: import("typescript-3.5.3").BooleanLiteral) {
        writer.write("ts.createTrue(");
        writer.write(")");
    }

    function createFalse(node: import("typescript-3.5.3").BooleanLiteral) {
        writer.write("ts.createFalse(");
        writer.write(")");
    }

    function createQualifiedName(node: import("typescript-3.5.3").QualifiedName) {
        writer.write("ts.createQualifiedName(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.left)
            writer.write(",").newLine();
            writeNodeText(node.right)
        });
        writer.write(")");
    }

    function createComputedPropertyName(node: import("typescript-3.5.3").ComputedPropertyName) {
        writer.write("ts.createComputedPropertyName(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createTypeParameterDeclaration(node: import("typescript-3.5.3").TypeParameterDeclaration) {
        writer.write("ts.createTypeParameterDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.constraint == null)
                writer.write("undefined");
            else {
                writeNodeText(node.constraint)
            }
            writer.write(",").newLine();
            if (node.default == null)
                writer.write("undefined");
            else {
                writeNodeText(node.default)
            }
        });
        writer.write(")");
    }

    function createParameter(node: import("typescript-3.5.3").ParameterDeclaration) {
        writer.write("ts.createParameter(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createDecorator(node: import("typescript-3.5.3").Decorator) {
        writer.write("ts.createDecorator(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createPropertySignature(node: import("typescript-3.5.3").PropertySignature) {
        writer.write("ts.createPropertySignature(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createProperty(node: import("typescript-3.5.3").PropertyDeclaration) {
        writer.write("ts.createProperty(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            node.questionToken || node.exclamationToken
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createMethodSignature(node: import("typescript-3.5.3").MethodSignature) {
        writer.write("ts.createMethodSignature(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
        });
        writer.write(")");
    }

    function createMethod(node: import("typescript-3.5.3").MethodDeclaration) {
        writer.write("ts.createMethod(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createConstructor(node: import("typescript-3.5.3").ConstructorDeclaration) {
        writer.write("ts.createConstructor(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createGetAccessor(node: import("typescript-3.5.3").GetAccessorDeclaration) {
        writer.write("ts.createGetAccessor(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createSetAccessor(node: import("typescript-3.5.3").SetAccessorDeclaration) {
        writer.write("ts.createSetAccessor(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createCallSignature(node: import("typescript-3.5.3").CallSignatureDeclaration) {
        writer.write("ts.createCallSignature(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createConstructSignature(node: import("typescript-3.5.3").ConstructSignatureDeclaration) {
        writer.write("ts.createConstructSignature(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createIndexSignature(node: import("typescript-3.5.3").IndexSignatureDeclaration) {
        writer.write("ts.createIndexSignature(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createKeywordTypeNode(node: import("typescript-3.5.3").KeywordTypeNode) {
        writer.write("ts.createKeywordTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write(syntaxKindToName[node.kind])
        });
        writer.write(")");
    }

    function createTypePredicateNode(node: import("typescript-3.5.3").TypePredicateNode) {
        writer.write("ts.createTypePredicateNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.parameterName)
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createTypeReferenceNode(node: import("typescript-3.5.3").TypeReferenceNode) {
        writer.write("ts.createTypeReferenceNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.typeName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createFunctionTypeNode(node: import("typescript-3.5.3").FunctionTypeNode) {
        writer.write("ts.createFunctionTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createConstructorTypeNode(node: import("typescript-3.5.3").ConstructorTypeNode) {
        writer.write("ts.createConstructorTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createTypeQueryNode(node: import("typescript-3.5.3").TypeQueryNode) {
        writer.write("ts.createTypeQueryNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.exprName)
        });
        writer.write(")");
    }

    function createTypeLiteralNode(node: import("typescript-3.5.3").TypeLiteralNode) {
        writer.write("ts.createTypeLiteralNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.members.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createArrayTypeNode(node: import("typescript-3.5.3").ArrayTypeNode) {
        writer.write("ts.createArrayTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.elementType)
        });
        writer.write(")");
    }

    function createTupleTypeNode(node: import("typescript-3.5.3").TupleTypeNode) {
        writer.write("ts.createTupleTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.elementTypes.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.elementTypes!.length; i++) {
                        const item = node.elementTypes![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createOptionalTypeNode(node: import("typescript-3.5.3").OptionalTypeNode) {
        writer.write("ts.createOptionalTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createRestTypeNode(node: import("typescript-3.5.3").RestTypeNode) {
        writer.write("ts.createRestTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createUnionTypeNode(node: import("typescript-3.5.3").UnionTypeNode) {
        writer.write("ts.createUnionTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.types.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.types!.length; i++) {
                        const item = node.types![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createIntersectionTypeNode(node: import("typescript-3.5.3").IntersectionTypeNode) {
        writer.write("ts.createIntersectionTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.types.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.types!.length; i++) {
                        const item = node.types![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createConditionalTypeNode(node: import("typescript-3.5.3").ConditionalTypeNode) {
        writer.write("ts.createConditionalTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.checkType)
            writer.write(",").newLine();
            writeNodeText(node.extendsType)
            writer.write(",").newLine();
            writeNodeText(node.trueType)
            writer.write(",").newLine();
            writeNodeText(node.falseType)
        });
        writer.write(")");
    }

    function createInferTypeNode(node: import("typescript-3.5.3").InferTypeNode) {
        writer.write("ts.createInferTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.typeParameter)
        });
        writer.write(")");
    }

    function createImportTypeNode(node: import("typescript-3.5.3").ImportTypeNode) {
        writer.write("ts.createImportTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.argument)
            writer.write(",").newLine();
            if (node.qualifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.qualifier)
            }
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.isTypeOf == null)
                writer.write("undefined");
            else {
                writer.quote(node.isTypeOf.toString())
            }
        });
        writer.write(")");
    }

    function createParenthesizedType(node: import("typescript-3.5.3").ParenthesizedTypeNode) {
        writer.write("ts.createParenthesizedType(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createThisTypeNode(node: import("typescript-3.5.3").ThisTypeNode) {
        writer.write("ts.createThisTypeNode(");
        writer.write(")");
    }

    function createTypeOperatorNode(node: import("typescript-3.5.3").TypeOperatorNode) {
        writer.write("ts.createTypeOperatorNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createIndexedAccessTypeNode(node: import("typescript-3.5.3").IndexedAccessTypeNode) {
        writer.write("ts.createIndexedAccessTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.objectType)
            writer.write(",").newLine();
            writeNodeText(node.indexType)
        });
        writer.write(")");
    }

    function createMappedTypeNode(node: import("typescript-3.5.3").MappedTypeNode) {
        writer.write("ts.createMappedTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.readonlyToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.readonlyToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.typeParameter)
            writer.write(",").newLine();
            if (node.questionToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionToken)
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
        });
        writer.write(")");
    }

    function createLiteralTypeNode(node: import("typescript-3.5.3").LiteralTypeNode) {
        writer.write("ts.createLiteralTypeNode(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.literal)
        });
        writer.write(")");
    }

    function createObjectBindingPattern(node: import("typescript-3.5.3").ObjectBindingPattern) {
        writer.write("ts.createObjectBindingPattern(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.elements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createArrayBindingPattern(node: import("typescript-3.5.3").ArrayBindingPattern) {
        writer.write("ts.createArrayBindingPattern(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.elements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createBindingElement(node: import("typescript-3.5.3").BindingElement) {
        writer.write("ts.createBindingElement(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken)
            }
            writer.write(",").newLine();
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createArrayLiteral(node: import("typescript-3.5.3").ArrayLiteralExpression) {
        writer.write("ts.createArrayLiteral(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.elements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            (node as any).multiLine
        });
        writer.write(")");
    }

    function createObjectLiteral(node: import("typescript-3.5.3").ObjectLiteralExpression) {
        writer.write("ts.createObjectLiteral(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.properties.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.properties!.length; i++) {
                        const item = node.properties![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            (node as any).multiLine
        });
        writer.write(")");
    }

    function createPropertyAccess(node: import("typescript-3.5.3").PropertyAccessExpression) {
        writer.write("ts.createPropertyAccess(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createElementAccess(node: import("typescript-3.5.3").ElementAccessExpression) {
        writer.write("ts.createElementAccess(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.argumentExpression)
        });
        writer.write(")");
    }

    function createCall(node: import("typescript-3.5.3").CallExpression) {
        writer.write("ts.createCall(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.arguments.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.arguments!.length; i++) {
                        const item = node.arguments![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createNew(node: import("typescript-3.5.3").NewExpression) {
        writer.write("ts.createNew(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.arguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.arguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.arguments!.length; i++) {
                            const item = node.arguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createTaggedTemplate(node: import("typescript-3.5.3").TaggedTemplateExpression) {
        writer.write("ts.createTaggedTemplate(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.tag)
            writer.write(",").newLine();
            writeNodeText(node.template)
        });
        writer.write(")");
    }

    function createTypeAssertion(node: import("typescript-3.5.3").TypeAssertion) {
        writer.write("ts.createTypeAssertion(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.type)
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createParen(node: import("typescript-3.5.3").ParenthesizedExpression) {
        writer.write("ts.createParen(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createFunctionExpression(node: import("typescript-3.5.3").FunctionExpression) {
        writer.write("ts.createFunctionExpression(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken)
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.body)
        });
        writer.write(")");
    }

    function createArrowFunction(node: import("typescript-3.5.3").ArrowFunction) {
        writer.write("ts.createArrowFunction(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.equalsGreaterThanToken)
            writer.write(",").newLine();
            writeNodeText(node.body)
        });
        writer.write(")");
    }

    function createDelete(node: import("typescript-3.5.3").DeleteExpression) {
        writer.write("ts.createDelete(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createTypeOf(node: import("typescript-3.5.3").TypeOfExpression) {
        writer.write("ts.createTypeOf(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createVoid(node: import("typescript-3.5.3").VoidExpression) {
        writer.write("ts.createVoid(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createAwait(node: import("typescript-3.5.3").AwaitExpression) {
        writer.write("ts.createAwait(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createPrefix(node: import("typescript-3.5.3").PrefixUnaryExpression) {
        writer.write("ts.createPrefix(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write(syntaxKindToName[node.operator])
            writer.write(",").newLine();
            writeNodeText(node.operand)
        });
        writer.write(")");
    }

    function createPostfix(node: import("typescript-3.5.3").PostfixUnaryExpression) {
        writer.write("ts.createPostfix(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.operand)
            writer.write(",").newLine();
            writer.write(syntaxKindToName[node.operator])
        });
        writer.write(")");
    }

    function createBinary(node: import("typescript-3.5.3").BinaryExpression) {
        writer.write("ts.createBinary(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.left)
            writer.write(",").newLine();
            writeNodeText(node.operatorToken)
            writer.write(",").newLine();
            writeNodeText(node.right)
        });
        writer.write(")");
    }

    function createConditional(node: import("typescript-3.5.3").ConditionalExpression) {
        writer.write("ts.createConditional(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.condition)
            writer.write(",").newLine();
            writeNodeText(node.whenTrue)
            writer.write(",").newLine();
            writeNodeText(node.whenFalse)
        });
        writer.write(")");
    }

    function createTemplateExpression(node: import("typescript-3.5.3").TemplateExpression) {
        writer.write("ts.createTemplateExpression(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.head)
            writer.write(",").newLine();
            writer.write("[");
            if (node.templateSpans.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.templateSpans!.length; i++) {
                        const item = node.templateSpans![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createTemplateHead(node: import("typescript-3.5.3").TemplateHead) {
        writer.write("ts.createTemplateHead(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createTemplateMiddle(node: import("typescript-3.5.3").TemplateMiddle) {
        writer.write("ts.createTemplateMiddle(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createTemplateTail(node: import("typescript-3.5.3").TemplateTail) {
        writer.write("ts.createTemplateTail(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createNoSubstitutionTemplateLiteral(node: import("typescript-3.5.3").NoSubstitutionTemplateLiteral) {
        writer.write("ts.createNoSubstitutionTemplateLiteral(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
        });
        writer.write(")");
    }

    function createYield(node: import("typescript-3.5.3").YieldExpression) {
        writer.write("ts.createYield(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.expression == null)
                writer.write("undefined");
            else {
                writeNodeText(node.expression)
            }
        });
        writer.write(")");
    }

    function createSpread(node: import("typescript-3.5.3").SpreadElement) {
        writer.write("ts.createSpread(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createClassExpression(node: import("typescript-3.5.3").ClassExpression) {
        writer.write("ts.createClassExpression(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createOmittedExpression(node: import("typescript-3.5.3").OmittedExpression) {
        writer.write("ts.createOmittedExpression(");
        writer.write(")");
    }

    function createExpressionWithTypeArguments(node: import("typescript-3.5.3").ExpressionWithTypeArguments) {
        writer.write("ts.createExpressionWithTypeArguments(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createAsExpression(node: import("typescript-3.5.3").AsExpression) {
        writer.write("ts.createAsExpression(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createNonNullExpression(node: import("typescript-3.5.3").NonNullExpression) {
        writer.write("ts.createNonNullExpression(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createMetaProperty(node: import("typescript-3.5.3").MetaProperty) {
        writer.write("ts.createMetaProperty(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write(syntaxKindToName[node.keywordToken])
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createTemplateSpan(node: import("typescript-3.5.3").TemplateSpan) {
        writer.write("ts.createTemplateSpan(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.literal)
        });
        writer.write(")");
    }

    function createSemicolonClassElement(node: import("typescript-3.5.3").SemicolonClassElement) {
        writer.write("ts.createSemicolonClassElement(");
        writer.write(")");
    }

    function createBlock(node: import("typescript-3.5.3").Block) {
        writer.write("ts.createBlock(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.statements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            (node as any).multiLine
        });
        writer.write(")");
    }

    function createVariableStatement(node: import("typescript-3.5.3").VariableStatement) {
        writer.write("ts.createVariableStatement(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.declarationList)
        });
        writer.write(")");
    }

    function createEmptyStatement(node: import("typescript-3.5.3").EmptyStatement) {
        writer.write("ts.createEmptyStatement(");
        writer.write(")");
    }

    function createExpressionStatement(node: import("typescript-3.5.3").ExpressionStatement) {
        writer.write("ts.createExpressionStatement(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createIf(node: import("typescript-3.5.3").IfStatement) {
        writer.write("ts.createIf(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.thenStatement)
            writer.write(",").newLine();
            if (node.elseStatement == null)
                writer.write("undefined");
            else {
                writeNodeText(node.elseStatement)
            }
        });
        writer.write(")");
    }

    function createDo(node: import("typescript-3.5.3").DoStatement) {
        writer.write("ts.createDo(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.statement)
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createWhile(node: import("typescript-3.5.3").WhileStatement) {
        writer.write("ts.createWhile(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createFor(node: import("typescript-3.5.3").ForStatement) {
        writer.write("ts.createFor(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
            writer.write(",").newLine();
            if (node.condition == null)
                writer.write("undefined");
            else {
                writeNodeText(node.condition)
            }
            writer.write(",").newLine();
            if (node.incrementor == null)
                writer.write("undefined");
            else {
                writeNodeText(node.incrementor)
            }
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createForIn(node: import("typescript-3.5.3").ForInStatement) {
        writer.write("ts.createForIn(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.initializer)
            writer.write(",").newLine();
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createForOf(node: import("typescript-3.5.3").ForOfStatement) {
        writer.write("ts.createForOf(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.awaitModifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.awaitModifier)
            }
            writer.write(",").newLine();
            writeNodeText(node.initializer)
            writer.write(",").newLine();
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createContinue(node: import("typescript-3.5.3").ContinueStatement) {
        writer.write("ts.createContinue(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.label == null)
                writer.write("undefined");
            else {
                writeNodeText(node.label)
            }
        });
        writer.write(")");
    }

    function createBreak(node: import("typescript-3.5.3").BreakStatement) {
        writer.write("ts.createBreak(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.label == null)
                writer.write("undefined");
            else {
                writeNodeText(node.label)
            }
        });
        writer.write(")");
    }

    function createReturn(node: import("typescript-3.5.3").ReturnStatement) {
        writer.write("ts.createReturn(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.expression == null)
                writer.write("undefined");
            else {
                writeNodeText(node.expression)
            }
        });
        writer.write(")");
    }

    function createWith(node: import("typescript-3.5.3").WithStatement) {
        writer.write("ts.createWith(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createSwitch(node: import("typescript-3.5.3").SwitchStatement) {
        writer.write("ts.createSwitch(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.caseBlock)
        });
        writer.write(")");
    }

    function createLabel(node: import("typescript-3.5.3").LabeledStatement) {
        writer.write("ts.createLabel(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.label)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createThrow(node: import("typescript-3.5.3").ThrowStatement) {
        writer.write("ts.createThrow(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.expression == null)
                writer.write("undefined");
            else {
                writeNodeText(node.expression)
            }
        });
        writer.write(")");
    }

    function createTry(node: import("typescript-3.5.3").TryStatement) {
        writer.write("ts.createTry(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.tryBlock)
            writer.write(",").newLine();
            if (node.catchClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.catchClause)
            }
            writer.write(",").newLine();
            if (node.finallyBlock == null)
                writer.write("undefined");
            else {
                writeNodeText(node.finallyBlock)
            }
        });
        writer.write(")");
    }

    function createDebuggerStatement(node: import("typescript-3.5.3").DebuggerStatement) {
        writer.write("ts.createDebuggerStatement(");
        writer.write(")");
    }

    function createVariableDeclaration(node: import("typescript-3.5.3").VariableDeclaration) {
        writer.write("ts.createVariableDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createVariableDeclarationList(node: import("typescript-3.5.3").VariableDeclarationList) {
        writer.write("ts.createVariableDeclarationList(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.declarations.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.declarations!.length; i++) {
                        const item = node.declarations![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(getFlagValues(ts.NodeFlags, "NodeFlags", node.flags || 0).toString());
        });
        writer.write(")");
    }

    function createFunctionDeclaration(node: import("typescript-3.5.3").FunctionDeclaration) {
        writer.write("ts.createFunctionDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken)
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeText(node.type)
            }
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
        });
        writer.write(")");
    }

    function createClassDeclaration(node: import("typescript-3.5.3").ClassDeclaration) {
        writer.write("ts.createClassDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createInterfaceDeclaration(node: import("typescript-3.5.3").InterfaceDeclaration) {
        writer.write("ts.createInterfaceDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.heritageClauses == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.heritageClauses.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createTypeAliasDeclaration(node: import("typescript-3.5.3").TypeAliasDeclaration) {
        writer.write("ts.createTypeAliasDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.type)
        });
        writer.write(")");
    }

    function createEnumDeclaration(node: import("typescript-3.5.3").EnumDeclaration) {
        writer.write("ts.createEnumDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createModuleDeclaration(node: import("typescript-3.5.3").ModuleDeclaration) {
        writer.write("ts.createModuleDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.body == null)
                writer.write("undefined");
            else {
                writeNodeText(node.body)
            }
            writer.write(",").newLine();
            writer.write(getFlagValues(ts.NodeFlags, "NodeFlags", node.flags || 0).toString());
        });
        writer.write(")");
    }

    function createModuleBlock(node: import("typescript-3.5.3").ModuleBlock) {
        writer.write("ts.createModuleBlock(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.statements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createCaseBlock(node: import("typescript-3.5.3").CaseBlock) {
        writer.write("ts.createCaseBlock(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.clauses.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.clauses!.length; i++) {
                        const item = node.clauses![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createNamespaceExportDeclaration(node: import("typescript-3.5.3").NamespaceExportDeclaration) {
        writer.write("ts.createNamespaceExportDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createImportEqualsDeclaration(node: import("typescript-3.5.3").ImportEqualsDeclaration) {
        writer.write("ts.createImportEqualsDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writeNodeText(node.moduleReference)
        });
        writer.write(")");
    }

    function createImportDeclaration(node: import("typescript-3.5.3").ImportDeclaration) {
        writer.write("ts.createImportDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.importClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.importClause)
            }
            writer.write(",").newLine();
            writeNodeText(node.moduleSpecifier)
        });
        writer.write(")");
    }

    function createImportClause(node: import("typescript-3.5.3").ImportClause) {
        writer.write("ts.createImportClause(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.name == null)
                writer.write("undefined");
            else {
                writeNodeText(node.name)
            }
            writer.write(",").newLine();
            if (node.namedBindings == null)
                writer.write("undefined");
            else {
                writeNodeText(node.namedBindings)
            }
        });
        writer.write(")");
    }

    function createNamespaceImport(node: import("typescript-3.5.3").NamespaceImport) {
        writer.write("ts.createNamespaceImport(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createNamedImports(node: import("typescript-3.5.3").NamedImports) {
        writer.write("ts.createNamedImports(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.elements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createImportSpecifier(node: import("typescript-3.5.3").ImportSpecifier) {
        writer.write("ts.createImportSpecifier(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createExportAssignment(node: import("typescript-3.5.3").ExportAssignment) {
        writer.write("ts.createExportAssignment(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.isExportEquals == null)
                writer.write("undefined");
            else {
                writer.quote(node.isExportEquals.toString())
            }
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createExportDeclaration(node: import("typescript-3.5.3").ExportDeclaration) {
        writer.write("ts.createExportDeclaration(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.decorators == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.decorators.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.decorators!.length; i++) {
                            const item = node.decorators![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",");
                            writer.write("ts.createModifier(" + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.exportClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.exportClause)
            }
            writer.write(",").newLine();
            if (node.moduleSpecifier == null)
                writer.write("undefined");
            else {
                writeNodeText(node.moduleSpecifier)
            }
        });
        writer.write(")");
    }

    function createNamedExports(node: import("typescript-3.5.3").NamedExports) {
        writer.write("ts.createNamedExports(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.elements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createExportSpecifier(node: import("typescript-3.5.3").ExportSpecifier) {
        writer.write("ts.createExportSpecifier(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.propertyName == null)
                writer.write("undefined");
            else {
                writeNodeText(node.propertyName)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createExternalModuleReference(node: import("typescript-3.5.3").ExternalModuleReference) {
        writer.write("ts.createExternalModuleReference(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createJsxElement(node: import("typescript-3.5.3").JsxElement) {
        writer.write("ts.createJsxElement(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.openingElement)
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.children!.length; i++) {
                        const item = node.children![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.closingElement)
        });
        writer.write(")");
    }

    function createJsxSelfClosingElement(node: import("typescript-3.5.3").JsxSelfClosingElement) {
        writer.write("ts.createJsxSelfClosingElement(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.tagName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.attributes)
        });
        writer.write(")");
    }

    function createJsxOpeningElement(node: import("typescript-3.5.3").JsxOpeningElement) {
        writer.write("ts.createJsxOpeningElement(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.tagName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length > 0) {
                    writer.indentBlock(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",");
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.attributes)
        });
        writer.write(")");
    }

    function createJsxClosingElement(node: import("typescript-3.5.3").JsxClosingElement) {
        writer.write("ts.createJsxClosingElement(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.tagName)
        });
        writer.write(")");
    }

    function createJsxFragment(node: import("typescript-3.5.3").JsxFragment) {
        writer.write("ts.createJsxFragment(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.openingFragment)
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.children!.length; i++) {
                        const item = node.children![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeText(node.closingFragment)
        });
        writer.write(")");
    }

    function createJsxText(node: import("typescript-3.5.3").JsxText) {
        writer.write("ts.createJsxText(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            writer.quote(node.containsOnlyTriviaWhiteSpaces.toString())
        });
        writer.write(")");
    }

    function createJsxOpeningFragment(node: import("typescript-3.5.3").JsxOpeningFragment) {
        writer.write("ts.createJsxOpeningFragment(");
        writer.write(")");
    }

    function createJsxJsxClosingFragment(node: import("typescript-3.5.3").JsxClosingFragment) {
        writer.write("ts.createJsxJsxClosingFragment(");
        writer.write(")");
    }

    function createJsxAttribute(node: import("typescript-3.5.3").JsxAttribute) {
        writer.write("ts.createJsxAttribute(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createJsxAttributes(node: import("typescript-3.5.3").JsxAttributes) {
        writer.write("ts.createJsxAttributes(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.properties.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.properties!.length; i++) {
                        const item = node.properties![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createJsxSpreadAttribute(node: import("typescript-3.5.3").JsxSpreadAttribute) {
        writer.write("ts.createJsxSpreadAttribute(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createJsxExpression(node: import("typescript-3.5.3").JsxExpression) {
        writer.write("ts.createJsxExpression(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.dotDotDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.dotDotDotToken)
            }
            writer.write(",").newLine();
            if (node.expression == null)
                writer.write("undefined");
            else {
                writeNodeText(node.expression)
            }
        });
        writer.write(")");
    }

    function createCaseClause(node: import("typescript-3.5.3").CaseClause) {
        writer.write("ts.createCaseClause(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writer.write("[");
            if (node.statements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createDefaultClause(node: import("typescript-3.5.3").DefaultClause) {
        writer.write("ts.createDefaultClause(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.statements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createHeritageClause(node: import("typescript-3.5.3").HeritageClause) {
        writer.write("ts.createHeritageClause(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write(syntaxKindToName[node.token])
            writer.write(",").newLine();
            writer.write("[");
            if (node.types.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.types!.length; i++) {
                        const item = node.types![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createCatchClause(node: import("typescript-3.5.3").CatchClause) {
        writer.write("ts.createCatchClause(");
        writer.newLine();
        writer.indentBlock(() => {
            if (node.variableDeclaration == null)
                writer.write("undefined");
            else {
                writeNodeText(node.variableDeclaration)
            }
            writer.write(",").newLine();
            writeNodeText(node.block)
        });
        writer.write(")");
    }

    function createPropertyAssignment(node: import("typescript-3.5.3").PropertyAssignment) {
        writer.write("ts.createPropertyAssignment(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            writeNodeText(node.initializer)
        });
        writer.write(")");
    }

    function createShorthandPropertyAssignment(node: import("typescript-3.5.3").ShorthandPropertyAssignment) {
        writer.write("ts.createShorthandPropertyAssignment(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.objectAssignmentInitializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.objectAssignmentInitializer)
            }
        });
        writer.write(")");
    }

    function createSpreadAssignment(node: import("typescript-3.5.3").SpreadAssignment) {
        writer.write("ts.createSpreadAssignment(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createEnumMember(node: import("typescript-3.5.3").EnumMember) {
        writer.write("ts.createEnumMember(");
        writer.newLine();
        writer.indentBlock(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.initializer == null)
                writer.write("undefined");
            else {
                writeNodeText(node.initializer)
            }
        });
        writer.write(")");
    }

    function createCommaList(node: import("typescript-3.5.3").CommaListExpression) {
        writer.write("ts.createCommaList(");
        writer.newLine();
        writer.indentBlock(() => {
            writer.write("[");
            if (node.elements.length > 0) {
                writer.indentBlock(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",");
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createSyntaxKindToNameMap() {
        const map: { [kind: number]: string } = {};
        for (const name of Object.keys(ts.SyntaxKind).filter(k => isNaN(parseInt(k, 10)))) {
            const value = (ts.SyntaxKind as any)[name] as number;
            if (map[value] == null)
                map[value] = name;
        }
        return map;
    }

    function getFlagValues(enumObj: any, enumName: string, value: number) {
        const members: string[] = [];
        for (const prop in enumObj) {
            if (typeof enumObj[prop] === "string")
                continue;
            if ((enumObj[prop] & value) !== 0)
                members.push(enumName + "." + prop);
        }
        return members;
    }
}
