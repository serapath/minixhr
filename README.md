# minixhr
super simple and small cross-browser XMLHttpRequest (XHR)

# USAGE
```js
var minixhr = require('minixhr')

function response (error, data, header) {
  if (error) return console.error(error)
  console.log(data)
  console.log(header)
}

const string = JSON.stringify({ foo: 123, bar: "abc" }) // payload
const URL1 = 'https://jsonplaceholder.typicode.com/posts/1'
// @NOTE check http://requestb.in/18b4srl1?inspect after a request to inspect server
const URL2 = 'http://requestb.in/18b4srl1' // make a `http://requestb.in` to get your own

var request1 = URL1
var request2 = { // can be 'url string' or object:
  /*required*/url     : URL2,
  /*optional*/method  : 'POST',  // (defaults to `GET`)
    // can be any http method like `['GET', 'POST', 'HEAD', 'PUT', ...]` or `'JSONP'`
  /*optional*/data    : string,  // (defaults to: `undefined`)
    // can be any string, maybe formatted as e.g. <FORMDATA> or JSON e.g. '{"key":"val"}'
    // if set and no method provided, method will be set to 'POST'
  /*optional*/headers : {},      // (defaults to `{}`)
    // in case of `method === 'POST'` it defaults to:
    // {'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded' }
  /*optional*/timeout : 1000,  // (defaults to `0`, wich means NO timeout)
    // can be any number of miliseconds, or "sync" (to make a synchronous request)
}

// EXAMPLE 1
minixhr(/*required*/request1, /*optional*/response)

// EXAMPLE 2
minixhr(/*required*/request2)
```

if you need to support old browsers, use version `3.1.0` or below.  
Those versions still include the [xhr polyfill](https://www.npmjs.com/package/xhrpolyfill)
