const http = require('http');
const iconv = require('iconv-lite');

const load = function (url) {
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'content-encoding': 'deflate'
  //   }
  // }).then((res) => {
  //   // console.log();
  //   console.log(res.status)
  //   console.log(res)
  // })

  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      var converterStream = iconv.decodeStream('gb2312');
      res.pipe(converterStream);

      let rawData = '';
      converterStream.on('data', (chunk) => {
        rawData += chunk;
        return rawData;
      });
      res.on('end', () => {
        try {
          let parsedData = rawData;
          // console.log(jschardet.detect(parsedData))
          // console.log(iconv.decode(parsedData, 'utf8'))
          resolve(parsedData);
          // console.log(parsedData);
        } catch (e) {
          reject(e);
          // console.log(e.message);
        }
      });

    })
  })
};

const loadUTF8 = function (url) {
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'content-encoding': 'deflate'
  //   }
  // }).then((res) => {
  //   // console.log();
  //   console.log(res.status)
  //   console.log(res)
  // })

  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.setEncoding('utf8')
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
        return rawData;
      });
      res.on('end', () => {
        try {
          let parsedData = rawData;
          // console.log(jschardet.detect(parsedData))
          // console.log(iconv.decode(parsedData, 'utf8'))
          resolve(parsedData);
          // console.log(parsedData);
        } catch (e) {
          reject(e);
          // console.log(e.message);
        }
      });

    })
  })
};


module.exports = {load, loadUTF8};