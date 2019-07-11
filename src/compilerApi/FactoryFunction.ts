import { Factory } from "./Factory";
import { FunctionDeclaration } from "ts-morph";
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

    isNodeValid() {
        const returnType = this.declaration.getReturnType();
        return returnType.getSymbol() != null;
    }
}
