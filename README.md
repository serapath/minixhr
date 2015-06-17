# minixhr
super simpel and small cross-browser xhr

# USAGE
```js
var minixhr = require('minixhr');

var request = { url: 'http://github.com/serapath/holonify' };

minixhr(request, function responseHandler (data, response, xhr, header) {
  console.log(data);
});
```
