import { Node, Symbol, Type } from "ts-morph";
import { Factory } from "./Factory";
import { resolveTypeToTypeParamConstraintIfNecessary } from "./helpers";

export class TsNodeProperty {
  private readonly type: Type;
  private readonly declaration: Node;

  constructor(private readonly factory: Factory, private readonly symbol: Symbol) {
    this.declaration = symbol.getDeclarations()[0];
    this.type = this.declaration.getType();
  }

  getName() {
    return this.symbol.getName();
  }

  getType() {
    return resolveTypeToTypeParamConstraintIfNecessary(this.type, this.declaration.getParentOrThrow());
  }
}
