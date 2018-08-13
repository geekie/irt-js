# `@geekie/irt`

[![npm](https://badgen.net/npm/v/@geekie/irt)](https://npmjs.org/@geekie/irt)
[![License](https://badgen.net/badge/license/MIT/blue)](LICENSE)
[![Travis](https://badgen.net/travis/geekie/irt-js)](https://travis-ci.com/geekie/irt-js)
[![Codecov](https://badgen.net/codecov/c/github/geekie/irt-js)](https://codecov.io/gh/geekie/irt-js)
[![Prettier](https://badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)

IRT tools in JavaScript

## About

This library contains JavaScript implementations of functions related to [Item Response Theory](https://en.wikipedia.org/wiki/Item_response_theory) logistic models.

### Usage

- `itemResponseFunction(zeta: Zeta, theta: number)`

Calculates the probability that a person with the given ability level theta will answer correctly an item.

`zeta` is an object with the 3 parameters: `{a, b, c}`

- `information(zeta: Zeta, theta: number)` | `information(zetaArray: Array<Zeta>, theta: number)`

Calculates how much information an item (or an array of items) contributes for a given ability level theta.

- `estimateAbilityEAP(answers: Array<0 | 1>, zetaArray: Array<Zeta>)`

Estimate a person's ability using the EAP method ([reference](https://link.springer.com/article/10.1007/BF02293801)).

`answers` is an array of `0` or `1` representing if the answer given is correct, related to the items of `zetaArray`. `1` means the answers is correct.

Example: `answers[0]` represents if the person answered the item related to `zetaArray[0]`.
