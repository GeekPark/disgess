# disgess [![Build Status](https://api.travis-ci.org/GeekPark/disgess.svg)](https://travis-ci.org/GeekPark/disgess)
GeekPark official discuss component

## Install
> `react`, `react-dom`, `moment` was external dependencies for reuse, install its first

`$ npm i react react-dom moment --save`

`$ gnpm i @geekpark/disgess --save`

## Usage
```javascript
import Disgess from '@geekpark/disgess';

const config = {
  id: 214790,
  type: 'Topic|Video|Activity',
  loginURL: 'where user can login (like need login)',
  // below params was optional
  token: 'user access token for identify user',
  cb: {
     // comment data json will pass to callback
    onGet: d => alert(d),
    onAdd,
    onDelete,
    onUp,
    onDown,
  },
};

ReactDOM.render(
  <Disgess {...config} />,
  document.querySelector('#comment')
);

```

## Test
`$ npm test`

## License

(The MIT License)

Copyright (c) 2010 [Aaron Heckmann](aaron.heckmann+github@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
