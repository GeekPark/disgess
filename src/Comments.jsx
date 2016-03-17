import React from 'react';
import { PropTypes } from 'react';

import CommentItem from './commentItem';
import { getComments } from './api';

import style from './css/comments';

class Components extends React.Component {
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

Components.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default Components;
