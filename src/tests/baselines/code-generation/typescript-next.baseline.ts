import CodeBlockWriter from "code-block-writer";

export function generateFactoryCode(ts: typeof import("typescript-next"), initialNode: import("typescript-next").Node) {
    const writer = new CodeBlockWriter({ newLine: "\n", indentNumberOfSpaces: 2 });
    const syntaxKindToName = createSyntaxKindToNameMap();

    if (ts.isSourceFile(initialNode)) {
        writer.write("[");
        if (initialNode.statements.length > 0) {
            writer.indent(() => {
                for (let i = 0; i < initialNode.statements.length; i++) {
                    const statement = initialNode.statements[i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(statement);
                }
            }).newLine();
        }
        writer.write("];");
    }
    else {
        writeNodeText(initialNode);
    }
    writer.newLineIfLastNot();

    return writer.toString();

    function writeNodeText(node: import("typescript-next").Node) {
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
                createNumericLiteral(node as import("typescript-next").NumericLiteral);
                return;
            case ts.SyntaxKind.BigIntLiteral:
                createBigIntLiteral(node as import("typescript-next").BigIntLiteral);
                return;
            case ts.SyntaxKind.StringLiteral:
                createStringLiteral(node as import("typescript-next").StringLiteral);
                return;
            case ts.SyntaxKind.RegularExpressionLiteral:
                createRegularExpressionLiteral(node as import("typescript-next").RegularExpressionLiteral);
                return;
            case ts.SyntaxKind.Identifier:
                createIdentifier(node as import("typescript-next").Identifier);
                return;
            case ts.SyntaxKind.PrivateIdentifier:
                createPrivateIdentifier(node as import("typescript-next").PrivateIdentifier);
                return;
            case ts.SyntaxKind.SuperKeyword:
                createSuper(node as import("typescript-next").SuperExpression);
                return;
            case ts.SyntaxKind.ThisKeyword:
                createThis(node as import("typescript-next").ThisExpression);
                return;
            case ts.SyntaxKind.NullKeyword:
                createNull(node as import("typescript-next").NullLiteral);
                return;
            case ts.SyntaxKind.TrueKeyword:
                createTrue(node as import("typescript-next").TrueLiteral);
                return;
            case ts.SyntaxKind.FalseKeyword:
                createFalse(node as import("typescript-next").FalseLiteral);
                return;
            case ts.SyntaxKind.QualifiedName:
                createQualifiedName(node as import("typescript-next").QualifiedName);
                return;
            case ts.SyntaxKind.ComputedPropertyName:
                createComputedPropertyName(node as import("typescript-next").ComputedPropertyName);
                return;
            case ts.SyntaxKind.TypeParameter:
                createTypeParameterDeclaration(node as import("typescript-next").TypeParameterDeclaration);
                return;
            case ts.SyntaxKind.Parameter:
                createParameterDeclaration(node as import("typescript-next").ParameterDeclaration);
                return;
            case ts.SyntaxKind.Decorator:
                createDecorator(node as import("typescript-next").Decorator);
                return;
            case ts.SyntaxKind.PropertySignature:
                createPropertySignature(node as import("typescript-next").PropertySignature);
                return;
            case ts.SyntaxKind.PropertyDeclaration:
                createPropertyDeclaration(node as import("typescript-next").PropertyDeclaration);
                return;
            case ts.SyntaxKind.MethodSignature:
                createMethodSignature(node as import("typescript-next").MethodSignature);
                return;
            case ts.SyntaxKind.MethodDeclaration:
                createMethodDeclaration(node as import("typescript-next").MethodDeclaration);
                return;
            case ts.SyntaxKind.Constructor:
                createConstructorDeclaration(node as import("typescript-next").ConstructorDeclaration);
                return;
            case ts.SyntaxKind.GetAccessor:
                createGetAccessorDeclaration(node as import("typescript-next").GetAccessorDeclaration);
                return;
            case ts.SyntaxKind.SetAccessor:
                createSetAccessorDeclaration(node as import("typescript-next").SetAccessorDeclaration);
                return;
            case ts.SyntaxKind.CallSignature:
                createCallSignature(node as import("typescript-next").CallSignatureDeclaration);
                return;
            case ts.SyntaxKind.ConstructSignature:
                createConstructSignature(node as import("typescript-next").ConstructSignatureDeclaration);
                return;
            case ts.SyntaxKind.IndexSignature:
                createIndexSignature(node as import("typescript-next").IndexSignatureDeclaration);
                return;
            case ts.SyntaxKind.TemplateLiteralTypeSpan:
                createTemplateLiteralTypeSpan(node as import("typescript-next").TemplateLiteralTypeSpan);
                return;
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                createClassStaticBlockDeclaration(node as import("typescript-next").ClassStaticBlockDeclaration);
                return;
            case ts.SyntaxKind.AnyKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.BooleanKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.IntrinsicKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.NeverKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.NumberKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.ObjectKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.StringKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.SymbolKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.UndefinedKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.UnknownKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.BigIntKeyword:
                createKeywordTypeNode(node as import("typescript-next").KeywordTypeNode);
                return;
            case ts.SyntaxKind.TypeReference:
                createTypeReferenceNode(node as import("typescript-next").TypeReferenceNode);
                return;
            case ts.SyntaxKind.FunctionType:
                createFunctionTypeNode(node as import("typescript-next").FunctionTypeNode);
                return;
            case ts.SyntaxKind.ConstructorType:
                createConstructorTypeNode(node as import("typescript-next").ConstructorTypeNode);
                return;
            case ts.SyntaxKind.TypeQuery:
                createTypeQueryNode(node as import("typescript-next").TypeQueryNode);
                return;
            case ts.SyntaxKind.TypeLiteral:
                createTypeLiteralNode(node as import("typescript-next").TypeLiteralNode);
                return;
            case ts.SyntaxKind.ArrayType:
                createArrayTypeNode(node as import("typescript-next").ArrayTypeNode);
                return;
            case ts.SyntaxKind.TupleType:
                createTupleTypeNode(node as import("typescript-next").TupleTypeNode);
                return;
            case ts.SyntaxKind.NamedTupleMember:
                createNamedTupleMember(node as import("typescript-next").NamedTupleMember);
                return;
            case ts.SyntaxKind.OptionalType:
                createOptionalTypeNode(node as import("typescript-next").OptionalTypeNode);
                return;
            case ts.SyntaxKind.RestType:
                createRestTypeNode(node as import("typescript-next").RestTypeNode);
                return;
            case ts.SyntaxKind.UnionType:
                createUnionTypeNode(node as import("typescript-next").UnionTypeNode);
                return;
            case ts.SyntaxKind.IntersectionType:
                createIntersectionTypeNode(node as import("typescript-next").IntersectionTypeNode);
                return;
            case ts.SyntaxKind.ConditionalType:
                createConditionalTypeNode(node as import("typescript-next").ConditionalTypeNode);
                return;
            case ts.SyntaxKind.InferType:
                createInferTypeNode(node as import("typescript-next").InferTypeNode);
                return;
            case ts.SyntaxKind.ImportType:
                createImportTypeNode(node as import("typescript-next").ImportTypeNode);
                return;
            case ts.SyntaxKind.ParenthesizedType:
                createParenthesizedType(node as import("typescript-next").ParenthesizedTypeNode);
                return;
            case ts.SyntaxKind.ThisType:
                createThisTypeNode(node as import("typescript-next").ThisTypeNode);
                return;
            case ts.SyntaxKind.TypeOperator:
                createTypeOperatorNode(node as import("typescript-next").TypeOperatorNode);
                return;
            case ts.SyntaxKind.IndexedAccessType:
                createIndexedAccessTypeNode(node as import("typescript-next").IndexedAccessTypeNode);
                return;
            case ts.SyntaxKind.MappedType:
                createMappedTypeNode(node as import("typescript-next").MappedTypeNode);
                return;
            case ts.SyntaxKind.LiteralType:
                createLiteralTypeNode(node as import("typescript-next").LiteralTypeNode);
                return;
            case ts.SyntaxKind.TemplateLiteralType:
                createTemplateLiteralType(node as import("typescript-next").TemplateLiteralTypeNode);
                return;
            case ts.SyntaxKind.ObjectBindingPattern:
                createObjectBindingPattern(node as import("typescript-next").ObjectBindingPattern);
                return;
            case ts.SyntaxKind.ArrayBindingPattern:
                createArrayBindingPattern(node as import("typescript-next").ArrayBindingPattern);
                return;
            case ts.SyntaxKind.BindingElement:
                createBindingElement(node as import("typescript-next").BindingElement);
                return;
            case ts.SyntaxKind.ArrayLiteralExpression:
                createArrayLiteralExpression(node as import("typescript-next").ArrayLiteralExpression);
                return;
            case ts.SyntaxKind.ObjectLiteralExpression:
                createObjectLiteralExpression(node as import("typescript-next").ObjectLiteralExpression);
                return;
            case ts.SyntaxKind.PropertyAccessExpression:
                if (ts.isPropertyAccessChain(node)) {
                    createPropertyAccessChain(node as import("typescript-next").PropertyAccessChain);
                    return;
                }
                if (ts.isPropertyAccessExpression(node)) {
                    createPropertyAccessExpression(node as import("typescript-next").PropertyAccessExpression);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.ElementAccessExpression:
                if (ts.isElementAccessChain(node)) {
                    createElementAccessChain(node as import("typescript-next").ElementAccessChain);
                    return;
                }
                if (ts.isElementAccessExpression(node)) {
                    createElementAccessExpression(node as import("typescript-next").ElementAccessExpression);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.CallExpression:
                if (ts.isCallChain(node)) {
                    createCallChain(node as import("typescript-next").CallChain);
                    return;
                }
                if (ts.isCallExpression(node)) {
                    createCallExpression(node as import("typescript-next").CallExpression);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.NewExpression:
                createNewExpression(node as import("typescript-next").NewExpression);
                return;
            case ts.SyntaxKind.TaggedTemplateExpression:
                createTaggedTemplateExpression(node as import("typescript-next").TaggedTemplateExpression);
                return;
            case ts.SyntaxKind.TypeAssertionExpression:
                createTypeAssertion(node as import("typescript-next").TypeAssertion);
                return;
            case ts.SyntaxKind.ParenthesizedExpression:
                createParenthesizedExpression(node as import("typescript-next").ParenthesizedExpression);
                return;
            case ts.SyntaxKind.FunctionExpression:
                createFunctionExpression(node as import("typescript-next").FunctionExpression);
                return;
            case ts.SyntaxKind.ArrowFunction:
                createArrowFunction(node as import("typescript-next").ArrowFunction);
                return;
            case ts.SyntaxKind.DeleteExpression:
                createDeleteExpression(node as import("typescript-next").DeleteExpression);
                return;
            case ts.SyntaxKind.TypeOfExpression:
                createTypeOfExpression(node as import("typescript-next").TypeOfExpression);
                return;
            case ts.SyntaxKind.VoidExpression:
                createVoidExpression(node as import("typescript-next").VoidExpression);
                return;
            case ts.SyntaxKind.AwaitExpression:
                createAwaitExpression(node as import("typescript-next").AwaitExpression);
                return;
            case ts.SyntaxKind.PrefixUnaryExpression:
                createPrefixUnaryExpression(node as import("typescript-next").PrefixUnaryExpression);
                return;
            case ts.SyntaxKind.PostfixUnaryExpression:
                createPostfixUnaryExpression(node as import("typescript-next").PostfixUnaryExpression);
                return;
            case ts.SyntaxKind.BinaryExpression:
                createBinaryExpression(node as import("typescript-next").BinaryExpression);
                return;
            case ts.SyntaxKind.ConditionalExpression:
                createConditionalExpression(node as import("typescript-next").ConditionalExpression);
                return;
            case ts.SyntaxKind.TemplateExpression:
                createTemplateExpression(node as import("typescript-next").TemplateExpression);
                return;
            case ts.SyntaxKind.TemplateHead:
                createTemplateHead(node as import("typescript-next").TemplateHead);
                return;
            case ts.SyntaxKind.TemplateMiddle:
                createTemplateMiddle(node as import("typescript-next").TemplateMiddle);
                return;
            case ts.SyntaxKind.TemplateTail:
                createTemplateTail(node as import("typescript-next").TemplateTail);
                return;
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                createNoSubstitutionTemplateLiteral(node as import("typescript-next").NoSubstitutionTemplateLiteral);
                return;
            case ts.SyntaxKind.YieldExpression:
                createYieldExpression(node as import("typescript-next").YieldExpression);
                return;
            case ts.SyntaxKind.SpreadElement:
                createSpreadElement(node as import("typescript-next").SpreadElement);
                return;
            case ts.SyntaxKind.ClassExpression:
                createClassExpression(node as import("typescript-next").ClassExpression);
                return;
            case ts.SyntaxKind.OmittedExpression:
                createOmittedExpression(node as import("typescript-next").OmittedExpression);
                return;
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                createExpressionWithTypeArguments(node as import("typescript-next").ExpressionWithTypeArguments);
                return;
            case ts.SyntaxKind.AsExpression:
                createAsExpression(node as import("typescript-next").AsExpression);
                return;
            case ts.SyntaxKind.NonNullExpression:
                if (ts.isNonNullChain(node)) {
                    createNonNullChain(node as import("typescript-next").NonNullChain);
                    return;
                }
                if (ts.isNonNullExpression(node)) {
                    createNonNullExpression(node as import("typescript-next").NonNullExpression);
                    return;
                }
                throw new Error("Unhandled node: " + node.getText());
            case ts.SyntaxKind.MetaProperty:
                createMetaProperty(node as import("typescript-next").MetaProperty);
                return;
            case ts.SyntaxKind.SatisfiesExpression:
                createSatisfiesExpression(node as import("typescript-next").SatisfiesExpression);
                return;
            case ts.SyntaxKind.TemplateSpan:
                createTemplateSpan(node as import("typescript-next").TemplateSpan);
                return;
            case ts.SyntaxKind.SemicolonClassElement:
                createSemicolonClassElement(node as import("typescript-next").SemicolonClassElement);
                return;
            case ts.SyntaxKind.Block:
                createBlock(node as import("typescript-next").Block);
                return;
            case ts.SyntaxKind.VariableStatement:
                createVariableStatement(node as import("typescript-next").VariableStatement);
                return;
            case ts.SyntaxKind.EmptyStatement:
                createEmptyStatement(node as import("typescript-next").EmptyStatement);
                return;
            case ts.SyntaxKind.ExpressionStatement:
                createExpressionStatement(node as import("typescript-next").ExpressionStatement);
                return;
            case ts.SyntaxKind.IfStatement:
                createIfStatement(node as import("typescript-next").IfStatement);
                return;
            case ts.SyntaxKind.DoStatement:
                createDoStatement(node as import("typescript-next").DoStatement);
                return;
            case ts.SyntaxKind.WhileStatement:
                createWhileStatement(node as import("typescript-next").WhileStatement);
                return;
            case ts.SyntaxKind.ForStatement:
                createForStatement(node as import("typescript-next").ForStatement);
                return;
            case ts.SyntaxKind.ForInStatement:
                createForInStatement(node as import("typescript-next").ForInStatement);
                return;
            case ts.SyntaxKind.ForOfStatement:
                createForOfStatement(node as import("typescript-next").ForOfStatement);
                return;
            case ts.SyntaxKind.ContinueStatement:
                createContinueStatement(node as import("typescript-next").ContinueStatement);
                return;
            case ts.SyntaxKind.BreakStatement:
                createBreakStatement(node as import("typescript-next").BreakStatement);
                return;
            case ts.SyntaxKind.ReturnStatement:
                createReturnStatement(node as import("typescript-next").ReturnStatement);
                return;
            case ts.SyntaxKind.WithStatement:
                createWithStatement(node as import("typescript-next").WithStatement);
                return;
            case ts.SyntaxKind.SwitchStatement:
                createSwitchStatement(node as import("typescript-next").SwitchStatement);
                return;
            case ts.SyntaxKind.LabeledStatement:
                createLabeledStatement(node as import("typescript-next").LabeledStatement);
                return;
            case ts.SyntaxKind.ThrowStatement:
                createThrowStatement(node as import("typescript-next").ThrowStatement);
                return;
            case ts.SyntaxKind.TryStatement:
                createTryStatement(node as import("typescript-next").TryStatement);
                return;
            case ts.SyntaxKind.DebuggerStatement:
                createDebuggerStatement(node as import("typescript-next").DebuggerStatement);
                return;
            case ts.SyntaxKind.VariableDeclaration:
                createVariableDeclaration(node as import("typescript-next").VariableDeclaration);
                return;
            case ts.SyntaxKind.VariableDeclarationList:
                createVariableDeclarationList(node as import("typescript-next").VariableDeclarationList);
                return;
            case ts.SyntaxKind.FunctionDeclaration:
                createFunctionDeclaration(node as import("typescript-next").FunctionDeclaration);
                return;
            case ts.SyntaxKind.ClassDeclaration:
                createClassDeclaration(node as import("typescript-next").ClassDeclaration);
                return;
            case ts.SyntaxKind.InterfaceDeclaration:
                createInterfaceDeclaration(node as import("typescript-next").InterfaceDeclaration);
                return;
            case ts.SyntaxKind.TypeAliasDeclaration:
                createTypeAliasDeclaration(node as import("typescript-next").TypeAliasDeclaration);
                return;
            case ts.SyntaxKind.EnumDeclaration:
                createEnumDeclaration(node as import("typescript-next").EnumDeclaration);
                return;
            case ts.SyntaxKind.ModuleDeclaration:
                createModuleDeclaration(node as import("typescript-next").ModuleDeclaration);
                return;
            case ts.SyntaxKind.ModuleBlock:
                createModuleBlock(node as import("typescript-next").ModuleBlock);
                return;
            case ts.SyntaxKind.CaseBlock:
                createCaseBlock(node as import("typescript-next").CaseBlock);
                return;
            case ts.SyntaxKind.NamespaceExportDeclaration:
                createNamespaceExportDeclaration(node as import("typescript-next").NamespaceExportDeclaration);
                return;
            case ts.SyntaxKind.ImportEqualsDeclaration:
                createImportEqualsDeclaration(node as import("typescript-next").ImportEqualsDeclaration);
                return;
            case ts.SyntaxKind.ImportDeclaration:
                createImportDeclaration(node as import("typescript-next").ImportDeclaration);
                return;
            case ts.SyntaxKind.ImportClause:
                createImportClause(node as import("typescript-next").ImportClause);
                return;
            case ts.SyntaxKind.AssertClause:
                createAssertClause(node as import("typescript-next").AssertClause);
                return;
            case ts.SyntaxKind.AssertEntry:
                createAssertEntry(node as import("typescript-next").AssertEntry);
                return;
            case ts.SyntaxKind.ImportTypeAssertionContainer:
                createImportTypeAssertionContainer(node as import("typescript-next").ImportTypeAssertionContainer);
                return;
            case ts.SyntaxKind.NamespaceImport:
                createNamespaceImport(node as import("typescript-next").NamespaceImport);
                return;
            case ts.SyntaxKind.NamespaceExport:
                createNamespaceExport(node as import("typescript-next").NamespaceExport);
                return;
            case ts.SyntaxKind.NamedImports:
                createNamedImports(node as import("typescript-next").NamedImports);
                return;
            case ts.SyntaxKind.ImportSpecifier:
                createImportSpecifier(node as import("typescript-next").ImportSpecifier);
                return;
            case ts.SyntaxKind.ExportAssignment:
                createExportAssignment(node as import("typescript-next").ExportAssignment);
                return;
            case ts.SyntaxKind.ExportDeclaration:
                createExportDeclaration(node as import("typescript-next").ExportDeclaration);
                return;
            case ts.SyntaxKind.NamedExports:
                createNamedExports(node as import("typescript-next").NamedExports);
                return;
            case ts.SyntaxKind.ExportSpecifier:
                createExportSpecifier(node as import("typescript-next").ExportSpecifier);
                return;
            case ts.SyntaxKind.ExternalModuleReference:
                createExternalModuleReference(node as import("typescript-next").ExternalModuleReference);
                return;
            case ts.SyntaxKind.JsxElement:
                createJsxElement(node as import("typescript-next").JsxElement);
                return;
            case ts.SyntaxKind.JsxSelfClosingElement:
                createJsxSelfClosingElement(node as import("typescript-next").JsxSelfClosingElement);
                return;
            case ts.SyntaxKind.JsxOpeningElement:
                createJsxOpeningElement(node as import("typescript-next").JsxOpeningElement);
                return;
            case ts.SyntaxKind.JsxClosingElement:
                createJsxClosingElement(node as import("typescript-next").JsxClosingElement);
                return;
            case ts.SyntaxKind.JsxFragment:
                createJsxFragment(node as import("typescript-next").JsxFragment);
                return;
            case ts.SyntaxKind.JsxText:
                createJsxText(node as import("typescript-next").JsxText);
                return;
            case ts.SyntaxKind.JsxOpeningFragment:
                createJsxOpeningFragment(node as import("typescript-next").JsxOpeningFragment);
                return;
            case ts.SyntaxKind.JsxClosingFragment:
                createJsxJsxClosingFragment(node as import("typescript-next").JsxClosingFragment);
                return;
            case ts.SyntaxKind.JsxAttribute:
                createJsxAttribute(node as import("typescript-next").JsxAttribute);
                return;
            case ts.SyntaxKind.JsxAttributes:
                createJsxAttributes(node as import("typescript-next").JsxAttributes);
                return;
            case ts.SyntaxKind.JsxSpreadAttribute:
                createJsxSpreadAttribute(node as import("typescript-next").JsxSpreadAttribute);
                return;
            case ts.SyntaxKind.JsxExpression:
                createJsxExpression(node as import("typescript-next").JsxExpression);
                return;
            case ts.SyntaxKind.CaseClause:
                createCaseClause(node as import("typescript-next").CaseClause);
                return;
            case ts.SyntaxKind.DefaultClause:
                createDefaultClause(node as import("typescript-next").DefaultClause);
                return;
            case ts.SyntaxKind.HeritageClause:
                createHeritageClause(node as import("typescript-next").HeritageClause);
                return;
            case ts.SyntaxKind.CatchClause:
                createCatchClause(node as import("typescript-next").CatchClause);
                return;
            case ts.SyntaxKind.PropertyAssignment:
                createPropertyAssignment(node as import("typescript-next").PropertyAssignment);
                return;
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                createShorthandPropertyAssignment(node as import("typescript-next").ShorthandPropertyAssignment);
                return;
            case ts.SyntaxKind.SpreadAssignment:
                createSpreadAssignment(node as import("typescript-next").SpreadAssignment);
                return;
            case ts.SyntaxKind.EnumMember:
                createEnumMember(node as import("typescript-next").EnumMember);
                return;
            case ts.SyntaxKind.CommaListExpression:
                createCommaListExpression(node as import("typescript-next").CommaListExpression);
                return;
            default:
                if (node.kind >= ts.SyntaxKind.FirstToken && node.kind <= ts.SyntaxKind.LastToken) {
                    writer.write("factory.createToken(ts.SyntaxKind.").write(syntaxKindToName[node.kind]).write(")");
                    return;
                }
                writer.write("/* Unhandled node kind: ").write(syntaxKindToName[node.kind]).write(" */")
        }
    }

    function writeNodeTextForTypeNode(node: import("typescript-next").TypeNode) {
        if (node.kind >= ts.SyntaxKind.FirstKeyword && node.kind <= ts.SyntaxKind.LastKeyword) {
            writer.write("factory.createKeywordTypeNode(ts.SyntaxKind.").write(syntaxKindToName[node.kind]).write(")");
        }
        else {
            writeNodeText(node);
        }
    }

    function createNumericLiteral(node: import("typescript-next").NumericLiteral) {
        writer.write("factory.createNumericLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createBigIntLiteral(node: import("typescript-next").BigIntLiteral) {
        writer.write("factory.createBigIntLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createStringLiteral(node: import("typescript-next").StringLiteral) {
        writer.write("factory.createStringLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createRegularExpressionLiteral(node: import("typescript-next").RegularExpressionLiteral) {
        writer.write("factory.createRegularExpressionLiteral(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createIdentifier(node: import("typescript-next").Identifier) {
        writer.write("factory.createIdentifier(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createPrivateIdentifier(node: import("typescript-next").PrivateIdentifier) {
        writer.write("factory.createPrivateIdentifier(");
        writer.quote(node.text.toString())
        writer.write(")");
    }

    function createSuper(node: import("typescript-next").SuperExpression) {
        writer.write("factory.createSuper(");
        writer.write(")");
    }

    function createThis(node: import("typescript-next").ThisExpression) {
        writer.write("factory.createThis(");
        writer.write(")");
    }

    function createNull(node: import("typescript-next").NullLiteral) {
        writer.write("factory.createNull(");
        writer.write(")");
    }

    function createTrue(node: import("typescript-next").TrueLiteral) {
        writer.write("factory.createTrue(");
        writer.write(")");
    }

    function createFalse(node: import("typescript-next").FalseLiteral) {
        writer.write("factory.createFalse(");
        writer.write(")");
    }

    function createQualifiedName(node: import("typescript-next").QualifiedName) {
        writer.write("factory.createQualifiedName(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.left)
            writer.write(",").newLine();
            writeNodeText(node.right)
        });
        writer.write(")");
    }

    function createComputedPropertyName(node: import("typescript-next").ComputedPropertyName) {
        writer.write("factory.createComputedPropertyName(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createTypeParameterDeclaration(node: import("typescript-next").TypeParameterDeclaration) {
        writer.write("factory.createTypeParameterDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.constraint == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.constraint)
            }
            writer.write(",").newLine();
            if (node.default == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.default)
            }
        });
        writer.write(")");
    }

    function createParameterDeclaration(node: import("typescript-next").ParameterDeclaration) {
        writer.write("factory.createParameterDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                writeNodeTextForTypeNode(node.type)
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

    function createDecorator(node: import("typescript-next").Decorator) {
        writer.write("factory.createDecorator(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createPropertySignature(node: import("typescript-next").PropertySignature) {
        writer.write("factory.createPropertySignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                writeNodeTextForTypeNode(node.type)
            }
        });
        writer.write(")");
    }

    function createPropertyDeclaration(node: import("typescript-next").PropertyDeclaration) {
        writer.write("factory.createPropertyDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.questionToken != null)
                writer.write("factory.createToken(ts.SyntaxKind.QuestionToken)");
            else if (node.exclamationToken != null)
                writer.write("factory.createToken(ts.SyntaxKind.ExclamationToken)");
            else
                writer.write("undefined");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
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

    function createMethodSignature(node: import("typescript-next").MethodSignature) {
        writer.write("factory.createMethodSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
            }
        });
        writer.write(")");
    }

    function createMethodDeclaration(node: import("typescript-next").MethodDeclaration) {
        writer.write("factory.createMethodDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
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

    function createConstructorDeclaration(node: import("typescript-next").ConstructorDeclaration) {
        writer.write("factory.createConstructorDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
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

    function createGetAccessorDeclaration(node: import("typescript-next").GetAccessorDeclaration) {
        writer.write("factory.createGetAccessorDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
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

    function createSetAccessorDeclaration(node: import("typescript-next").SetAccessorDeclaration) {
        writer.write("factory.createSetAccessorDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
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

    function createCallSignature(node: import("typescript-next").CallSignatureDeclaration) {
        writer.write("factory.createCallSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
            }
        });
        writer.write(")");
    }

    function createConstructSignature(node: import("typescript-next").ConstructSignatureDeclaration) {
        writer.write("factory.createConstructSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
            }
        });
        writer.write(")");
    }

    function createIndexSignature(node: import("typescript-next").IndexSignatureDeclaration) {
        writer.write("factory.createIndexSignature(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createTemplateLiteralTypeSpan(node: import("typescript-next").TemplateLiteralTypeSpan) {
        writer.write("factory.createTemplateLiteralTypeSpan(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.type)
            writer.write(",").newLine();
            writeNodeText(node.literal)
        });
        writer.write(")");
    }

    function createClassStaticBlockDeclaration(node: import("typescript-next").ClassStaticBlockDeclaration) {
        writer.write("factory.createClassStaticBlockDeclaration(");
        writeNodeText(node.body)
        writer.write(")");
    }

    function createKeywordTypeNode(node: import("typescript-next").KeywordTypeNode) {
        writer.write("factory.createKeywordTypeNode(");
        writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.kind])
        writer.write(")");
    }

    function createTypeReferenceNode(node: import("typescript-next").TypeReferenceNode) {
        writer.write("factory.createTypeReferenceNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.typeName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createFunctionTypeNode(node: import("typescript-next").FunctionTypeNode) {
        writer.write("factory.createFunctionTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.typeParameters == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createConstructorTypeNode(node: import("typescript-next").ConstructorTypeNode) {
        writer.write("factory.createConstructorTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createTypeQueryNode(node: import("typescript-next").TypeQueryNode) {
        writer.write("factory.createTypeQueryNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.exprName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createTypeLiteralNode(node: import("typescript-next").TypeLiteralNode) {
        writer.write("factory.createTypeLiteralNode(");
        writer.write("[");
        if (node.members.length === 1) {
            const item = node.members![0];
            writeNodeText(item)
        }
        else if (node.members.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.members!.length; i++) {
                    const item = node.members![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createArrayTypeNode(node: import("typescript-next").ArrayTypeNode) {
        writer.write("factory.createArrayTypeNode(");
        writeNodeTextForTypeNode(node.elementType)
        writer.write(")");
    }

    function createTupleTypeNode(node: import("typescript-next").TupleTypeNode) {
        writer.write("factory.createTupleTypeNode(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createNamedTupleMember(node: import("typescript-next").NamedTupleMember) {
        writer.write("factory.createNamedTupleMember(");
        writer.newLine();
        writer.indent(() => {
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
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createOptionalTypeNode(node: import("typescript-next").OptionalTypeNode) {
        writer.write("factory.createOptionalTypeNode(");
        writeNodeTextForTypeNode(node.type)
        writer.write(")");
    }

    function createRestTypeNode(node: import("typescript-next").RestTypeNode) {
        writer.write("factory.createRestTypeNode(");
        writeNodeTextForTypeNode(node.type)
        writer.write(")");
    }

    function createUnionTypeNode(node: import("typescript-next").UnionTypeNode) {
        writer.write("factory.createUnionTypeNode(");
        writer.write("[");
        if (node.types.length === 1) {
            const item = node.types![0];
            writeNodeTextForTypeNode(item)
        }
        else if (node.types.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.types!.length; i++) {
                    const item = node.types![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeTextForTypeNode(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createIntersectionTypeNode(node: import("typescript-next").IntersectionTypeNode) {
        writer.write("factory.createIntersectionTypeNode(");
        writer.write("[");
        if (node.types.length === 1) {
            const item = node.types![0];
            writeNodeTextForTypeNode(item)
        }
        else if (node.types.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.types!.length; i++) {
                    const item = node.types![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeTextForTypeNode(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createConditionalTypeNode(node: import("typescript-next").ConditionalTypeNode) {
        writer.write("factory.createConditionalTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.checkType)
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.extendsType)
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.trueType)
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.falseType)
        });
        writer.write(")");
    }

    function createInferTypeNode(node: import("typescript-next").InferTypeNode) {
        writer.write("factory.createInferTypeNode(");
        writeNodeText(node.typeParameter)
        writer.write(")");
    }

    function createImportTypeNode(node: import("typescript-next").ImportTypeNode) {
        writer.write("factory.createImportTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.argument)
            writer.write(",").newLine();
            if (node.assertions == null)
                writer.write("undefined");
            else {
                writeNodeText(node.assertions)
            }
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
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write(node.isTypeOf.toString())
        });
        writer.write(")");
    }

    function createParenthesizedType(node: import("typescript-next").ParenthesizedTypeNode) {
        writer.write("factory.createParenthesizedType(");
        writeNodeTextForTypeNode(node.type)
        writer.write(")");
    }

    function createThisTypeNode(node: import("typescript-next").ThisTypeNode) {
        writer.write("factory.createThisTypeNode(");
        writer.write(")");
    }

    function createTypeOperatorNode(node: import("typescript-next").TypeOperatorNode) {
        writer.write("factory.createTypeOperatorNode(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator])
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createIndexedAccessTypeNode(node: import("typescript-next").IndexedAccessTypeNode) {
        writer.write("factory.createIndexedAccessTypeNode(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.objectType)
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.indexType)
        });
        writer.write(")");
    }

    function createMappedTypeNode(node: import("typescript-next").MappedTypeNode) {
        writer.write("factory.createMappedTypeNode(");
        writer.newLine();
        writer.indent(() => {
            if (node.readonlyToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.readonlyToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.typeParameter)
            writer.write(",").newLine();
            if (node.nameType == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.nameType)
            }
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
                writeNodeTextForTypeNode(node.type)
            }
            writer.write(",").newLine();
            if (node.members == null)
                writer.write("undefined");
            else {
                writer.write("/* unknown */")
            }
        });
        writer.write(")");
    }

    function createLiteralTypeNode(node: import("typescript-next").LiteralTypeNode) {
        writer.write("factory.createLiteralTypeNode(");
        writeNodeText(node.literal)
        writer.write(")");
    }

    function createTemplateLiteralType(node: import("typescript-next").TemplateLiteralTypeNode) {
        writer.write("factory.createTemplateLiteralType(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.head)
            writer.write(",").newLine();
            writer.write("[");
            if (node.templateSpans.length === 1) {
                const item = node.templateSpans![0];
                writeNodeText(item)
            }
            else if (node.templateSpans.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.templateSpans!.length; i++) {
                        const item = node.templateSpans![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createObjectBindingPattern(node: import("typescript-next").ObjectBindingPattern) {
        writer.write("factory.createObjectBindingPattern(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createArrayBindingPattern(node: import("typescript-next").ArrayBindingPattern) {
        writer.write("factory.createArrayBindingPattern(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createBindingElement(node: import("typescript-next").BindingElement) {
        writer.write("factory.createBindingElement(");
        writer.newLine();
        writer.indent(() => {
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

    function createArrayLiteralExpression(node: import("typescript-next").ArrayLiteralExpression) {
        writer.write("factory.createArrayLiteralExpression(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.elements.length === 1) {
                const item = node.elements![0];
                writeNodeText(item)
            }
            else if (node.elements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.elements!.length; i++) {
                        const item = node.elements![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(((node as any).multiLine || false).toString())
        });
        writer.write(")");
    }

    function createObjectLiteralExpression(node: import("typescript-next").ObjectLiteralExpression) {
        writer.write("factory.createObjectLiteralExpression(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.properties.length === 1) {
                const item = node.properties![0];
                writeNodeText(item)
            }
            else if (node.properties.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.properties!.length; i++) {
                        const item = node.properties![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(((node as any).multiLine || false).toString())
        });
        writer.write(")");
    }

    function createPropertyAccessExpression(node: import("typescript-next").PropertyAccessExpression) {
        writer.write("factory.createPropertyAccessExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createPropertyAccessChain(node: import("typescript-next").PropertyAccessChain) {
        writer.write("factory.createPropertyAccessChain(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.questionDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionDotToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createElementAccessExpression(node: import("typescript-next").ElementAccessExpression) {
        writer.write("factory.createElementAccessExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.argumentExpression)
        });
        writer.write(")");
    }

    function createElementAccessChain(node: import("typescript-next").ElementAccessChain) {
        writer.write("factory.createElementAccessChain(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.questionDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionDotToken)
            }
            writer.write(",").newLine();
            writeNodeText(node.argumentExpression)
        });
        writer.write(")");
    }

    function createCallExpression(node: import("typescript-next").CallExpression) {
        writer.write("factory.createCallExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.arguments.length === 1) {
                const item = node.arguments![0];
                writeNodeText(item)
            }
            else if (node.arguments.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.arguments!.length; i++) {
                        const item = node.arguments![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createCallChain(node: import("typescript-next").CallChain) {
        writer.write("factory.createCallChain(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.questionDotToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.questionDotToken)
            }
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.arguments.length === 1) {
                const item = node.arguments![0];
                writeNodeText(item)
            }
            else if (node.arguments.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.arguments!.length; i++) {
                        const item = node.arguments![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createNewExpression(node: import("typescript-next").NewExpression) {
        writer.write("factory.createNewExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
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
                if (node.arguments.length === 1) {
                    const item = node.arguments![0];
                    writeNodeText(item)
                }
                else if (node.arguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.arguments!.length; i++) {
                            const item = node.arguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createTaggedTemplateExpression(node: import("typescript-next").TaggedTemplateExpression) {
        writer.write("factory.createTaggedTemplateExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tag)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.template)
        });
        writer.write(")");
    }

    function createTypeAssertion(node: import("typescript-next").TypeAssertion) {
        writer.write("factory.createTypeAssertion(");
        writer.newLine();
        writer.indent(() => {
            writeNodeTextForTypeNode(node.type)
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createParenthesizedExpression(node: import("typescript-next").ParenthesizedExpression) {
        writer.write("factory.createParenthesizedExpression(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createFunctionExpression(node: import("typescript-next").FunctionExpression) {
        writer.write("factory.createFunctionExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.body)
        });
        writer.write(")");
    }

    function createArrowFunction(node: import("typescript-next").ArrowFunction) {
        writer.write("factory.createArrowFunction(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
            }
            writer.write(",").newLine();
            writeNodeText(node.equalsGreaterThanToken)
            writer.write(",").newLine();
            writeNodeText(node.body)
        });
        writer.write(")");
    }

    function createDeleteExpression(node: import("typescript-next").DeleteExpression) {
        writer.write("factory.createDeleteExpression(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createTypeOfExpression(node: import("typescript-next").TypeOfExpression) {
        writer.write("factory.createTypeOfExpression(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createVoidExpression(node: import("typescript-next").VoidExpression) {
        writer.write("factory.createVoidExpression(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createAwaitExpression(node: import("typescript-next").AwaitExpression) {
        writer.write("factory.createAwaitExpression(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createPrefixUnaryExpression(node: import("typescript-next").PrefixUnaryExpression) {
        writer.write("factory.createPrefixUnaryExpression(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator])
            writer.write(",").newLine();
            writeNodeText(node.operand)
        });
        writer.write(")");
    }

    function createPostfixUnaryExpression(node: import("typescript-next").PostfixUnaryExpression) {
        writer.write("factory.createPostfixUnaryExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.operand)
            writer.write(",").newLine();
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.operator])
        });
        writer.write(")");
    }

    function createBinaryExpression(node: import("typescript-next").BinaryExpression) {
        writer.write("factory.createBinaryExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.left)
            writer.write(",").newLine();
            writeNodeText(node.operatorToken)
            writer.write(",").newLine();
            writeNodeText(node.right)
        });
        writer.write(")");
    }

    function createConditionalExpression(node: import("typescript-next").ConditionalExpression) {
        writer.write("factory.createConditionalExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.condition)
            writer.write(",").newLine();
            writeNodeText(node.questionToken)
            writer.write(",").newLine();
            writeNodeText(node.whenTrue)
            writer.write(",").newLine();
            writeNodeText(node.colonToken)
            writer.write(",").newLine();
            writeNodeText(node.whenFalse)
        });
        writer.write(")");
    }

    function createTemplateExpression(node: import("typescript-next").TemplateExpression) {
        writer.write("factory.createTemplateExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.head)
            writer.write(",").newLine();
            writer.write("[");
            if (node.templateSpans.length === 1) {
                const item = node.templateSpans![0];
                writeNodeText(item)
            }
            else if (node.templateSpans.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.templateSpans!.length; i++) {
                        const item = node.templateSpans![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createTemplateHead(node: import("typescript-next").TemplateHead) {
        writer.write("factory.createTemplateHead(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString())
            }
        });
        writer.write(")");
    }

    function createTemplateMiddle(node: import("typescript-next").TemplateMiddle) {
        writer.write("factory.createTemplateMiddle(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString())
            }
        });
        writer.write(")");
    }

    function createTemplateTail(node: import("typescript-next").TemplateTail) {
        writer.write("factory.createTemplateTail(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString())
            }
        });
        writer.write(")");
    }

    function createNoSubstitutionTemplateLiteral(node: import("typescript-next").NoSubstitutionTemplateLiteral) {
        writer.write("factory.createNoSubstitutionTemplateLiteral(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            if (node.rawText == null)
                writer.write("undefined");
            else {
                writer.quote(node.rawText.toString())
            }
        });
        writer.write(")");
    }

    function createYieldExpression(node: import("typescript-next").YieldExpression) {
        writer.write("factory.createYieldExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.asteriskToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.asteriskToken)
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

    function createSpreadElement(node: import("typescript-next").SpreadElement) {
        writer.write("factory.createSpreadElement(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createClassExpression(node: import("typescript-next").ClassExpression) {
        writer.write("factory.createClassExpression(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
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
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses![0];
                    writeNodeText(item)
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createOmittedExpression(node: import("typescript-next").OmittedExpression) {
        writer.write("factory.createOmittedExpression(");
        writer.write(")");
    }

    function createExpressionWithTypeArguments(node: import("typescript-next").ExpressionWithTypeArguments) {
        writer.write("factory.createExpressionWithTypeArguments(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
                        }
                    });
                }
                writer.write("]");
            }
        });
        writer.write(")");
    }

    function createAsExpression(node: import("typescript-next").AsExpression) {
        writer.write("factory.createAsExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createNonNullExpression(node: import("typescript-next").NonNullExpression) {
        writer.write("factory.createNonNullExpression(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createNonNullChain(node: import("typescript-next").NonNullChain) {
        writer.write("factory.createNonNullChain(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createMetaProperty(node: import("typescript-next").MetaProperty) {
        writer.write("factory.createMetaProperty(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.keywordToken])
            writer.write(",").newLine();
            writeNodeText(node.name)
        });
        writer.write(")");
    }

    function createSatisfiesExpression(node: import("typescript-next").SatisfiesExpression) {
        writer.write("factory.createSatisfiesExpression(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createTemplateSpan(node: import("typescript-next").TemplateSpan) {
        writer.write("factory.createTemplateSpan(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.literal)
        });
        writer.write(")");
    }

    function createSemicolonClassElement(node: import("typescript-next").SemicolonClassElement) {
        writer.write("factory.createSemicolonClassElement(");
        writer.write(")");
    }

    function createBlock(node: import("typescript-next").Block) {
        writer.write("factory.createBlock(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.statements.length === 1) {
                const item = node.statements![0];
                writeNodeText(item)
            }
            else if (node.statements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(((node as any).multiLine || false).toString())
        });
        writer.write(")");
    }

    function createVariableStatement(node: import("typescript-next").VariableStatement) {
        writer.write("factory.createVariableStatement(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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

    function createEmptyStatement(node: import("typescript-next").EmptyStatement) {
        writer.write("factory.createEmptyStatement(");
        writer.write(")");
    }

    function createExpressionStatement(node: import("typescript-next").ExpressionStatement) {
        writer.write("factory.createExpressionStatement(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createIfStatement(node: import("typescript-next").IfStatement) {
        writer.write("factory.createIfStatement(");
        writer.newLine();
        writer.indent(() => {
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

    function createDoStatement(node: import("typescript-next").DoStatement) {
        writer.write("factory.createDoStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.statement)
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createWhileStatement(node: import("typescript-next").WhileStatement) {
        writer.write("factory.createWhileStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createForStatement(node: import("typescript-next").ForStatement) {
        writer.write("factory.createForStatement(");
        writer.newLine();
        writer.indent(() => {
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

    function createForInStatement(node: import("typescript-next").ForInStatement) {
        writer.write("factory.createForInStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.initializer)
            writer.write(",").newLine();
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createForOfStatement(node: import("typescript-next").ForOfStatement) {
        writer.write("factory.createForOfStatement(");
        writer.newLine();
        writer.indent(() => {
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

    function createContinueStatement(node: import("typescript-next").ContinueStatement) {
        writer.write("factory.createContinueStatement(");
        if (node.label == null)
            writer.write("undefined");
        else {
            writeNodeText(node.label)
        }
        writer.write(")");
    }

    function createBreakStatement(node: import("typescript-next").BreakStatement) {
        writer.write("factory.createBreakStatement(");
        if (node.label == null)
            writer.write("undefined");
        else {
            writeNodeText(node.label)
        }
        writer.write(")");
    }

    function createReturnStatement(node: import("typescript-next").ReturnStatement) {
        writer.write("factory.createReturnStatement(");
        if (node.expression == null)
            writer.write("undefined");
        else {
            writeNodeText(node.expression)
        }
        writer.write(")");
    }

    function createWithStatement(node: import("typescript-next").WithStatement) {
        writer.write("factory.createWithStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createSwitchStatement(node: import("typescript-next").SwitchStatement) {
        writer.write("factory.createSwitchStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writeNodeText(node.caseBlock)
        });
        writer.write(")");
    }

    function createLabeledStatement(node: import("typescript-next").LabeledStatement) {
        writer.write("factory.createLabeledStatement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.label)
            writer.write(",").newLine();
            writeNodeText(node.statement)
        });
        writer.write(")");
    }

    function createThrowStatement(node: import("typescript-next").ThrowStatement) {
        writer.write("factory.createThrowStatement(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createTryStatement(node: import("typescript-next").TryStatement) {
        writer.write("factory.createTryStatement(");
        writer.newLine();
        writer.indent(() => {
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

    function createDebuggerStatement(node: import("typescript-next").DebuggerStatement) {
        writer.write("factory.createDebuggerStatement(");
        writer.write(")");
    }

    function createVariableDeclaration(node: import("typescript-next").VariableDeclaration) {
        writer.write("factory.createVariableDeclaration(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            if (node.exclamationToken == null)
                writer.write("undefined");
            else {
                writeNodeText(node.exclamationToken)
            }
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
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

    function createVariableDeclarationList(node: import("typescript-next").VariableDeclarationList) {
        writer.write("factory.createVariableDeclarationList(");
        writer.newLine();
        writer.indent(() => {
            writer.write("[");
            if (node.declarations.length === 1) {
                const item = node.declarations![0];
                writeNodeText(item)
            }
            else if (node.declarations.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.declarations!.length; i++) {
                        const item = node.declarations![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            writer.write(getNodeFlagValues(node.flags || 0));
        });
        writer.write(")");
    }

    function createFunctionDeclaration(node: import("typescript-next").FunctionDeclaration) {
        writer.write("factory.createFunctionDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.parameters.length === 1) {
                const item = node.parameters![0];
                writeNodeText(item)
            }
            else if (node.parameters.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.parameters!.length; i++) {
                        const item = node.parameters![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
            writer.write(",").newLine();
            if (node.type == null)
                writer.write("undefined");
            else {
                writeNodeTextForTypeNode(node.type)
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

    function createClassDeclaration(node: import("typescript-next").ClassDeclaration) {
        writer.write("factory.createClassDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
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
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses![0];
                    writeNodeText(item)
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createInterfaceDeclaration(node: import("typescript-next").InterfaceDeclaration) {
        writer.write("factory.createInterfaceDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
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
                if (node.heritageClauses.length === 1) {
                    const item = node.heritageClauses![0];
                    writeNodeText(item)
                }
                else if (node.heritageClauses.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.heritageClauses!.length; i++) {
                            const item = node.heritageClauses![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createTypeAliasDeclaration(node: import("typescript-next").TypeAliasDeclaration) {
        writer.write("factory.createTypeAliasDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
                if (node.typeParameters.length === 1) {
                    const item = node.typeParameters![0];
                    writeNodeText(item)
                }
                else if (node.typeParameters.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeParameters!.length; i++) {
                            const item = node.typeParameters![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeText(item)
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeTextForTypeNode(node.type)
        });
        writer.write(")");
    }

    function createEnumDeclaration(node: import("typescript-next").EnumDeclaration) {
        writer.write("factory.createEnumDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writer.write("[");
            if (node.members.length === 1) {
                const item = node.members![0];
                writeNodeText(item)
            }
            else if (node.members.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.members!.length; i++) {
                        const item = node.members![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createModuleDeclaration(node: import("typescript-next").ModuleDeclaration) {
        writer.write("factory.createModuleDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
            writer.write(getNodeFlagValues(node.flags || 0));
        });
        writer.write(")");
    }

    function createModuleBlock(node: import("typescript-next").ModuleBlock) {
        writer.write("factory.createModuleBlock(");
        writer.write("[");
        if (node.statements.length === 1) {
            const item = node.statements![0];
            writeNodeText(item)
        }
        else if (node.statements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.statements!.length; i++) {
                    const item = node.statements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createCaseBlock(node: import("typescript-next").CaseBlock) {
        writer.write("factory.createCaseBlock(");
        writer.write("[");
        if (node.clauses.length === 1) {
            const item = node.clauses![0];
            writeNodeText(item)
        }
        else if (node.clauses.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.clauses!.length; i++) {
                    const item = node.clauses![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createNamespaceExportDeclaration(node: import("typescript-next").NamespaceExportDeclaration) {
        writer.write("factory.createNamespaceExportDeclaration(");
        writeNodeText(node.name)
        writer.write(")");
    }

    function createImportEqualsDeclaration(node: import("typescript-next").ImportEqualsDeclaration) {
        writer.write("factory.createImportEqualsDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write(node.isTypeOnly.toString())
            writer.write(",").newLine();
            writeNodeText(node.name)
            writer.write(",").newLine();
            writeNodeText(node.moduleReference)
        });
        writer.write(")");
    }

    function createImportDeclaration(node: import("typescript-next").ImportDeclaration) {
        writer.write("factory.createImportDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
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
            writer.write(",").newLine();
            if (node.assertClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.assertClause)
            }
        });
        writer.write(")");
    }

    function createImportClause(node: import("typescript-next").ImportClause) {
        writer.write("factory.createImportClause(");
        writer.newLine();
        writer.indent(() => {
            writer.write(node.isTypeOnly.toString())
            writer.write(",").newLine();
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

    function createAssertClause(node: import("typescript-next").AssertClause) {
        writer.write("factory.createAssertClause(");
        writer.newLine();
        writer.indent(() => {
            writer.write("/* unknown */")
            writer.write(",").newLine();
            if (node.multiLine == null)
                writer.write("undefined");
            else {
                writer.write(node.multiLine.toString())
            }
        });
        writer.write(")");
    }

    function createAssertEntry(node: import("typescript-next").AssertEntry) {
        writer.write("factory.createAssertEntry(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            writeNodeText(node.value)
        });
        writer.write(")");
    }

    function createImportTypeAssertionContainer(node: import("typescript-next").ImportTypeAssertionContainer) {
        writer.write("factory.createImportTypeAssertionContainer(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.assertClause)
            writer.write(",").newLine();
            if (node.multiLine == null)
                writer.write("undefined");
            else {
                writer.write(node.multiLine.toString())
            }
        });
        writer.write(")");
    }

    function createNamespaceImport(node: import("typescript-next").NamespaceImport) {
        writer.write("factory.createNamespaceImport(");
        writeNodeText(node.name)
        writer.write(")");
    }

    function createNamespaceExport(node: import("typescript-next").NamespaceExport) {
        writer.write("factory.createNamespaceExport(");
        writeNodeText(node.name)
        writer.write(")");
    }

    function createNamedImports(node: import("typescript-next").NamedImports) {
        writer.write("factory.createNamedImports(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createImportSpecifier(node: import("typescript-next").ImportSpecifier) {
        writer.write("factory.createImportSpecifier(");
        writer.newLine();
        writer.indent(() => {
            writer.write(node.isTypeOnly.toString())
            writer.write(",").newLine();
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

    function createExportAssignment(node: import("typescript-next").ExportAssignment) {
        writer.write("factory.createExportAssignment(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            if (node.isExportEquals == null)
                writer.write("undefined");
            else {
                writer.write(node.isExportEquals.toString())
            }
            writer.write(",").newLine();
            writeNodeText(node.expression)
        });
        writer.write(")");
    }

    function createExportDeclaration(node: import("typescript-next").ExportDeclaration) {
        writer.write("factory.createExportDeclaration(");
        writer.newLine();
        writer.indent(() => {
            if (node.modifiers == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.modifiers.length === 1) {
                    const item = node.modifiers![0];
                    writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                }
                else if (node.modifiers.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.modifiers!.length; i++) {
                            const item = node.modifiers![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writer.write("factory.createModifier(ts.SyntaxKind." + syntaxKindToName[item.kind] + ")");
                        }
                    });
                }
                writer.write("]");
            }
            writer.write(",").newLine();
            writer.write(node.isTypeOnly.toString())
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
            writer.write(",").newLine();
            if (node.assertClause == null)
                writer.write("undefined");
            else {
                writeNodeText(node.assertClause)
            }
        });
        writer.write(")");
    }

    function createNamedExports(node: import("typescript-next").NamedExports) {
        writer.write("factory.createNamedExports(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createExportSpecifier(node: import("typescript-next").ExportSpecifier) {
        writer.write("factory.createExportSpecifier(");
        writer.newLine();
        writer.indent(() => {
            writer.write(node.isTypeOnly.toString())
            writer.write(",").newLine();
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

    function createExternalModuleReference(node: import("typescript-next").ExternalModuleReference) {
        writer.write("factory.createExternalModuleReference(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createJsxElement(node: import("typescript-next").JsxElement) {
        writer.write("factory.createJsxElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.openingElement)
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length === 1) {
                const item = node.children![0];
                writeNodeText(item)
            }
            else if (node.children.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.children!.length; i++) {
                        const item = node.children![i];
                        if (i > 0)
                            writer.write(",").newLine();
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

    function createJsxSelfClosingElement(node: import("typescript-next").JsxSelfClosingElement) {
        writer.write("factory.createJsxSelfClosingElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tagName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
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

    function createJsxOpeningElement(node: import("typescript-next").JsxOpeningElement) {
        writer.write("factory.createJsxOpeningElement(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.tagName)
            writer.write(",").newLine();
            if (node.typeArguments == null)
                writer.write("undefined");
            else {
                writer.write("[");
                if (node.typeArguments.length === 1) {
                    const item = node.typeArguments![0];
                    writeNodeTextForTypeNode(item)
                }
                else if (node.typeArguments.length > 1) {
                    writer.indent(() => {
                        for (let i = 0; i < node.typeArguments!.length; i++) {
                            const item = node.typeArguments![i];
                            if (i > 0)
                                writer.write(",").newLine();
                            writeNodeTextForTypeNode(item)
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

    function createJsxClosingElement(node: import("typescript-next").JsxClosingElement) {
        writer.write("factory.createJsxClosingElement(");
        writeNodeText(node.tagName)
        writer.write(")");
    }

    function createJsxFragment(node: import("typescript-next").JsxFragment) {
        writer.write("factory.createJsxFragment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.openingFragment)
            writer.write(",").newLine();
            writer.write("[");
            if (node.children.length === 1) {
                const item = node.children![0];
                writeNodeText(item)
            }
            else if (node.children.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.children!.length; i++) {
                        const item = node.children![i];
                        if (i > 0)
                            writer.write(",").newLine();
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

    function createJsxText(node: import("typescript-next").JsxText) {
        writer.write("factory.createJsxText(");
        writer.newLine();
        writer.indent(() => {
            writer.quote(node.text.toString())
            writer.write(",").newLine();
            writer.write(node.containsOnlyTriviaWhiteSpaces.toString())
        });
        writer.write(")");
    }

    function createJsxOpeningFragment(node: import("typescript-next").JsxOpeningFragment) {
        writer.write("factory.createJsxOpeningFragment(");
        writer.write(")");
    }

    function createJsxJsxClosingFragment(node: import("typescript-next").JsxClosingFragment) {
        writer.write("factory.createJsxJsxClosingFragment(");
        writer.write(")");
    }

    function createJsxAttribute(node: import("typescript-next").JsxAttribute) {
        writer.write("factory.createJsxAttribute(");
        writer.newLine();
        writer.indent(() => {
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

    function createJsxAttributes(node: import("typescript-next").JsxAttributes) {
        writer.write("factory.createJsxAttributes(");
        writer.write("[");
        if (node.properties.length === 1) {
            const item = node.properties![0];
            writeNodeText(item)
        }
        else if (node.properties.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.properties!.length; i++) {
                    const item = node.properties![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createJsxSpreadAttribute(node: import("typescript-next").JsxSpreadAttribute) {
        writer.write("factory.createJsxSpreadAttribute(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createJsxExpression(node: import("typescript-next").JsxExpression) {
        writer.write("factory.createJsxExpression(");
        writer.newLine();
        writer.indent(() => {
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

    function createCaseClause(node: import("typescript-next").CaseClause) {
        writer.write("factory.createCaseClause(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.expression)
            writer.write(",").newLine();
            writer.write("[");
            if (node.statements.length === 1) {
                const item = node.statements![0];
                writeNodeText(item)
            }
            else if (node.statements.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.statements!.length; i++) {
                        const item = node.statements![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createDefaultClause(node: import("typescript-next").DefaultClause) {
        writer.write("factory.createDefaultClause(");
        writer.write("[");
        if (node.statements.length === 1) {
            const item = node.statements![0];
            writeNodeText(item)
        }
        else if (node.statements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.statements!.length; i++) {
                    const item = node.statements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
        writer.write(")");
    }

    function createHeritageClause(node: import("typescript-next").HeritageClause) {
        writer.write("factory.createHeritageClause(");
        writer.newLine();
        writer.indent(() => {
            writer.write("ts.SyntaxKind.").write(syntaxKindToName[node.token])
            writer.write(",").newLine();
            writer.write("[");
            if (node.types.length === 1) {
                const item = node.types![0];
                writeNodeText(item)
            }
            else if (node.types.length > 1) {
                writer.indent(() => {
                    for (let i = 0; i < node.types!.length; i++) {
                        const item = node.types![i];
                        if (i > 0)
                            writer.write(",").newLine();
                        writeNodeText(item)
                    }
                });
            }
            writer.write("]");
        });
        writer.write(")");
    }

    function createCatchClause(node: import("typescript-next").CatchClause) {
        writer.write("factory.createCatchClause(");
        writer.newLine();
        writer.indent(() => {
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

    function createPropertyAssignment(node: import("typescript-next").PropertyAssignment) {
        writer.write("factory.createPropertyAssignment(");
        writer.newLine();
        writer.indent(() => {
            writeNodeText(node.name)
            writer.write(",").newLine();
            writeNodeText(node.initializer)
        });
        writer.write(")");
    }

    function createShorthandPropertyAssignment(node: import("typescript-next").ShorthandPropertyAssignment) {
        writer.write("factory.createShorthandPropertyAssignment(");
        writer.newLine();
        writer.indent(() => {
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

    function createSpreadAssignment(node: import("typescript-next").SpreadAssignment) {
        writer.write("factory.createSpreadAssignment(");
        writeNodeText(node.expression)
        writer.write(")");
    }

    function createEnumMember(node: import("typescript-next").EnumMember) {
        writer.write("factory.createEnumMember(");
        writer.newLine();
        writer.indent(() => {
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

    function createCommaListExpression(node: import("typescript-next").CommaListExpression) {
        writer.write("factory.createCommaListExpression(");
        writer.write("[");
        if (node.elements.length === 1) {
            const item = node.elements![0];
            writeNodeText(item)
        }
        else if (node.elements.length > 1) {
            writer.indent(() => {
                for (let i = 0; i < node.elements!.length; i++) {
                    const item = node.elements![i];
                    if (i > 0)
                        writer.write(",").newLine();
                    writeNodeText(item)
                }
            });
        }
        writer.write("]");
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

    function getNodeFlagValues(value: number) {
        // ignore the BlockScoped node flag
        return getFlagValuesAsString(ts.NodeFlags, "ts.NodeFlags", value || 0, "None", getFlagValues(ts.NodeFlags, value).filter(v => v !== ts.NodeFlags.BlockScoped));
    }

    function getFlagValuesAsString(enumObj: any, enumName: string, value: number, defaultName: string, flagValues?: number[]) {
        flagValues = flagValues || getFlagValues(enumObj, value);
        const members: string[] = [];
        for (const flagValue of flagValues)
            members.push(enumName + "." + enumObj[flagValue]);
        if (members.length === 0)
            members.push(enumName + "." + defaultName);
        return members.join(" | ");
    }

    function getFlagValues(enumObj: any, value: number) {
        const members: number[] = [];
        for (const prop in enumObj) {
            if (typeof enumObj[prop] === "string")
                continue;
            if ((enumObj[prop] & value) !== 0)
                members.push(enumObj[prop]);
        }
        return members;
    }
}
