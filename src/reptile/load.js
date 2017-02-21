// $ cd src/reptile
// $ babel load.js -d dist

// import fetch from 'node-fetch';
const fetch = require('node-fetch');
const http = require('http');
const cheerio = require('cheerio');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');
const encoding = require('encoding');
const osmosis = require('./osmosis');

let estate = {
  districts: []
};

let districts = null;

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
  let times = 1;
  let new_districts = null;
  if (arguments[0]) {
    times = arguments[0].times;
    params.districtID = arguments[0].districts[0];
    new_districts = arguments[0].districts;
  }
  load(getUrl(params))
      .then((data) => {


        let $ = cheerio.load(data);
        let selected = $("select[name='districtID']");
        let area_options = null;
        // let temp = [];
        // console.log(area_options.length)
        // temp = area_options.map(function(i, el) {
        //   // temp.push({index: $(this).val(), value: $(this).text()});
        //   return {index: $(this).val(), value: $(this).text()};
        // }).get();
        if (times === 1) {
          districts = $("select[name='districtID'] option").map(function(i, el) {
            return $(this).val()
          }).get();
          new_districts = districts;
          //arguments[0].districts = districts;
        }
        osmosis({html: data, url: getUrl(params)}).then(function(context, data) {
          area_options = data.result;
        }).done(function() {
          estate.districts.push({index: selected.val(), value: $("select[name='districtID'] option:selected").text(), area: area_options});
          console.log(estate)
          console.log(estate.districts[times - 1].area);
          if(times === districts.length) {
            return;
          } else {
            times++;
            init({times, districts: new_districts.slice(1)});
          }
        })
      })
      .catch((e) => {
        console.error(e);
      })
}

init();