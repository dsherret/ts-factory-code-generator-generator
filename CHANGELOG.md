# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.5.2"></a>
## [0.5.2](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.5.1...0.5.2) (2019-10-02)


### Bug Fixes

* Remove import to typescript-next. ([f0a3223](https://github.com/dsherret/ts-factory-code-generator-generator/commit/f0a3223))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.5.0...0.5.1) (2019-10-02)


### Bug Fixes

* Fix order of which factory function gets used when there are multiple funcs with the same syntax kind. ([ff496b0](https://github.com/dsherret/ts-factory-code-generator-generator/commit/ff496b0))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.2.0...0.5.0) (2019-10-02)


### Bug Fixes

* Use `createTypePredicateNodeWithModifier` if it exists (instead of `createTypePredicateNode`). ([000b931](https://github.com/dsherret/ts-factory-code-generator-generator/commit/000b931))


### Features

* [#2](https://github.com/dsherret/ts-factory-code-generator-generator/issues/2) - Support nodes that could have the same syntax kind (ex. CallExpression and CallExpressionChain). ([e5b32b1](https://github.com/dsherret/ts-factory-code-generator-generator/commit/e5b32b1))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.1.4...0.2.0) (2019-07-14)


### Features

* Ignore ts.NodeFlags.BlockScoped. ([7eaaccc](https://github.com/dsherret/ts-factory-code-generator-generator/commit/7eaaccc))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.1.3...0.1.4) (2019-07-13)


### Bug Fixes

* Add newline at the end of the generated file. ([5b2d0ca](https://github.com/dsherret/ts-factory-code-generator-generator/commit/5b2d0ca))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.1.2...0.1.3) (2019-07-13)


### Bug Fixes

* Don't bother printing numeric literal flags. ([6a950a7](https://github.com/dsherret/ts-factory-code-generator-generator/commit/6a950a7))
* Fix multiLine throwing an error when undefined. ([c685f0f](https://github.com/dsherret/ts-factory-code-generator-generator/commit/c685f0f))



<a name="0.1.2"></a>
## 0.1.2 (2019-07-13)


### Bug Fixes

* Support tokens. ([4ef5f9c](https://github.com/dsherret/ts-factory-code-generator-generator/commit/4ef5f9c))
