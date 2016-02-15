# minixhr
super simpel and small cross-browser xhr

# USAGE
```js
var minixhr = require('minixhr')

function responseHandler (error, data, response, xhr, header) {
  if (error) console.error('timeout: ', error)
  console.log(data)
}

var request  = { // can be 'url string' or object:
  url          : 'http://jsonplaceholder.typicode.com/posts/1',
  method       : 'POST',  // [optional] (defaults to 'GET')
  body         : 'payload', // [optional] payload data could be <formdata> or {key:val}'s or anything
  headers      : {} // [optional] (defaults to '{}' or in case of 'POST':
                   // {'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded' } )
}

// EXAMPLE 1
var callback = responseHandler
minixhr(request, callback) // [optional] callback - (e.g. leave out for POST Request where you don't care about a response

// EXAMPLE 2
minixhr('http://requestb.in/18b4srl1', function (data) { console.log(data) })
// check http://requestb.in/18b4srl1?inspect afterwards to inspect

// EXAMPLE 3 - github
minixhr()
```
