var XMLHttpRequest  = require('xhrpolyfill')
// add timeout option to params
// http://blog.22tabs.com/how-to-timeout-a-connection-in-node/
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
      }
      return params.headers ? params.headers : params.body ? header : {}
    })()
  }
  var xhr = XMLHttpRequest()
  if (!xhr) { throw new Error('No AJAX support'); }
  xhr.open(args.method,args.url)
  for (var field in args.headers) {
    xhr.setRequestHeader(field, args.headers[field])
  }
  xhr.onload = xhr.onerror = function responseHandler (response){
    var headerJSON = {}, h = xhr.getAllResponseHeaders()
    (h.match(/([^\n\r:]+):([^\n\r]+)/g)||[]).forEach(function(item){
      var tmp = item.split(': ')
      headerJSON[tmp[0]] = tmp[1]
    })
    if (callback) {
      callback(this.response, response, xhr, headerJSON);
    }
  }
  xhr.send(args.body||null)
}
