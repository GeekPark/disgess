import React from 'react';
import ReactDOM from 'react-dom';

import Comments from './Comments';

ReactDOM.render(<Comments isLogin={false} isAdmin />, document.querySelector('#app'));
