let fs = require('fs');



module.exports =  function load() {
  fs.readFileAsync("../micro/index.js", "utf8").then((data) => {
    console.log(data);
  })
}