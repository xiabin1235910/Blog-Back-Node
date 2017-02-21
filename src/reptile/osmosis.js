const osmosis = require('osmosis');

module.exports = htmlParse =
    function ({html, url}) {
      return osmosis.get(url)
          .then(function(window, data, next) {
            var selects = window.document.querySelector("select[@name='Region_ID']").childNodes;
            var areas = selects.filter(function(data, index) {
              return index >= 4 && index < selects.length - 1;
            }).map((res) => res.text());
            data.result = areas;
            next(window, data)
          })
          .log(console.log)
    };