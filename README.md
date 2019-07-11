# TypeScript Compiler API Factory Code Generator Generator

Generates code that generates TypeScript Compiler API factory code from an AST.

This will serve the purpose of generating code that generates compiler API factory code from an AST based on specific TypeScript compiler API version. It will be used for [ts-ast-viewer.com](https://ts-ast-viewer.com).

## Benefits

1. Automatic maintenance of future factory code functionality (`typescript@next` support).
2. Support all compiler API versions.
3. Current solution requires reparsing an AST from the text because it's pegged at a specific version. This could reuse the AST used by the rest of the site.

## Use

Save the TypeScript versions as aliases using yarn:

```
yarn add typescript-3.5.3@npm:typescript@3.5.3
```

Then get the code for each compiler api version:

```ts
const code = generateCode("typescript");
const codeFor3_5_3 = generateCode("typescript-3.5.3");
```
