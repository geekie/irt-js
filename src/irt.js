// @flow

type Zeta = $Exact<{ a: number, b: number, c: number }>;

import ABILITY_PRIOR from "./prior";

/**
 * Calculates the probability that someone with a given ability level theta
 * will answer correctly an item. Uses the 3 parameters logistic model.
 */
export function itemResponseFunction(zeta: Zeta, theta: number) {
  return zeta.c + (1 - zeta.c) / (1 + Math.exp(-zeta.a * (theta - zeta.b)));
}

/**
 * Calculates how much information an item (or an array of items) contributes
 * for a given ability level theta.
 */
export function information(zeta: Zeta | Array<Zeta>, theta: number) {
  let zetaArr: Array<Zeta> = Array.isArray(zeta) ? zeta : [zeta];
  return zetaArr.reduce((acc, zeta) => {
    let { a, b, c } = zeta;
    let probHit = 1 / (1 + Math.exp(-a * (theta - b)));
    return (
      acc +
      ((Math.pow(a, 2) * (1 - c) * (1 - probHit)) / (c + (1 - c) * probHit)) *
        Math.pow(probHit, 2)
    );
  }, 0);
}

/**
 * Estimate ability using the EAP method.
 * Reference: "Marginal Maximum Likelihood estimation of item parameters: application of
 * an EM algorithm" Bock & Aitkin 1981 --- equation 14.
 */
export function estimateAbilityEAP(answers: Array<0 | 1>, zeta: Array<Zeta>) {
  let num = 0;
  let nf = 0;
  for (let i = 0; i < ABILITY_PRIOR.length; i++) {
    let theta = ABILITY_PRIOR[i][0];
    let probability = ABILITY_PRIOR[i][1];
    let like = likelihood(theta);
    num += theta * like * probability;
    nf += like * probability;
  }
  return num / nf;

  function likelihood(theta) {
    return zeta.reduce((acc, zeta, i) => {
      let irf = itemResponseFunction(zeta, theta);
      return answers[i] === 1 ? acc * irf : acc * (1 - irf);
    }, 1);
  }
}
