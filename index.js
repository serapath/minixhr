var XMLHttpRequest  = require('xhrpolyfill');

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
  var xhr = XMLHttpRequest();
  if (!xhr) { return null };
  xhr.open(args.method,args.url);
  for (var field in args.headers) {
    xhr.setRequestHeader(field, args.headers[field]);
  }
  xhr.onload=function(response){
    var headerJSON = {}, h = xhr.getAllResponseHeaders();
    h.match(/([^\n\r:]+):([^\n\r]+)/g).forEach(function(item){
      var tmp = item.split(': ');
      json[tmp[0]] = tmp[1];
    });
    callback(this.response, response, xhr, headerJSON);
  };
  xhr.send(args.body||null);
};
