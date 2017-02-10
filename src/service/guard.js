const guards = require('pattern-guard');

const [a, b, c] = [1, 3, 7];

const result = guards({a, b, c})`
  | c > a = 42`;

console.log(result)