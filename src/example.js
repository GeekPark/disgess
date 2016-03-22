import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './Comments';

const token = '806d73c574bf4c478767223feef61928cd97abec858069e2a0fe1066d525e4aa';
const loginURL = '//dev.geekpark.net:3000/user/login';

ReactDOM.render(
  <Comments id={214790} type="Topic" {...{ token, loginURL }} />,
  document.querySelector('#app')
);
