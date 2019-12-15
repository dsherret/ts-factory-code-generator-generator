import { Type, Symbol } from "ts-morph";
import { Factory } from "./Factory";

export class TsNodeProperty {
    private readonly type: Type;

    constructor(private readonly factory: Factory, private readonly symbol: Symbol) {
        const declaration = symbol.getDeclarations()[0];
        this.type = declaration.getType();
    }

    getName() {
        return this.symbol.getName();
    }

    getType() {
        return this.type;
    }
}
