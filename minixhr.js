var XMLHttpRequest  = require('xhrpolyfill')
module.exports = function xhr2 (params, callback) {
  // returns/calls: callback(error, data, response, xhr)
  var args = { // e.g. url = "http://jsonplaceholder.typicode.com/posts/1"
    url      : typeof params === 'string' ? params : params.url,
    method   : params.method || (params.data ? 'POST': 'GET'),
    body     : params.data, // data: formdata or {key:val}
    timeout  : params.timeout || 0,
    headers  : (function(){
      var header = {
        'X-Requested-With' :'XMLHttpRequest',
        'Content-Type'     :'application/x-www-form-urlencoded'
      }
      return params.headers ? params.headers : params.body ? header : {}
    })()
  }
  var xhr = XMLHttpRequest()
  if (!xhr) throw new Error('No AJAX support')
  xhr.open(args.method, args.url)
  for (var field in args.headers) {
    xhr.setRequestHeader(field, args.headers[field])
  }
  xhr.onload = xhr.onerror = function responseHandler (response){
    clearTimeout(timeoutTimer)
    var headerJSON = {}, h = xhr.getAllResponseHeaders()
    ;(h.match(/([^\n\r:]+):([^\n\r]+)/g)||[]).forEach(function(item){
      var tmp = item.split(': ')
      headerJSON[tmp[0]] = tmp[1]
    })
    if (callback) callback(null, this.response, response, xhr, headerJSON)
  }
  var tt
  xhr.ontimeout = function (error) { clearTimeout(tt); cancel(e) }
  if (args.timeout > 0 ) xhr.timeout = tt = setTimeout(cancel, args.timeout)
  function cancel (e) {
    xhr.abort("timeout")
    e = e ? e : new Error("XMLHttpRequest timeout")
    e.code = "ETIMEDOUT"
    if (callback) { callback(e); callback = function noop () {} }
  }
  xhr.send(args.body||null)
}
