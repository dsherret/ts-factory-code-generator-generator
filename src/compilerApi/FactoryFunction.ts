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
        const params = this.declaration.getParameters();
        return params.map(p => new Parameter(this.factory, this, p));
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
                        return false;
                    default:
                        return true;
                }
            });
        }

        return kindNames;
    }
}
