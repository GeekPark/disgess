import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './Comments';

const token = '0ec6592ebd5ce851f9d9a793a0d52eb1790ed3c125b3c279a83a947c7af971e5';

ReactDOM.render(
  <Comments isAdmin id={214790} type="Topic" token={token} />,
  document.querySelector('#app')
);
