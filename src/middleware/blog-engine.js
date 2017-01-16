import fetch from 'node-fetch';

export class HttpError extends Error {
  constructor(message, response, request) {
    this.message = message;
    this.response = response;
    this.request = request;
    this.name = 'Http Error';
  }
}

const encode = params => {
  return Object.keys(params).map(key => {`${key}=${encodeURIComponent(params[key])}`}).join('&')
}

const unserialize = res => {
  return res.json();
}

const analyze = request => res => {
  // analyze the result code
  if (!res.ok) {
    let body = unserialize(res);
    let status = res.status;
    throw HttpError('Blog Service Error', {body, status}, request);
  }
  return res;
}

class Client {
  constructor(config) {
    this.url = config.url;
  }

  prefix (url) {
    // add the prefix url config
    return this.url + url;
  }

  post (url, body) {
    url = this.prefix(url);
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application-json'}
    })
    .then(analyze({url}))
    .then(unserialize)
  }

  get (url, params) {
    url = this.prefix(url);
    if (params) {
      url = `${url}?${encode(params)}`;
    }
    return fetch(url, {
      method: 'get'
    })
    .then(analyze({url}))
    .then(unserialize)
  }
}

export const blogEngine = config => {
  return async (ctx, next) => {
    ctx.engine = new Client(config);
    await next();
  }
}