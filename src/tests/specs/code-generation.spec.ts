import * as tsCompiler from "typescript";

function generate(ts: typeof import("typescript-3.5.3"), sourceFile: import("typescript-3.5.3").SourceFile) {
    const syntaxKindToName = createSyntaxKindToNameMap();
    return getNodeText(sourceFile);

    function getNodeText(node: import("typescript-3.5.3").Node): string {
        switch (node.kind) {
            case ts.SyntaxKind.NumericLiteral:
                return createNumericLiteral(node as import("typescript-3.5.3").NumericLiteral);
            case ts.SyntaxKind.BigIntLiteral:
                return createBigIntLiteral(node as import("typescript-3.5.3").BigIntLiteral);
            case ts.SyntaxKind.StringLiteral:
                return createStringLiteral(node as import("typescript-3.5.3").StringLiteral);
            case ts.SyntaxKind.RegularExpressionLiteral:
                return createRegularExpressionLiteral(node as import("typescript-3.5.3").RegularExpressionLiteral);
            case ts.SyntaxKind.Identifier:
                return createIdentifier(node as import("typescript-3.5.3").Identifier);
            case ts.SyntaxKind.SuperKeyword:
                return createSuper(node as import("typescript-3.5.3").SuperExpression);
            case ts.SyntaxKind.ThisKeyword:
                return createThis(node as import("typescript-3.5.3").ThisExpression);
            case ts.SyntaxKind.NullKeyword:
                return createNull(node as import("typescript-3.5.3").NullLiteral);
            case ts.SyntaxKind.TrueKeyword:
                return createTrue(node as import("typescript-3.5.3").BooleanLiteral);
            case ts.SyntaxKind.FalseKeyword:
                return createFalse(node as import("typescript-3.5.3").BooleanLiteral);
            case ts.SyntaxKind.QualifiedName:
                return createQualifiedName(node as import("typescript-3.5.3").QualifiedName);
            case ts.SyntaxKind.ComputedPropertyName:
                return createComputedPropertyName(node as import("typescript-3.5.3").ComputedPropertyName);
            case ts.SyntaxKind.TypeParameter:
                return createTypeParameterDeclaration(node as import("typescript-3.5.3").TypeParameterDeclaration);
            case ts.SyntaxKind.Parameter:
                return createParameter(node as import("typescript-3.5.3").ParameterDeclaration);
            case ts.SyntaxKind.Decorator:
                return createDecorator(node as import("typescript-3.5.3").Decorator);
            case ts.SyntaxKind.PropertySignature:
                return createPropertySignature(node as import("typescript-3.5.3").PropertySignature);
            case ts.SyntaxKind.PropertyDeclaration:
                return createProperty(node as import("typescript-3.5.3").PropertyDeclaration);
            case ts.SyntaxKind.MethodSignature:
                return createMethodSignature(node as import("typescript-3.5.3").MethodSignature);
            case ts.SyntaxKind.MethodDeclaration:
                return createMethod(node as import("typescript-3.5.3").MethodDeclaration);
            case ts.SyntaxKind.Constructor:
                return createConstructor(node as import("typescript-3.5.3").ConstructorDeclaration);
            case ts.SyntaxKind.GetAccessor:
                return createGetAccessor(node as import("typescript-3.5.3").GetAccessorDeclaration);
            case ts.SyntaxKind.SetAccessor:
                return createSetAccessor(node as import("typescript-3.5.3").SetAccessorDeclaration);
            case ts.SyntaxKind.CallSignature:
                return createCallSignature(node as import("typescript-3.5.3").CallSignatureDeclaration);
            case ts.SyntaxKind.ConstructSignature:
                return createConstructSignature(node as import("typescript-3.5.3").ConstructSignatureDeclaration);
            case ts.SyntaxKind.IndexSignature:
                return createIndexSignature(node as import("typescript-3.5.3").IndexSignatureDeclaration);
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
                return createKeywordTypeNode(node as import("typescript-3.5.3").KeywordTypeNode);
            case ts.SyntaxKind.TypePredicate:
                return createTypePredicateNode(node as import("typescript-3.5.3").TypePredicateNode);
            case ts.SyntaxKind.TypeReference:
                return createTypeReferenceNode(node as import("typescript-3.5.3").TypeReferenceNode);
            case ts.SyntaxKind.FunctionType:
                return createFunctionTypeNode(node as import("typescript-3.5.3").FunctionTypeNode);
            case ts.SyntaxKind.ConstructorType:
                return createConstructorTypeNode(node as import("typescript-3.5.3").ConstructorTypeNode);
            case ts.SyntaxKind.TypeQuery:
                return createTypeQueryNode(node as import("typescript-3.5.3").TypeQueryNode);
            case ts.SyntaxKind.TypeLiteral:
                return createTypeLiteralNode(node as import("typescript-3.5.3").TypeLiteralNode);
            case ts.SyntaxKind.ArrayType:
                return createArrayTypeNode(node as import("typescript-3.5.3").ArrayTypeNode);
            case ts.SyntaxKind.TupleType:
                return createTupleTypeNode(node as import("typescript-3.5.3").TupleTypeNode);
            case ts.SyntaxKind.OptionalType:
                return createOptionalTypeNode(node as import("typescript-3.5.3").OptionalTypeNode);
            case ts.SyntaxKind.RestType:
                return createRestTypeNode(node as import("typescript-3.5.3").RestTypeNode);
            case ts.SyntaxKind.UnionType:
                return createUnionTypeNode(node as import("typescript-3.5.3").UnionTypeNode);
            case ts.SyntaxKind.IntersectionType:
                return createIntersectionTypeNode(node as import("typescript-3.5.3").IntersectionTypeNode);
            case ts.SyntaxKind.ConditionalType:
                return createConditionalTypeNode(node as import("typescript-3.5.3").ConditionalTypeNode);
            case ts.SyntaxKind.InferType:
                return createInferTypeNode(node as import("typescript-3.5.3").InferTypeNode);
            case ts.SyntaxKind.ImportType:
                return createImportTypeNode(node as import("typescript-3.5.3").ImportTypeNode);
            case ts.SyntaxKind.ParenthesizedType:
                return createParenthesizedType(node as import("typescript-3.5.3").ParenthesizedTypeNode);
            case ts.SyntaxKind.ThisType:
                return createThisTypeNode(node as import("typescript-3.5.3").ThisTypeNode);
            case ts.SyntaxKind.TypeOperator:
                return createTypeOperatorNode(node as import("typescript-3.5.3").TypeOperatorNode);
            case ts.SyntaxKind.IndexedAccessType:
                return createIndexedAccessTypeNode(node as import("typescript-3.5.3").IndexedAccessTypeNode);
            case ts.SyntaxKind.MappedType:
                return createMappedTypeNode(node as import("typescript-3.5.3").MappedTypeNode);
            case ts.SyntaxKind.LiteralType:
                return createLiteralTypeNode(node as import("typescript-3.5.3").LiteralTypeNode);
            case ts.SyntaxKind.ObjectBindingPattern:
                return createObjectBindingPattern(node as import("typescript-3.5.3").ObjectBindingPattern);
            case ts.SyntaxKind.ArrayBindingPattern:
                return createArrayBindingPattern(node as import("typescript-3.5.3").ArrayBindingPattern);
            case ts.SyntaxKind.BindingElement:
                return createBindingElement(node as import("typescript-3.5.3").BindingElement);
            case ts.SyntaxKind.ArrayLiteralExpression:
                return createArrayLiteral(node as import("typescript-3.5.3").ArrayLiteralExpression);
            case ts.SyntaxKind.ObjectLiteralExpression:
                return createObjectLiteral(node as import("typescript-3.5.3").ObjectLiteralExpression);
            case ts.SyntaxKind.PropertyAccessExpression:
                return createPropertyAccess(node as import("typescript-3.5.3").PropertyAccessExpression);
            case ts.SyntaxKind.ElementAccessExpression:
                return createElementAccess(node as import("typescript-3.5.3").ElementAccessExpression);
            case ts.SyntaxKind.CallExpression:
                return createCall(node as import("typescript-3.5.3").CallExpression);
            case ts.SyntaxKind.NewExpression:
                return createNew(node as import("typescript-3.5.3").NewExpression);
            case ts.SyntaxKind.TaggedTemplateExpression:
                return createTaggedTemplate(node as import("typescript-3.5.3").TaggedTemplateExpression);
            case ts.SyntaxKind.TypeAssertionExpression:
                return createTypeAssertion(node as import("typescript-3.5.3").TypeAssertion);
            case ts.SyntaxKind.ParenthesizedExpression:
                return createParen(node as import("typescript-3.5.3").ParenthesizedExpression);
            case ts.SyntaxKind.FunctionExpression:
                return createFunctionExpression(node as import("typescript-3.5.3").FunctionExpression);
            case ts.SyntaxKind.ArrowFunction:
                return createArrowFunction(node as import("typescript-3.5.3").ArrowFunction);
            case ts.SyntaxKind.DeleteExpression:
                return createDelete(node as import("typescript-3.5.3").DeleteExpression);
            case ts.SyntaxKind.TypeOfExpression:
                return createTypeOf(node as import("typescript-3.5.3").TypeOfExpression);
            case ts.SyntaxKind.VoidExpression:
                return createVoid(node as import("typescript-3.5.3").VoidExpression);
            case ts.SyntaxKind.AwaitExpression:
                return createAwait(node as import("typescript-3.5.3").AwaitExpression);
            case ts.SyntaxKind.PrefixUnaryExpression:
                return createPrefix(node as import("typescript-3.5.3").PrefixUnaryExpression);
            case ts.SyntaxKind.PostfixUnaryExpression:
                return createPostfix(node as import("typescript-3.5.3").PostfixUnaryExpression);
            case ts.SyntaxKind.BinaryExpression:
                return createBinary(node as import("typescript-3.5.3").BinaryExpression);
            case ts.SyntaxKind.ConditionalExpression:
                return createConditional(node as import("typescript-3.5.3").ConditionalExpression);
            case ts.SyntaxKind.TemplateExpression:
                return createTemplateExpression(node as import("typescript-3.5.3").TemplateExpression);
            case ts.SyntaxKind.TemplateHead:
                return createTemplateHead(node as import("typescript-3.5.3").TemplateHead);
            case ts.SyntaxKind.TemplateMiddle:
                return createTemplateMiddle(node as import("typescript-3.5.3").TemplateMiddle);
            case ts.SyntaxKind.TemplateTail:
                return createTemplateTail(node as import("typescript-3.5.3").TemplateTail);
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                return createNoSubstitutionTemplateLiteral(node as import("typescript-3.5.3").NoSubstitutionTemplateLiteral);
            case ts.SyntaxKind.YieldExpression:
                return createYield(node as import("typescript-3.5.3").YieldExpression);
            case ts.SyntaxKind.SpreadElement:
                return createSpread(node as import("typescript-3.5.3").SpreadElement);
            case ts.SyntaxKind.ClassExpression:
                return createClassExpression(node as import("typescript-3.5.3").ClassExpression);
            case ts.SyntaxKind.OmittedExpression:
                return createOmittedExpression(node as import("typescript-3.5.3").OmittedExpression);
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                return createExpressionWithTypeArguments(node as import("typescript-3.5.3").ExpressionWithTypeArguments);
            case ts.SyntaxKind.AsExpression:
                return createAsExpression(node as import("typescript-3.5.3").AsExpression);
            case ts.SyntaxKind.NonNullExpression:
                return createNonNullExpression(node as import("typescript-3.5.3").NonNullExpression);
            case ts.SyntaxKind.MetaProperty:
                return createMetaProperty(node as import("typescript-3.5.3").MetaProperty);
            case ts.SyntaxKind.TemplateSpan:
                return createTemplateSpan(node as import("typescript-3.5.3").TemplateSpan);
            case ts.SyntaxKind.SemicolonClassElement:
                return createSemicolonClassElement(node as import("typescript-3.5.3").SemicolonClassElement);
            case ts.SyntaxKind.Block:
                return createBlock(node as import("typescript-3.5.3").Block);
            case ts.SyntaxKind.VariableStatement:
                return createVariableStatement(node as import("typescript-3.5.3").VariableStatement);
            case ts.SyntaxKind.EmptyStatement:
                return createEmptyStatement(node as import("typescript-3.5.3").EmptyStatement);
            case ts.SyntaxKind.ExpressionStatement:
                return createExpressionStatement(node as import("typescript-3.5.3").ExpressionStatement);
            case ts.SyntaxKind.IfStatement:
                return createIf(node as import("typescript-3.5.3").IfStatement);
            case ts.SyntaxKind.DoStatement:
                return createDo(node as import("typescript-3.5.3").DoStatement);
            case ts.SyntaxKind.WhileStatement:
                return createWhile(node as import("typescript-3.5.3").WhileStatement);
            case ts.SyntaxKind.ForStatement:
                return createFor(node as import("typescript-3.5.3").ForStatement);
            case ts.SyntaxKind.ForInStatement:
                return createForIn(node as import("typescript-3.5.3").ForInStatement);
            case ts.SyntaxKind.ForOfStatement:
                return createForOf(node as import("typescript-3.5.3").ForOfStatement);
            case ts.SyntaxKind.ContinueStatement:
                return createContinue(node as import("typescript-3.5.3").ContinueStatement);
            case ts.SyntaxKind.BreakStatement:
                return createBreak(node as import("typescript-3.5.3").BreakStatement);
            case ts.SyntaxKind.ReturnStatement:
                return createReturn(node as import("typescript-3.5.3").ReturnStatement);
            case ts.SyntaxKind.WithStatement:
                return createWith(node as import("typescript-3.5.3").WithStatement);
            case ts.SyntaxKind.SwitchStatement:
                return createSwitch(node as import("typescript-3.5.3").SwitchStatement);
            case ts.SyntaxKind.LabeledStatement:
                return createLabel(node as import("typescript-3.5.3").LabeledStatement);
            case ts.SyntaxKind.ThrowStatement:
                return createThrow(node as import("typescript-3.5.3").ThrowStatement);
            case ts.SyntaxKind.TryStatement:
                return createTry(node as import("typescript-3.5.3").TryStatement);
            case ts.SyntaxKind.DebuggerStatement:
                return createDebuggerStatement(node as import("typescript-3.5.3").DebuggerStatement);
            case ts.SyntaxKind.VariableDeclaration:
                return createVariableDeclaration(node as import("typescript-3.5.3").VariableDeclaration);
            case ts.SyntaxKind.VariableDeclarationList:
                return createVariableDeclarationList(node as import("typescript-3.5.3").VariableDeclarationList);
            case ts.SyntaxKind.FunctionDeclaration:
                return createFunctionDeclaration(node as import("typescript-3.5.3").FunctionDeclaration);
            case ts.SyntaxKind.ClassDeclaration:
                return createClassDeclaration(node as import("typescript-3.5.3").ClassDeclaration);
            case ts.SyntaxKind.InterfaceDeclaration:
                return createInterfaceDeclaration(node as import("typescript-3.5.3").InterfaceDeclaration);
            case ts.SyntaxKind.TypeAliasDeclaration:
                return createTypeAliasDeclaration(node as import("typescript-3.5.3").TypeAliasDeclaration);
            case ts.SyntaxKind.EnumDeclaration:
                return createEnumDeclaration(node as import("typescript-3.5.3").EnumDeclaration);
            case ts.SyntaxKind.ModuleDeclaration:
                return createModuleDeclaration(node as import("typescript-3.5.3").ModuleDeclaration);
            case ts.SyntaxKind.ModuleBlock:
                return createModuleBlock(node as import("typescript-3.5.3").ModuleBlock);
            case ts.SyntaxKind.CaseBlock:
                return createCaseBlock(node as import("typescript-3.5.3").CaseBlock);
            case ts.SyntaxKind.NamespaceExportDeclaration:
                return createNamespaceExportDeclaration(node as import("typescript-3.5.3").NamespaceExportDeclaration);
            case ts.SyntaxKind.ImportEqualsDeclaration:
                return createImportEqualsDeclaration(node as import("typescript-3.5.3").ImportEqualsDeclaration);
            case ts.SyntaxKind.ImportDeclaration:
                return createImportDeclaration(node as import("typescript-3.5.3").ImportDeclaration);
            case ts.SyntaxKind.ImportClause:
                return createImportClause(node as import("typescript-3.5.3").ImportClause);
            case ts.SyntaxKind.NamespaceImport:
                return createNamespaceImport(node as import("typescript-3.5.3").NamespaceImport);
            case ts.SyntaxKind.NamedImports:
                return createNamedImports(node as import("typescript-3.5.3").NamedImports);
            case ts.SyntaxKind.ImportSpecifier:
                return createImportSpecifier(node as import("typescript-3.5.3").ImportSpecifier);
            case ts.SyntaxKind.ExportAssignment:
                return createExportAssignment(node as import("typescript-3.5.3").ExportAssignment);
            case ts.SyntaxKind.ExportDeclaration:
                return createExportDeclaration(node as import("typescript-3.5.3").ExportDeclaration);
            case ts.SyntaxKind.NamedExports:
                return createNamedExports(node as import("typescript-3.5.3").NamedExports);
            case ts.SyntaxKind.ExportSpecifier:
                return createExportSpecifier(node as import("typescript-3.5.3").ExportSpecifier);
            case ts.SyntaxKind.ExternalModuleReference:
                return createExternalModuleReference(node as import("typescript-3.5.3").ExternalModuleReference);
            case ts.SyntaxKind.JsxElement:
                return createJsxElement(node as import("typescript-3.5.3").JsxElement);
            case ts.SyntaxKind.JsxSelfClosingElement:
                return createJsxSelfClosingElement(node as import("typescript-3.5.3").JsxSelfClosingElement);
            case ts.SyntaxKind.JsxOpeningElement:
                return createJsxOpeningElement(node as import("typescript-3.5.3").JsxOpeningElement);
            case ts.SyntaxKind.JsxClosingElement:
                return createJsxClosingElement(node as import("typescript-3.5.3").JsxClosingElement);
            case ts.SyntaxKind.JsxFragment:
                return createJsxFragment(node as import("typescript-3.5.3").JsxFragment);
            case ts.SyntaxKind.JsxText:
                return createJsxText(node as import("typescript-3.5.3").JsxText);
            case ts.SyntaxKind.JsxOpeningFragment:
                return createJsxOpeningFragment(node as import("typescript-3.5.3").JsxOpeningFragment);
            case ts.SyntaxKind.JsxClosingFragment:
                return createJsxJsxClosingFragment(node as import("typescript-3.5.3").JsxClosingFragment);
            case ts.SyntaxKind.JsxAttribute:
                return createJsxAttribute(node as import("typescript-3.5.3").JsxAttribute);
            case ts.SyntaxKind.JsxAttributes:
                return createJsxAttributes(node as import("typescript-3.5.3").JsxAttributes);
            case ts.SyntaxKind.JsxSpreadAttribute:
                return createJsxSpreadAttribute(node as import("typescript-3.5.3").JsxSpreadAttribute);
            case ts.SyntaxKind.JsxExpression:
                return createJsxExpression(node as import("typescript-3.5.3").JsxExpression);
            case ts.SyntaxKind.CaseClause:
                return createCaseClause(node as import("typescript-3.5.3").CaseClause);
            case ts.SyntaxKind.DefaultClause:
                return createDefaultClause(node as import("typescript-3.5.3").DefaultClause);
            case ts.SyntaxKind.HeritageClause:
                return createHeritageClause(node as import("typescript-3.5.3").HeritageClause);
            case ts.SyntaxKind.CatchClause:
                return createCatchClause(node as import("typescript-3.5.3").CatchClause);
            case ts.SyntaxKind.PropertyAssignment:
                return createPropertyAssignment(node as import("typescript-3.5.3").PropertyAssignment);
            case ts.SyntaxKind.ShorthandPropertyAssignment:
                return createShorthandPropertyAssignment(node as import("typescript-3.5.3").ShorthandPropertyAssignment);
            case ts.SyntaxKind.SpreadAssignment:
                return createSpreadAssignment(node as import("typescript-3.5.3").SpreadAssignment);
            case ts.SyntaxKind.EnumMember:
                return createEnumMember(node as import("typescript-3.5.3").EnumMember);
            case ts.SyntaxKind.CommaListExpression:
                return createCommaList(node as import("typescript-3.5.3").CommaListExpression);
            default:
                throw new Error("Unhandled node kind: " + node.kind);
        }
    }

    function createNumericLiteral(node: import("typescript-3.5.3").NumericLiteral) {
        return "ts.createNumericLiteral(" + "\n"
            + "  " + node.text + ",\n"
            + "  " + getFlagValues(ts.TokenFlags, "TokenFlags", (node as any).numericLiteralFlags || 0)
        + "\n" + ");";
    }

    function createBigIntLiteral(node: import("typescript-3.5.3").BigIntLiteral) {
        return "ts.createBigIntLiteral(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createStringLiteral(node: import("typescript-3.5.3").StringLiteral) {
        return "ts.createStringLiteral(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createRegularExpressionLiteral(node: import("typescript-3.5.3").RegularExpressionLiteral) {
        return "ts.createRegularExpressionLiteral(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createIdentifier(node: import("typescript-3.5.3").Identifier) {
        return "ts.createIdentifier(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createSuper(node: import("typescript-3.5.3").SuperExpression) {
        return "ts.createSuper("
        + ");";
    }

    function createThis(node: import("typescript-3.5.3").ThisExpression) {
        return "ts.createThis("
        + ");";
    }

    function createNull(node: import("typescript-3.5.3").NullLiteral) {
        return "ts.createNull("
        + ");";
    }

    function createTrue(node: import("typescript-3.5.3").BooleanLiteral) {
        return "ts.createTrue("
        + ");";
    }

    function createFalse(node: import("typescript-3.5.3").BooleanLiteral) {
        return "ts.createFalse("
        + ");";
    }

    function createQualifiedName(node: import("typescript-3.5.3").QualifiedName) {
        return "ts.createQualifiedName(" + "\n"
            + "  " + getNodeText(node.left) + ",\n"
            + "  " + getNodeText(node.right)
        + "\n" + ");";
    }

    function createComputedPropertyName(node: import("typescript-3.5.3").ComputedPropertyName) {
        return "ts.createComputedPropertyName(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createTypeParameterDeclaration(node: import("typescript-3.5.3").TypeParameterDeclaration) {
        return "ts.createTypeParameterDeclaration(" + "\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.constraint == null ? undefined : getNodeText(node.constraint)) + ",\n"
            + "  " + (node.default == null ? undefined : getNodeText(node.default))
        + "\n" + ");";
    }

    function createParameter(node: import("typescript-3.5.3").ParameterDeclaration) {
        return "ts.createParameter(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.dotDotDotToken == null ? undefined : getNodeText(node.dotDotDotToken)) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.questionToken == null ? undefined : getNodeText(node.questionToken)) + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer))
        + "\n" + ");";
    }

    function createDecorator(node: import("typescript-3.5.3").Decorator) {
        return "ts.createDecorator(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createPropertySignature(node: import("typescript-3.5.3").PropertySignature) {
        return "ts.createPropertySignature(" + "\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.questionToken == null ? undefined : getNodeText(node.questionToken)) + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer))
        + "\n" + ");";
    }

    function createProperty(node: import("typescript-3.5.3").PropertyDeclaration) {
        return "ts.createProperty(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + node.questionToken || node.exclamationToken + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer))
        + "\n" + ");";
    }

    function createMethodSignature(node: import("typescript-3.5.3").MethodSignature) {
        return "ts.createMethodSignature(" + "\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.questionToken == null ? undefined : getNodeText(node.questionToken))
        + "\n" + ");";
    }

    function createMethod(node: import("typescript-3.5.3").MethodDeclaration) {
        return "ts.createMethod(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.asteriskToken == null ? undefined : getNodeText(node.asteriskToken)) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.questionToken == null ? undefined : getNodeText(node.questionToken)) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + (node.body == null ? undefined : getNodeText(node.body))
        + "\n" + ");";
    }

    function createConstructor(node: import("typescript-3.5.3").ConstructorDeclaration) {
        return "ts.createConstructor(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.body == null ? undefined : getNodeText(node.body))
        + "\n" + ");";
    }

    function createGetAccessor(node: import("typescript-3.5.3").GetAccessorDeclaration) {
        return "ts.createGetAccessor(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + (node.body == null ? undefined : getNodeText(node.body))
        + "\n" + ");";
    }

    function createSetAccessor(node: import("typescript-3.5.3").SetAccessorDeclaration) {
        return "ts.createSetAccessor(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.body == null ? undefined : getNodeText(node.body))
        + "\n" + ");";
    }

    function createCallSignature(node: import("typescript-3.5.3").CallSignatureDeclaration) {
        return "ts.createCallSignature(" + "\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type))
        + "\n" + ");";
    }

    function createConstructSignature(node: import("typescript-3.5.3").ConstructSignatureDeclaration) {
        return "ts.createConstructSignature(" + "\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type))
        + "\n" + ");";
    }

    function createIndexSignature(node: import("typescript-3.5.3").IndexSignatureDeclaration) {
        return "ts.createIndexSignature(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type))
        + "\n" + ");";
    }

    function createKeywordTypeNode(node: import("typescript-3.5.3").KeywordTypeNode) {
        return "ts.createKeywordTypeNode(" + "\n"
            + "  " + syntaxKindToName[node.kind]
        + "\n" + ");";
    }

    function createTypePredicateNode(node: import("typescript-3.5.3").TypePredicateNode) {
        return "ts.createTypePredicateNode(" + "\n"
            + "  " + getNodeText(node.parameterName) + ",\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createTypeReferenceNode(node: import("typescript-3.5.3").TypeReferenceNode) {
        return "ts.createTypeReferenceNode(" + "\n"
            + "  " + getNodeText(node.typeName) + ",\n"
            + "  " + (node.typeArguments == null ? undefined : node.typeArguments)
        + "\n" + ");";
    }

    function createFunctionTypeNode(node: import("typescript-3.5.3").FunctionTypeNode) {
        return "ts.createFunctionTypeNode(" + "\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createConstructorTypeNode(node: import("typescript-3.5.3").ConstructorTypeNode) {
        return "ts.createConstructorTypeNode(" + "\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createTypeQueryNode(node: import("typescript-3.5.3").TypeQueryNode) {
        return "ts.createTypeQueryNode(" + "\n"
            + "  " + getNodeText(node.exprName)
        + "\n" + ");";
    }

    function createTypeLiteralNode(node: import("typescript-3.5.3").TypeLiteralNode) {
        return "ts.createTypeLiteralNode(" + "\n"
            + "  " + node.members
        + "\n" + ");";
    }

    function createArrayTypeNode(node: import("typescript-3.5.3").ArrayTypeNode) {
        return "ts.createArrayTypeNode(" + "\n"
            + "  " + getNodeText(node.elementType)
        + "\n" + ");";
    }

    function createTupleTypeNode(node: import("typescript-3.5.3").TupleTypeNode) {
        return "ts.createTupleTypeNode(" + "\n"
            + "  " + "[\n" + "\n  " + node.elementTypes.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createOptionalTypeNode(node: import("typescript-3.5.3").OptionalTypeNode) {
        return "ts.createOptionalTypeNode(" + "\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createRestTypeNode(node: import("typescript-3.5.3").RestTypeNode) {
        return "ts.createRestTypeNode(" + "\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createUnionTypeNode(node: import("typescript-3.5.3").UnionTypeNode) {
        return "ts.createUnionTypeNode(" + "\n"
            + "  " + "[\n" + "\n  " + node.types.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createIntersectionTypeNode(node: import("typescript-3.5.3").IntersectionTypeNode) {
        return "ts.createIntersectionTypeNode(" + "\n"
            + "  " + "[\n" + "\n  " + node.types.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createConditionalTypeNode(node: import("typescript-3.5.3").ConditionalTypeNode) {
        return "ts.createConditionalTypeNode(" + "\n"
            + "  " + getNodeText(node.checkType) + ",\n"
            + "  " + getNodeText(node.extendsType) + ",\n"
            + "  " + getNodeText(node.trueType) + ",\n"
            + "  " + getNodeText(node.falseType)
        + "\n" + ");";
    }

    function createInferTypeNode(node: import("typescript-3.5.3").InferTypeNode) {
        return "ts.createInferTypeNode(" + "\n"
            + "  " + getNodeText(node.typeParameter)
        + "\n" + ");";
    }

    function createImportTypeNode(node: import("typescript-3.5.3").ImportTypeNode) {
        return "ts.createImportTypeNode(" + "\n"
            + "  " + getNodeText(node.argument) + ",\n"
            + "  " + (node.qualifier == null ? undefined : getNodeText(node.qualifier)) + ",\n"
            + "  " + (node.typeArguments == null ? undefined : node.typeArguments) + ",\n"
            + "  " + (node.isTypeOf == null ? undefined : node.isTypeOf)
        + "\n" + ");";
    }

    function createParenthesizedType(node: import("typescript-3.5.3").ParenthesizedTypeNode) {
        return "ts.createParenthesizedType(" + "\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createThisTypeNode(node: import("typescript-3.5.3").ThisTypeNode) {
        return "ts.createThisTypeNode("
        + ");";
    }

    function createTypeOperatorNode(node: import("typescript-3.5.3").TypeOperatorNode) {
        return "ts.createTypeOperatorNode(" + "\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createIndexedAccessTypeNode(node: import("typescript-3.5.3").IndexedAccessTypeNode) {
        return "ts.createIndexedAccessTypeNode(" + "\n"
            + "  " + getNodeText(node.objectType) + ",\n"
            + "  " + getNodeText(node.indexType)
        + "\n" + ");";
    }

    function createMappedTypeNode(node: import("typescript-3.5.3").MappedTypeNode) {
        return "ts.createMappedTypeNode(" + "\n"
            + "  " + (node.readonlyToken == null ? undefined : getNodeText(node.readonlyToken)) + ",\n"
            + "  " + getNodeText(node.typeParameter) + ",\n"
            + "  " + (node.questionToken == null ? undefined : getNodeText(node.questionToken)) + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type))
        + "\n" + ");";
    }

    function createLiteralTypeNode(node: import("typescript-3.5.3").LiteralTypeNode) {
        return "ts.createLiteralTypeNode(" + "\n"
            + "  " + getNodeText(node.literal)
        + "\n" + ");";
    }

    function createObjectBindingPattern(node: import("typescript-3.5.3").ObjectBindingPattern) {
        return "ts.createObjectBindingPattern(" + "\n"
            + "  " + "[\n" + "\n  " + node.elements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createArrayBindingPattern(node: import("typescript-3.5.3").ArrayBindingPattern) {
        return "ts.createArrayBindingPattern(" + "\n"
            + "  " + "[\n" + "\n  " + node.elements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createBindingElement(node: import("typescript-3.5.3").BindingElement) {
        return "ts.createBindingElement(" + "\n"
            + "  " + (node.dotDotDotToken == null ? undefined : getNodeText(node.dotDotDotToken)) + ",\n"
            + "  " + (node.propertyName == null ? undefined : getNodeText(node.propertyName)) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer))
        + "\n" + ");";
    }

    function createArrayLiteral(node: import("typescript-3.5.3").ArrayLiteralExpression) {
        return "ts.createArrayLiteral(" + "\n"
            + "  " + node.elements + ",\n"
            + "  " + (node as any).multiLine
        + "\n" + ");";
    }

    function createObjectLiteral(node: import("typescript-3.5.3").ObjectLiteralExpression) {
        return "ts.createObjectLiteral(" + "\n"
            + "  " + node.properties + ",\n"
            + "  " + (node as any).multiLine
        + "\n" + ");";
    }

    function createPropertyAccess(node: import("typescript-3.5.3").PropertyAccessExpression) {
        return "ts.createPropertyAccess(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.name)
        + "\n" + ");";
    }

    function createElementAccess(node: import("typescript-3.5.3").ElementAccessExpression) {
        return "ts.createElementAccess(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.argumentExpression)
        + "\n" + ");";
    }

    function createCall(node: import("typescript-3.5.3").CallExpression) {
        return "ts.createCall(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + (node.typeArguments == null ? undefined : node.typeArguments) + ",\n"
            + "  " + node.arguments
        + "\n" + ");";
    }

    function createNew(node: import("typescript-3.5.3").NewExpression) {
        return "ts.createNew(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + (node.typeArguments == null ? undefined : node.typeArguments) + ",\n"
            + "  " + (node.arguments == null ? undefined : node.arguments)
        + "\n" + ");";
    }

    function createTaggedTemplate(node: import("typescript-3.5.3").TaggedTemplateExpression) {
        return "ts.createTaggedTemplate(" + "\n"
            + "  " + getNodeText(node.tag) + ",\n"
            + "  " + getNodeText(node.template)
        + "\n" + ");";
    }

    function createTypeAssertion(node: import("typescript-3.5.3").TypeAssertion) {
        return "ts.createTypeAssertion(" + "\n"
            + "  " + getNodeText(node.type) + ",\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createParen(node: import("typescript-3.5.3").ParenthesizedExpression) {
        return "ts.createParen(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createFunctionExpression(node: import("typescript-3.5.3").FunctionExpression) {
        return "ts.createFunctionExpression(" + "\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.asteriskToken == null ? undefined : getNodeText(node.asteriskToken)) + ",\n"
            + "  " + (node.name == null ? undefined : getNodeText(node.name)) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + node.parameters + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + getNodeText(node.body)
        + "\n" + ");";
    }

    function createArrowFunction(node: import("typescript-3.5.3").ArrowFunction) {
        return "ts.createArrowFunction(" + "\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + getNodeText(node.equalsGreaterThanToken) + ",\n"
            + "  " + getNodeText(node.body)
        + "\n" + ");";
    }

    function createDelete(node: import("typescript-3.5.3").DeleteExpression) {
        return "ts.createDelete(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createTypeOf(node: import("typescript-3.5.3").TypeOfExpression) {
        return "ts.createTypeOf(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createVoid(node: import("typescript-3.5.3").VoidExpression) {
        return "ts.createVoid(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createAwait(node: import("typescript-3.5.3").AwaitExpression) {
        return "ts.createAwait(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createPrefix(node: import("typescript-3.5.3").PrefixUnaryExpression) {
        return "ts.createPrefix(" + "\n"
            + "  " + syntaxKindToName[node.operator] + ",\n"
            + "  " + getNodeText(node.operand)
        + "\n" + ");";
    }

    function createPostfix(node: import("typescript-3.5.3").PostfixUnaryExpression) {
        return "ts.createPostfix(" + "\n"
            + "  " + getNodeText(node.operand) + ",\n"
            + "  " + syntaxKindToName[node.operator]
        + "\n" + ");";
    }

    function createBinary(node: import("typescript-3.5.3").BinaryExpression) {
        return "ts.createBinary(" + "\n"
            + "  " + getNodeText(node.left) + ",\n"
            + "  " + getNodeText(node.operatorToken) + ",\n"
            + "  " + getNodeText(node.right)
        + "\n" + ");";
    }

    function createConditional(node: import("typescript-3.5.3").ConditionalExpression) {
        return "ts.createConditional(" + "\n"
            + "  " + getNodeText(node.condition) + ",\n"
            + "  " + getNodeText(node.whenTrue) + ",\n"
            + "  " + getNodeText(node.whenFalse)
        + "\n" + ");";
    }

    function createTemplateExpression(node: import("typescript-3.5.3").TemplateExpression) {
        return "ts.createTemplateExpression(" + "\n"
            + "  " + getNodeText(node.head) + ",\n"
            + "  " + "[\n" + "\n  " + node.templateSpans.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createTemplateHead(node: import("typescript-3.5.3").TemplateHead) {
        return "ts.createTemplateHead(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createTemplateMiddle(node: import("typescript-3.5.3").TemplateMiddle) {
        return "ts.createTemplateMiddle(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createTemplateTail(node: import("typescript-3.5.3").TemplateTail) {
        return "ts.createTemplateTail(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createNoSubstitutionTemplateLiteral(node: import("typescript-3.5.3").NoSubstitutionTemplateLiteral) {
        return "ts.createNoSubstitutionTemplateLiteral(" + "\n"
            + "  " + node.text
        + "\n" + ");";
    }

    function createYield(node: import("typescript-3.5.3").YieldExpression) {
        return "ts.createYield(" + "\n"
            + "  " + (node.expression == null ? undefined : getNodeText(node.expression))
        + "\n" + ");";
    }

    function createSpread(node: import("typescript-3.5.3").SpreadElement) {
        return "ts.createSpread(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createClassExpression(node: import("typescript-3.5.3").ClassExpression) {
        return "ts.createClassExpression(" + "\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.name == null ? undefined : getNodeText(node.name)) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + (node.heritageClauses == null ? undefined : node.heritageClauses) + ",\n"
            + "  " + "[\n" + "\n  " + node.members.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createOmittedExpression(node: import("typescript-3.5.3").OmittedExpression) {
        return "ts.createOmittedExpression("
        + ");";
    }

    function createExpressionWithTypeArguments(node: import("typescript-3.5.3").ExpressionWithTypeArguments) {
        return "ts.createExpressionWithTypeArguments(" + "\n"
            + "  " + (node.typeArguments == null ? undefined : node.typeArguments) + ",\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createAsExpression(node: import("typescript-3.5.3").AsExpression) {
        return "ts.createAsExpression(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createNonNullExpression(node: import("typescript-3.5.3").NonNullExpression) {
        return "ts.createNonNullExpression(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createMetaProperty(node: import("typescript-3.5.3").MetaProperty) {
        return "ts.createMetaProperty(" + "\n"
            + "  " + syntaxKindToName[node.keywordToken] + ",\n"
            + "  " + getNodeText(node.name)
        + "\n" + ");";
    }

    function createTemplateSpan(node: import("typescript-3.5.3").TemplateSpan) {
        return "ts.createTemplateSpan(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.literal)
        + "\n" + ");";
    }

    function createSemicolonClassElement(node: import("typescript-3.5.3").SemicolonClassElement) {
        return "ts.createSemicolonClassElement("
        + ");";
    }

    function createBlock(node: import("typescript-3.5.3").Block) {
        return "ts.createBlock(" + "\n"
            + "  " + "[\n" + "\n  " + node.statements.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node as any).multiLine
        + "\n" + ");";
    }

    function createVariableStatement(node: import("typescript-3.5.3").VariableStatement) {
        return "ts.createVariableStatement(" + "\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.declarationList)
        + "\n" + ");";
    }

    function createEmptyStatement(node: import("typescript-3.5.3").EmptyStatement) {
        return "ts.createEmptyStatement("
        + ");";
    }

    function createExpressionStatement(node: import("typescript-3.5.3").ExpressionStatement) {
        return "ts.createExpressionStatement(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createIf(node: import("typescript-3.5.3").IfStatement) {
        return "ts.createIf(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.thenStatement) + ",\n"
            + "  " + (node.elseStatement == null ? undefined : getNodeText(node.elseStatement))
        + "\n" + ");";
    }

    function createDo(node: import("typescript-3.5.3").DoStatement) {
        return "ts.createDo(" + "\n"
            + "  " + getNodeText(node.statement) + ",\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createWhile(node: import("typescript-3.5.3").WhileStatement) {
        return "ts.createWhile(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.statement)
        + "\n" + ");";
    }

    function createFor(node: import("typescript-3.5.3").ForStatement) {
        return "ts.createFor(" + "\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer)) + ",\n"
            + "  " + (node.condition == null ? undefined : getNodeText(node.condition)) + ",\n"
            + "  " + (node.incrementor == null ? undefined : getNodeText(node.incrementor)) + ",\n"
            + "  " + getNodeText(node.statement)
        + "\n" + ");";
    }

    function createForIn(node: import("typescript-3.5.3").ForInStatement) {
        return "ts.createForIn(" + "\n"
            + "  " + getNodeText(node.initializer) + ",\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.statement)
        + "\n" + ");";
    }

    function createForOf(node: import("typescript-3.5.3").ForOfStatement) {
        return "ts.createForOf(" + "\n"
            + "  " + (node.awaitModifier == null ? undefined : getNodeText(node.awaitModifier)) + ",\n"
            + "  " + getNodeText(node.initializer) + ",\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.statement)
        + "\n" + ");";
    }

    function createContinue(node: import("typescript-3.5.3").ContinueStatement) {
        return "ts.createContinue(" + "\n"
            + "  " + (node.label == null ? undefined : getNodeText(node.label))
        + "\n" + ");";
    }

    function createBreak(node: import("typescript-3.5.3").BreakStatement) {
        return "ts.createBreak(" + "\n"
            + "  " + (node.label == null ? undefined : getNodeText(node.label))
        + "\n" + ");";
    }

    function createReturn(node: import("typescript-3.5.3").ReturnStatement) {
        return "ts.createReturn(" + "\n"
            + "  " + (node.expression == null ? undefined : getNodeText(node.expression))
        + "\n" + ");";
    }

    function createWith(node: import("typescript-3.5.3").WithStatement) {
        return "ts.createWith(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.statement)
        + "\n" + ");";
    }

    function createSwitch(node: import("typescript-3.5.3").SwitchStatement) {
        return "ts.createSwitch(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + getNodeText(node.caseBlock)
        + "\n" + ");";
    }

    function createLabel(node: import("typescript-3.5.3").LabeledStatement) {
        return "ts.createLabel(" + "\n"
            + "  " + getNodeText(node.label) + ",\n"
            + "  " + getNodeText(node.statement)
        + "\n" + ");";
    }

    function createThrow(node: import("typescript-3.5.3").ThrowStatement) {
        return "ts.createThrow(" + "\n"
            + "  " + (node.expression == null ? undefined : getNodeText(node.expression))
        + "\n" + ");";
    }

    function createTry(node: import("typescript-3.5.3").TryStatement) {
        return "ts.createTry(" + "\n"
            + "  " + getNodeText(node.tryBlock) + ",\n"
            + "  " + (node.catchClause == null ? undefined : getNodeText(node.catchClause)) + ",\n"
            + "  " + (node.finallyBlock == null ? undefined : getNodeText(node.finallyBlock))
        + "\n" + ");";
    }

    function createDebuggerStatement(node: import("typescript-3.5.3").DebuggerStatement) {
        return "ts.createDebuggerStatement("
        + ");";
    }

    function createVariableDeclaration(node: import("typescript-3.5.3").VariableDeclaration) {
        return "ts.createVariableDeclaration(" + "\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer))
        + "\n" + ");";
    }

    function createVariableDeclarationList(node: import("typescript-3.5.3").VariableDeclarationList) {
        return "ts.createVariableDeclarationList(" + "\n"
            + "  " + "[\n" + "\n  " + node.declarations.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + node.flags
        + "\n" + ");";
    }

    function createFunctionDeclaration(node: import("typescript-3.5.3").FunctionDeclaration) {
        return "ts.createFunctionDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.asteriskToken == null ? undefined : getNodeText(node.asteriskToken)) + ",\n"
            + "  " + (node.name == null ? undefined : getNodeText(node.name)) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + "[\n" + "\n  " + node.parameters.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + (node.type == null ? undefined : getNodeText(node.type)) + ",\n"
            + "  " + (node.body == null ? undefined : getNodeText(node.body))
        + "\n" + ");";
    }

    function createClassDeclaration(node: import("typescript-3.5.3").ClassDeclaration) {
        return "ts.createClassDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.name == null ? undefined : getNodeText(node.name)) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + (node.heritageClauses == null ? undefined : node.heritageClauses) + ",\n"
            + "  " + "[\n" + "\n  " + node.members.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createInterfaceDeclaration(node: import("typescript-3.5.3").InterfaceDeclaration) {
        return "ts.createInterfaceDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + (node.heritageClauses == null ? undefined : node.heritageClauses) + ",\n"
            + "  " + "[\n" + "\n  " + node.members.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createTypeAliasDeclaration(node: import("typescript-3.5.3").TypeAliasDeclaration) {
        return "ts.createTypeAliasDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.typeParameters == null ? undefined : node.typeParameters) + ",\n"
            + "  " + getNodeText(node.type)
        + "\n" + ");";
    }

    function createEnumDeclaration(node: import("typescript-3.5.3").EnumDeclaration) {
        return "ts.createEnumDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + "[\n" + "\n  " + node.members.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createModuleDeclaration(node: import("typescript-3.5.3").ModuleDeclaration) {
        return "ts.createModuleDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.body == null ? undefined : getNodeText(node.body)) + ",\n"
            + "  " + node.flags
        + "\n" + ");";
    }

    function createModuleBlock(node: import("typescript-3.5.3").ModuleBlock) {
        return "ts.createModuleBlock(" + "\n"
            + "  " + "[\n" + "\n  " + node.statements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createCaseBlock(node: import("typescript-3.5.3").CaseBlock) {
        return "ts.createCaseBlock(" + "\n"
            + "  " + "[\n" + "\n  " + node.clauses.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createNamespaceExportDeclaration(node: import("typescript-3.5.3").NamespaceExportDeclaration) {
        return "ts.createNamespaceExportDeclaration(" + "\n"
            + "  " + getNodeText(node.name)
        + "\n" + ");";
    }

    function createImportEqualsDeclaration(node: import("typescript-3.5.3").ImportEqualsDeclaration) {
        return "ts.createImportEqualsDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + getNodeText(node.moduleReference)
        + "\n" + ");";
    }

    function createImportDeclaration(node: import("typescript-3.5.3").ImportDeclaration) {
        return "ts.createImportDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.importClause == null ? undefined : getNodeText(node.importClause)) + ",\n"
            + "  " + getNodeText(node.moduleSpecifier)
        + "\n" + ");";
    }

    function createImportClause(node: import("typescript-3.5.3").ImportClause) {
        return "ts.createImportClause(" + "\n"
            + "  " + (node.name == null ? undefined : getNodeText(node.name)) + ",\n"
            + "  " + (node.namedBindings == null ? undefined : getNodeText(node.namedBindings))
        + "\n" + ");";
    }

    function createNamespaceImport(node: import("typescript-3.5.3").NamespaceImport) {
        return "ts.createNamespaceImport(" + "\n"
            + "  " + getNodeText(node.name)
        + "\n" + ");";
    }

    function createNamedImports(node: import("typescript-3.5.3").NamedImports) {
        return "ts.createNamedImports(" + "\n"
            + "  " + "[\n" + "\n  " + node.elements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createImportSpecifier(node: import("typescript-3.5.3").ImportSpecifier) {
        return "ts.createImportSpecifier(" + "\n"
            + "  " + (node.propertyName == null ? undefined : getNodeText(node.propertyName)) + ",\n"
            + "  " + getNodeText(node.name)
        + "\n" + ");";
    }

    function createExportAssignment(node: import("typescript-3.5.3").ExportAssignment) {
        return "ts.createExportAssignment(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.isExportEquals == null ? undefined : node.isExportEquals) + ",\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createExportDeclaration(node: import("typescript-3.5.3").ExportDeclaration) {
        return "ts.createExportDeclaration(" + "\n"
            + "  " + (node.decorators == null ? undefined : node.decorators) + ",\n"
            + "  " + (node.modifiers == null ? undefined : node.modifiers) + ",\n"
            + "  " + (node.exportClause == null ? undefined : getNodeText(node.exportClause)) + ",\n"
            + "  " + (node.moduleSpecifier == null ? undefined : getNodeText(node.moduleSpecifier))
        + "\n" + ");";
    }

    function createNamedExports(node: import("typescript-3.5.3").NamedExports) {
        return "ts.createNamedExports(" + "\n"
            + "  " + "[\n" + "\n  " + node.elements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createExportSpecifier(node: import("typescript-3.5.3").ExportSpecifier) {
        return "ts.createExportSpecifier(" + "\n"
            + "  " + (node.propertyName == null ? undefined : getNodeText(node.propertyName)) + ",\n"
            + "  " + getNodeText(node.name)
        + "\n" + ");";
    }

    function createExternalModuleReference(node: import("typescript-3.5.3").ExternalModuleReference) {
        return "ts.createExternalModuleReference(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createJsxElement(node: import("typescript-3.5.3").JsxElement) {
        return "ts.createJsxElement(" + "\n"
            + "  " + getNodeText(node.openingElement) + ",\n"
            + "  " + "[\n" + "\n  " + node.children.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + getNodeText(node.closingElement)
        + "\n" + ");";
    }

    function createJsxSelfClosingElement(node: import("typescript-3.5.3").JsxSelfClosingElement) {
        return "ts.createJsxSelfClosingElement(" + "\n"
            + "  " + getNodeText(node.tagName) + ",\n"
            + "  " + (node.typeArguments == null ? undefined : node.typeArguments) + ",\n"
            + "  " + getNodeText(node.attributes)
        + "\n" + ");";
    }

    function createJsxOpeningElement(node: import("typescript-3.5.3").JsxOpeningElement) {
        return "ts.createJsxOpeningElement(" + "\n"
            + "  " + getNodeText(node.tagName) + ",\n"
            + "  " + (node.typeArguments == null ? undefined : node.typeArguments) + ",\n"
            + "  " + getNodeText(node.attributes)
        + "\n" + ");";
    }

    function createJsxClosingElement(node: import("typescript-3.5.3").JsxClosingElement) {
        return "ts.createJsxClosingElement(" + "\n"
            + "  " + getNodeText(node.tagName)
        + "\n" + ");";
    }

    function createJsxFragment(node: import("typescript-3.5.3").JsxFragment) {
        return "ts.createJsxFragment(" + "\n"
            + "  " + getNodeText(node.openingFragment) + ",\n"
            + "  " + "[\n" + "\n  " + node.children.map(item => getNodeText(item)).join(",\n  ") + "\n]" + ",\n"
            + "  " + getNodeText(node.closingFragment)
        + "\n" + ");";
    }

    function createJsxText(node: import("typescript-3.5.3").JsxText) {
        return "ts.createJsxText(" + "\n"
            + "  " + node.text + ",\n"
            + "  " + node.containsOnlyTriviaWhiteSpaces
        + "\n" + ");";
    }

    function createJsxOpeningFragment(node: import("typescript-3.5.3").JsxOpeningFragment) {
        return "ts.createJsxOpeningFragment("
        + ");";
    }

    function createJsxJsxClosingFragment(node: import("typescript-3.5.3").JsxClosingFragment) {
        return "ts.createJsxJsxClosingFragment("
        + ");";
    }

    function createJsxAttribute(node: import("typescript-3.5.3").JsxAttribute) {
        return "ts.createJsxAttribute(" + "\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer))
        + "\n" + ");";
    }

    function createJsxAttributes(node: import("typescript-3.5.3").JsxAttributes) {
        return "ts.createJsxAttributes(" + "\n"
            + "  " + "[\n" + "\n  " + node.properties.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createJsxSpreadAttribute(node: import("typescript-3.5.3").JsxSpreadAttribute) {
        return "ts.createJsxSpreadAttribute(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createJsxExpression(node: import("typescript-3.5.3").JsxExpression) {
        return "ts.createJsxExpression(" + "\n"
            + "  " + (node.dotDotDotToken == null ? undefined : getNodeText(node.dotDotDotToken)) + ",\n"
            + "  " + (node.expression == null ? undefined : getNodeText(node.expression))
        + "\n" + ");";
    }

    function createCaseClause(node: import("typescript-3.5.3").CaseClause) {
        return "ts.createCaseClause(" + "\n"
            + "  " + getNodeText(node.expression) + ",\n"
            + "  " + "[\n" + "\n  " + node.statements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createDefaultClause(node: import("typescript-3.5.3").DefaultClause) {
        return "ts.createDefaultClause(" + "\n"
            + "  " + "[\n" + "\n  " + node.statements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createHeritageClause(node: import("typescript-3.5.3").HeritageClause) {
        return "ts.createHeritageClause(" + "\n"
            + "  " + syntaxKindToName[node.token] + ",\n"
            + "  " + "[\n" + "\n  " + node.types.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
    }

    function createCatchClause(node: import("typescript-3.5.3").CatchClause) {
        return "ts.createCatchClause(" + "\n"
            + "  " + (node.variableDeclaration == null ? undefined : getNodeText(node.variableDeclaration)) + ",\n"
            + "  " + getNodeText(node.block)
        + "\n" + ");";
    }

    function createPropertyAssignment(node: import("typescript-3.5.3").PropertyAssignment) {
        return "ts.createPropertyAssignment(" + "\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + getNodeText(node.initializer)
        + "\n" + ");";
    }

    function createShorthandPropertyAssignment(node: import("typescript-3.5.3").ShorthandPropertyAssignment) {
        return "ts.createShorthandPropertyAssignment(" + "\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.objectAssignmentInitializer == null ? undefined : getNodeText(node.objectAssignmentInitializer))
        + "\n" + ");";
    }

    function createSpreadAssignment(node: import("typescript-3.5.3").SpreadAssignment) {
        return "ts.createSpreadAssignment(" + "\n"
            + "  " + getNodeText(node.expression)
        + "\n" + ");";
    }

    function createEnumMember(node: import("typescript-3.5.3").EnumMember) {
        return "ts.createEnumMember(" + "\n"
            + "  " + getNodeText(node.name) + ",\n"
            + "  " + (node.initializer == null ? undefined : getNodeText(node.initializer))
        + "\n" + ");";
    }

    function createCommaList(node: import("typescript-3.5.3").CommaListExpression) {
        return "ts.createCommaList(" + "\n"
            + "  " + "[\n" + "\n  " + node.elements.map(item => getNodeText(item)).join(",\n  ") + "\n]"
        + "\n" + ");";
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
