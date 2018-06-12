module.exports = minixhr

function minixhr (params, done) {
  var url = typeof params === 'string' ? params : params.url
  var body = params.data
  var method = params.method || body ? 'POST' : 'GET'
  var headers = params.headers || method !== 'POST' ? {} : {
    'X-Requested-With' :'XMLHttpRequest',
    'Content-Type'     :'application/x-www-form-urlencoded' }
  var timeout = params.timeout || 0
  var xhr = new XMLHttpRequest()
  var async = timeout !== 'sync'
  async && (xhr.timeout = timeout)
  async && (xhr.ontimeout = e => finish((e.info = e.type, e)))
  xhr.open(method, url, async)
  for (var key in headers) xhr.setRequestHeader(key, headers[key])
  if (typeof done === 'function') xhr.onload = xhr.onerror = finish
  function finish ({ type, path, info = xhr.statusText }) {
    var Hjson = {}, h = xhr.getAllResponseHeaders()
    ;(h.match(/([^\n\r:]+):([^\n\r]+)/g)||[]).forEach(function(item){
      var tmp = item.split(': ')
      Hjson[tmp[0]] = tmp[1]
    })
    if (type === 'error' || type === 'timeout') {
      var { status, responseURL: sender } = xhr
      done({ type: 'error', status, info, sender, path }, null, Hjson)
    } else done(null, xhr.responseText, Hjson)
    done = xhr = xhr.response = xhr.responseText = xhr.onload = xhr.onerror = 0
  }
  body = xhr.send(body)
}
