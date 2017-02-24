const {loadUTF8} = require('../../server');
const cheerio = require('cheerio');

let target = 100;
const preUrl = "http://blog.csdn.net/y416854144/article/details/";
let sites = [
  {title: '两道Javascript-前端面试题', index: '56844013'},
  {title: 'Activiti 自定义事件监听和邮件通知', index: '54342060'},
  {title: 'Activiti 自定义用户管理和组管理', index: '54315929'},
  {title: '如何生成可导入数据库的亿级别数据', index: '52185350'},
  {title: '<MongoDB | Mysql>亿级别---数据生成及高效率导入', index: '52181366'},
  {title: 'Express session 覆盖或重写', index: '51862761'},
  {title: 'Angularjs之ngModel中的值验证绑定', index: '51373126'},

  {title: 'jQuery 技术讨论', index: '50687942'},
  {title: 'Ionic 自动生成icon和splash图片', index: '50462985'},
  {title: 'Promise执行链', index: '50442417'},
  {title: 'MongoDB 索引建立机制', index: '47343369'}
];

function getCsdnUrl(index) {
  return `${preUrl}${index}`;
}


// getData()
function visit(site, times) {
  setTimeout(function () {
    loadUTF8(getCsdnUrl(site.index)).then(data => {
      let $ = cheerio.load(data);
      let p = $("#article_details").find(".article_r .link_view");
      let totalS = p.text();
      let total = totalS.slice(0, totalS.indexOf('人'));
      console.log(`${site.title}  ---  ${total}`);

      times++;
      if (times < target) {
        visit(site, times);
      }
    })
  }, 5 * 1000);
}




sites.forEach((site, index) => {
  setTimeout(() => {
    visit(site, 0);
  }, index * 1000)
});