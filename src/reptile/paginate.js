const cheerio = require('cheerio');
const cheerioTableparse = require('cheerio-tableparser');

const load = require('./server');
const {fillDomain, estateGeneral} = require('./config');

const estateGeneralIndex = Object.keys(estateGeneral);

function pageinate(_urls) {
  let urls = _urls.slice(0, 2);
  if (urls) {
    let pros = urls.map((url) => load(fillDomain(url)));
    Promise.all(pros).then(values => {
      let $ = cheerio.load(values[0]);
      let p = $("body > table").eq(2).find("tr[valign='middle']");

      // let p = $("body > table").eq(2).parsetable();
      p.each(function(i, el) {
        let obj = Object.assign({}, estateGeneral);
        $(this).children("td").each(function(ii, ell) {
          obj[estateGeneralIndex[ii]] = $(this).text()
          // console.log(ell)
        });
        console.log(obj)
        // console.log($(this).text().trim().replace(/\r?\n|\r/g, ''));
      })
    })
  }
}

module.exports = pageinate;

