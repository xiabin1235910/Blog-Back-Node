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

module.exports = {params, getUrl};