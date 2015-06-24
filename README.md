# minixhr
super simpel and small cross-browser xhr

# USAGE
```js
var minixhr = require('minixhr');

var callback = function responseHandler (data, response, xhr, header) { console.log(data); };
var request  = { // can be 'url string' or object:
  url          : 'http://github.com/serapath/holonify', // or e.g. http://ip.jsontest.com/a=1&b=2&c=3
  method       : 'POST',  // [optional] (defaults to 'GET')
  body         : 'payload', // [optional] payload data could be <formdata> or {key:val}'s or anything
  header       : {} // [optional] (defaults to '{}' or in case of 'POST':
                   // {'X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded' } )
};

// EXAMPLE 1
minixhr(request); // [optional] callback - (e.g. leave out for POST Request where you don't care about a response

// EXAMPLE 2
minixhr('http://requestb.in/qpvy9dqp', function (data) { console.log(data); });

```
