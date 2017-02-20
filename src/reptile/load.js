// $ cd src/reptile
// $ babel load.js -d dist

// import fetch from 'node-fetch';
const fetch = require('node-fetch');
const http = require('http');
const cheerio = require('cheerio');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');
const encoding = require('encoding');
let estate = {
  districts: []
};

function load(url) {
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     'content-encoding': 'deflate'
  //   }
  // }).then((res) => {
  //   // console.log();
  //   console.log('iiii')
  //   console.log(res.status)
  //   console.log(res)
  // })

  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      var converterStream = iconv.decodeStream('gb2312');
      res.pipe(converterStream)

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


}

// load("http://192.168.101.61:8080/keytone-activiti/service/identity/users")
// load("http://www.fangdi.com.cn/complexpro.asp?page=3&districtID=14&Region_ID&projectAdr&projectName&startCod&buildingType=1&houseArea=0&averagePrice=0&selState&selCircle=0")
//     .then((data) => {
//       // console.log(data)
//       let $ = cheerio.load(data);
//       let options = $("select[name='districtID'] option");
//       options.each(function() {
//         console.log(`${$(this).val()} + ${$(this).text()}`);
//       })
//     });

// page = 3
// districtID = 14
// buildingType = 1
// houseArea = 0
// averagePrice = 0
// selState = ''
//
function getUrl(params) {
  let urlParam = Object.keys(params).map((pa) => `${pa}=${encodeURIComponent(params[pa])}`).join('&');
  return `http://www.fangdi.com.cn/complexpro.asp?${urlParam}`;
}


function init() {
  let params = {
    page: 1,
    districtID: 1,
    buildingType: 1,
    houseArea: 0,
    averagePrice: 0,
    selState: '',
    selCircle: ''
  };
  load(getUrl(params))
      .then((data) => {
        let $ = cheerio.load(data);
        let selected = $("select[name='districtID']");
        let area_options = $("select[name='Region_ID'] option");
        let temp = [];
        console.log(area_options.length)
        temp = area_options.map(function(i, el) {
          // temp.push({index: $(this).val(), value: $(this).text()});
          return {index: $(this).val(), value: $(this).text()};
        }).get();

        estate.districts.push({index: selected.val(), value: $("select[name='districtID'] option:selected").text(), area: temp});

        console.log(estate)
        console.log(estate.districts[0].area)
        // options.each(function() {
        //   estate.districts.push({index: $(this).val(), value: $(this).text(),
        //     area: area_options});
        // });
      })
      .catch((e) => {
        console.error(e);
      })
}

init();