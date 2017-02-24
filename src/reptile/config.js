const params = {
  page: 1,
  districtID: 1,
  buildingType: 1,
  houseArea: 0,
  averagePrice: 0,
  selState: '',
  selCircle: ''
};

const estateGeneral = {
  state: '',
  estateName: '',
  estateAddress: '',
  total: 0,
  area: 0,
  district: '',
};

const domain = 'http://www.fangdi.com.cn';

function getUrl(params) {
  let urlParam = Object.keys(params).map((pa) => `${pa}=${encodeURIComponent(params[pa])}`).join('&');
  return `${domain}/complexpro.asp?${urlParam}`;
}

function fillDomain(url) {
  return `${domain}${url}`;
}

module.exports = {params, getUrl, fillDomain, estateGeneral};