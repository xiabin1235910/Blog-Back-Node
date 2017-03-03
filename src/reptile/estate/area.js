// $ cd src/reptile
// $ babel load.js -d dist

// import fetch from 'node-fetch';
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const jschardet = require('jschardet');
const encoding = require('encoding');
const osmosis = require('../osmosis');

const {load} = require('../server');

let {District} = require('../model');

let estate = {
  districts: []
};

let districts = null;

function getUrl(params) {
  let urlParam = Object.keys(params).map((pa) => `${pa}=${encodeURIComponent(params[pa])}`).join('&');
  return `http://www.fangdi.com.cn/complexpro.asp?${urlParam}`;
}


function initArea() {
  let params = {
    page: 1,
    districtID: 15,
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

        if (times === 1) {
          districts = $("select[name='districtID'] option").map(function(i, el) {
            return $(this).val()
          }).get();
          new_districts = districts;
        }
        osmosis({html: data, url: getUrl(params)}).then(function(context, data) {
          area_options = data.result;
        }).done(function() {
          estate.districts.push({index: selected.val(), value: $("select[name='districtID'] option:selected").text(), area: area_options});
          // save to db ... for test
          District.create({name: $("select[name='districtID'] option:selected").text(), index: selected.val()});


          console.log(estate)
          console.log(estate.districts[times - 1].area);
          if(times === districts.length) {
            return;
          } else {
            times++;
            setTimeout(() => {
              initArea({times, districts: new_districts.slice(1)})
            }, 500);
          }
        })
      })
      .catch((e) => {
        console.error(e);
      })
}

initArea();