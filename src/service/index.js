let fs = require('fs');
let Promise = require('bluebird');

let load = require('./load');

Promise.promisifyAll(fs);

fs.readFileAsync("../index.js", "utf8").then((data) => {
  console.log(data);
  return [1,2,3];
}).map((value) => {
  return value + 1;
}).then((result) => {
  console.log(result)
})