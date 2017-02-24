// $ cd src/reptile
// $ babel load.js -d dist

// import fetch from 'node-fetch';
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const jschardet = require('jschardet');
const encoding = require('encoding');
const osmosis = require('./osmosis');

const {load, loadUTF8} = require('./server');
const paginate = require('./paginate');

let estate = {
  districts: []
};

let districts = null;

function getUrl(params) {
  let urlParam = Object.keys(params).map((pa) => `${pa}=${encodeURIComponent(params[pa])}`).join('&');
  return `http://www.fangdi.com.cn/complexpro.asp?${urlParam}`;
}


function init() {
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

        let p = $("body > table").eq(2).find('tr').eq(-2).find("select option").map(function() {
          return $(this).val()
        }).get();

        paginate(p)

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
          console.log(estate)
          console.log(estate.districts[times - 1].area);
          if(times === districts.length) {
            return;
          } else {
            times++;
            // init({times, districts: new_districts.slice(1)});
          }
        })
      })
      .catch((e) => {
        console.error(e);
      })
}

// init();




////  fot the test
const osmos = require('osmosis');
function getData() {
  let params = {
    page: 1,
    districtID: 15,
    buildingType: 1,
    houseArea: 0,
    averagePrice: 0,
    selState: '',
    selCircle: ''
  };
  osmos.get(getUrl(params))
      .find('body > center > table[6] > tbody > tr:last > td[5] > a')
      // .set('area')
      .data(function(listing) {
        // do something with listing data
        console.log(listing)
      })
}

let target = 1000;
// getData()
function getData1() {
  setTimeout(function () {
    loadUTF8("http://blog.csdn.net/y416854144/article/details/54342060").then(data => {
      let $ = cheerio.load(data);
      let p = $("#article_details").find(".article_r .link_view");
      let totalS = p.text();
      let total = totalS.slice(0, totalS.indexOf('人'));
      console.log(total);
      if (total < target) {
        getData1();
      }
    })
  }, 5 * 1000);
}

getData1()