var XMLHttpRequest  = require('xhrpolyfill')
module.exports = function xhr2 (params, callback) {
  // returns/calls: callback(data, response, xhr)
  var url = typeof params === 'string' ? params : params.url
  // e.g. url = "http://jsonplaceholder.typicode.com/posts/1"
  var method = params.method || (params.data ? 'POST': 'GET')
  var body = params.data // data: formdata or {key:val}
  var H = params.headers ? params.headers : params.body ? {
    'X-Requested-With' :'XMLHttpRequest',
    'Content-Type'     :'application/x-www-form-urlencoded'
  } : {}
  var xhr = XMLHttpRequest()
  if (!xhr) throw new Error('No AJAX support')
  xhr.open(method, url)
  for (var field in H) xhr.setRequestHeader(field, H[field])
  xhr.onload = xhr.onerror = function (response) {
    var Hjson = {}, h = xhr.getAllResponseHeaders()
    ;(h.match(/([^\n\r:]+):([^\n\r]+)/g)||[]).forEach(function(item){
      var tmp = item.split(': ')
      Hjson[tmp[0]] = tmp[1]
    })
    if (callback) callback(this.response, response, xhr, Hjson)
  }
  xhr.send(args.body||null)
}
