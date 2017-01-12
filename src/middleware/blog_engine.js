import fetch from 'node-fetch';

const encode = params => {
  return Object.keys(params).map(key => {`${key}=${encodeURIComponent(params[key])}`}).join('&')
}

const exception = json => {
  return json
}

export const get = (url, params) => {
  if (params) {
    url = `${url}?${encode(params)}`;
  }
  return fetch(url, {
    method: 'get'
  }).then(res => {
    return res.json();
  }).then(exception)
}

export const post = (url, body) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application-json'}
  }).then(res => {
    return res.json();
  }).then(exception)
}