const osmosis = require('osmosis');
const params = {
  page: 1,
  districtID: 1,
  buildingType: 1,
  houseArea: 0,
  averagePrice: 0,
  selState: '',
  selCircle: ''
};

function getUrl(params) {
  let urlParam = Object.keys(params).map((pa) => `${pa}=${encodeURIComponent(params[pa])}`).join('&');
  return `http://www.fangdi.com.cn/complexpro.asp?${urlParam}`;
}


osmosis.get(getUrl(params))
    // .find("select[@name='Region_ID']")
    // .set('areas')
    // .select("select[@name='Region_ID']")
    // .then(function(window) {
    //   var selects = window.document.querySelector("option")
    //   console.log(selects.textContent)
    //   return selects;
    // })
    // .set('aa')
    .then(function(window) {
      var selects = window.document.querySelector("select[@name='Region_ID'] > option") // option[1]
      var areas = selects.textContent;
      console.log(areas)
    })
    .data(function(listing) {
      console.log(listing)
    })
.log(console.log)