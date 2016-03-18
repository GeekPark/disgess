import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './Comments';

ReactDOM.render(
  <Comments isLogin={false} isAdmin id={212143} type="Topic" />,
  document.querySelector('#app')
);
