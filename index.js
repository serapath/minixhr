var xhr  = require('xhrpolyfill');

module.exports = function xhr2 (params, callback) {
  // calls: callback(data, response, xhr);
  var args = { // e.g. url = "http://ip.jsontest.com/a=1&b=2&c=3"
    url      : typeof params === 'string' ? params : params.url,
    method   : params.method || params.data ? 'POST': 'GET',
    body     : params.data, // data: formdata or {key:val}
    headers  : (function(){
      var header = {
        'X-Requested-With' :'XMLHttpRequest',
        'Content-Type'     :'application/x-www-form-urlencoded'
      };
      return params.headers ? params.headers : params.body ? header : {};
    })()
  };
  if (!xhr) { return null };
  xhr.open(args.method,args.url);
  for (var field in args.headers) {
    xhr.setRequestHeader(field, args.headers[field]);
  }
  xhr.onload=function(response){callback(this.response, response, xhr);};
  xhr.send(args.body||null);
};
