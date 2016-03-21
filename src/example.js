import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './Comments';

const token = 'dcca26991894c75acee49c631cdb0c8ead8d511e84debcb216472336e1acd983';
const loginURL = '//dev.geekpark.net:3000/user/login';

ReactDOM.render(
  <Comments isAdmin id={214790} type="Topic" {...{token, loginURL}} />,
  document.querySelector('#app')
);
