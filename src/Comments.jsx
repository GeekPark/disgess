import React from 'react';
import { PropTypes } from 'react';
// import moment from 'moment';

import CommentItem from './commentItem';
import { getComments } from './api';

import style from './css/comments';

class Components extends React.Component {
  static propTypes() {
    return {
      isLogin: PropTypes.boolean.require,
    };
  }

  constructor() {
    super();

    this.state = {
      comments: getComments(),
    };
  }

  render() {
    return (
      <div className={style.container}>
        { this.state.comments.map((v, i) => <CommentItem key={i} {...v} />) }
      </div>
    );
  }
}

export default Components;
