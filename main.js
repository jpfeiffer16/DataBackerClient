const URL = 'https://databacker.herokuapp.com'
// const URL = 'http://localhost:3000'
const request = require('request');


module.exports = (function() {
  function getContent(username, password, key, version) {
    let body = {
      key,
      version
    };
    let res = request.post({
      url: URL + '/getContent',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic ' + new Buffer(`${ username }:${ password }`).toString('base64')
      },
      body: JSON.stringify(body)
    });
    return res;
  }

  function push(username, password, key, content) {
    let body = {
      key,
      content
    };
    // console.log(body);
    let res = request.post({
      url: URL + '/push',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic ' + new Buffer(`${ username }:${ password }`).toString('base64')
      },
      body: JSON.stringify(body)
    });
    return res;
  }

  function getObjects(username, password, key, version) {
    let body = {
      key,
      version
    };

    let res = request.post({
      url: URL + '/get',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic ' + new Buffer(`${ username }:${ password }`).toString('base64')
      },
      body: JSON.stringify(body)
    });
    return res;
  }

  return {
    getContent,
    push,
    getObjects
  };
})();