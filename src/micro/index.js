const { send } = require('micro');
const url = require('url');

const visits = {};

module.exports = (request, response) => {
  const { pathname } = url.parse(request.url);
  console.log(visits[pathname])
  visits[pathname] = visits[pathname] ? (visits[pathname] + 1) : 1;

  console.log(pathname);
  send(response, 200, 'Hello world 👋. ' + `This page has been visited for ${visits[pathname]} times`);
};