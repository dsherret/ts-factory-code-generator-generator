# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.6.1"></a>
## [0.6.1](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.6.0...0.6.1) (2020-11-21)


### Bug Fixes

* [#6](https://github.com/dsherret/ts-factory-code-generator-generator/issues/6) - Generate correct code for keyword type nodes. ([146ad69](https://github.com/dsherret/ts-factory-code-generator-generator/commit/146ad69))
* Ensure `factory` is always used for ts >= 4 ([99b881d](https://github.com/dsherret/ts-factory-code-generator-generator/commit/99b881d))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.5.5...0.6.0) (2020-08-23)


### Features

* Support new TS 4.0 `NodeFactory` ([97ba337](https://github.com/dsherret/ts-factory-code-generator-generator/commit/97ba337))



<a name="0.5.5"></a>
## [0.5.5](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.5.4...0.5.5) (2020-05-08)


### Bug Fixes

* Ignore JS doc factory functions for now. ([a29e3fe](https://github.com/dsherret/ts-factory-code-generator-generator/commit/a29e3fe))



<a name="0.5.4"></a>
## [0.5.4](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.5.2...0.5.4) (2020-03-28)


### Bug Fixes

* [#3](https://github.com/dsherret/ts-factory-code-generator-generator/issues/3) - Fix booleans to not be written with quotes. ([e401485](https://github.com/dsherret/ts-factory-code-generator-generator/commit/e401485))
* Handle createNonNullChain in newest typescript. ([0ee7e8c](https://github.com/dsherret/ts-factory-code-generator-generator/commit/0ee7e8c))



<a name="0.5.3"></a>
## [0.5.3](https://github.com/dsherret/ts-factory-code-generator-generator/compare/0.5.2...0.5.3) (2020-01-07)


### Bug Fixes

* [#3](https://github.com/dsherret/ts-factory-code-generator-generator/issues/3) - Fix booleans to not be written with quotes. ([e401485](https://github.com/dsherret/ts-factory-code-generator-generator/commit/e401485))

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
