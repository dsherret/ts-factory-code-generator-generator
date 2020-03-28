import { Type, ParameterDeclaration } from "ts-morph";
import { Factory } from "./Factory";
import { FactoryFunction } from "./FactoryFunction";

export class TsParameter {
    private readonly type: Type;
    constructor(
        private readonly factory: Factory,
        private readonly parent: FactoryFunction,
        private readonly declaration: ParameterDeclaration,
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
        const type = this.type.getNonNullableType();
        const typeText = type.getText();
        if (!typeText.endsWith("[]"))
            return undefined;
        return type.getTypeArguments()[0];
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
