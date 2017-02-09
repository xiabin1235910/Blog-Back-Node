var mkdirp = require('mkdirp');
var Promise = require('bluebird');

Promise.promisifyAll(mkdirp);

mkdirp.mkdirpAsync('./tmp/ben').then(data => console.log(data))