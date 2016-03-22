import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './Comments';

const CONFIG = {
  id: 214790,
  type: 'Topic',
  loginURL: '//dev.geekpark.net:3000/user/login',
  // below params was optional
  token: '806d73c574bf4c478767223feef61928cd97abec858069e2a0fe1066d525e4aa',
  cb: {
    onGet: d => console.log('onGet', d),
    onAdd: d => console.log('onAdd', d),
    onDelete: d => console.log('onDelete', d),
    onUp: d => console.log('onUp', d),
    onDown: d => console.log('onDown', d),
  },
};

ReactDOM.render(
  <Comments {...CONFIG} />,
  document.querySelector('#app')
);
