# minixhr
super simple and small cross-browser XMLHttpRequest (XHR)

# USAGE
```js
var minixhr = require('minixhr')

// EXAMPLE 1
// response handler
function callback (data, response, xhr, header) { console.log(data) }
minixhr('http://jsonplaceholder.typicode.com/posts/1', callback)
// check http://requestb.in/18b4srl1?inspect afterwards to inspect

// EXAMPLE 2
var data = { foo: 123, bar: "abc" }
var request  = { // can be 'url string' or object:
  /*required*/url     : 'http://requestb.in/18b4srl1',
  /*optional*/method  : 'POST',  // (defaults to 'GET')
  /*optional*/data    : JSON.stringify(data), // payload data could be <formdata> or {key:val}'s or any string
  /*optional*/headers : {} // (defaults to '{}' OR in case of 'POST' it defaults to:
              // {'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded' } )
}
minixhr(request) // [optional] callback - (e.g. leave out for POST Request where you don't care about a response
```

if you need to support old browsers, use version `3.1.0` or below.  
Those versions still include the [xhr polyfill](https://www.npmjs.com/package/xhrpolyfill)
