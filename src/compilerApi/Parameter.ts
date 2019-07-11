import { Type, ParameterDeclaration } from "ts-morph";
import { Factory } from "./Factory";
import { FactoryFunction } from "./FactoryFunction";

export class Parameter {
    private readonly type: Type;
    constructor(
        private readonly factory: Factory,
        private readonly parent: FactoryFunction,
        private readonly declaration: ParameterDeclaration
    ) {
        this.type = declaration.getType();
    }

    getName() {
        return this.declaration.getName()!;
    }

    getType() {
        return this.type;
    }

    getArrayElementType() {
        if (!this.type.getText().endsWith("[]"))
            return undefined;
        return this.type.getTypeArguments()[0];
    }

    isArray() {
        return this.getArrayElementType() != null;
    }

    isLiteral() {
        return this.type.isLiteral();
    }

    isNode() {
        return this.type.getProperty("kind") != null;
    }

    isString() {
        return false;
    }
}