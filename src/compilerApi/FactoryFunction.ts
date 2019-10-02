import { Factory } from "./Factory";
import { FunctionDeclaration, ts, SyntaxKind } from "ts-morph";
import { Parameter } from "./Parameter";

export class FactoryFunction {
    constructor(private readonly factory: Factory, private readonly declaration: FunctionDeclaration) {
    }

    getName() {
        return this.declaration.getNameOrThrow();
    }

    getParameters() {
        const params = this.declaration.getParameters().map(p => new Parameter(this.factory, this, p));
        if (this.getName() === nameof(ts.createNumericLiteral))
            return params.filter(p => p.getName() !== "numericLiteralFlags");
        return params;
    }

    getNode() {
        return this.factory.getNode(this.declaration.getReturnType());
    }

    getKindNames() {
        const kindNames = this.getNode().getKindNames();

        if (this.getName() === nameof(ts.createKeywordTypeNode)) {
            return kindNames.filter(kindName => {
                switch (kindName) {
                    case nameof(SyntaxKind.NullKeyword): // use createNull
                    case nameof(SyntaxKind.ThisKeyword): // use createThis
                    case nameof(SyntaxKind.VoidKeyword): // use createVoid
                        return false;
                    default:
                        return true;
                }
            });
        }

        return kindNames;
    }
}
