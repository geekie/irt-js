// @flow

function normal(mean: number, stdDev: number): Array<[number, number]> {
  let distr = [];
  for (let i = -10; i <= 10; i += 0.2) {
    distr.push([i, y(i)]);
  }
  return distr;

  function y(x) {
    return (
      (1 / (Math.sqrt(2 * Math.PI) * stdDev)) *
      Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)))
    );
  }
}

export default normal(0, 1);
