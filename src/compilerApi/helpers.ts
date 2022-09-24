import { Node, Type } from "ts-morph";

export function resolveTypeToTypeParamConstraintIfNecessary(type: Type, declaration: Node) {
  if (!Node.isTypeParametered(declaration)) {
    return type;
  }
  const typeText = type.getText(declaration);
  const typeParams = declaration.getTypeParameters();
  const typeParam = typeParams.find(p => p.getName() === typeText);
  if (typeParam != null) {
    return typeParam.getConstraintOrThrow().getType();
  }
  return type;
}
