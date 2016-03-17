import React from 'react';
import { PropTypes } from 'react';

import CommentItem from './commentItem';
import { getComments } from './api';
import { randomUserName, randomAvatar } from './utils';

import style from './css/comments';

const modifyProps = prop => prop.map(v => {
  const result = v;
  if (v.user === null) {
    result.user = {
      username: randomUserName(),
      avatar: randomAvatar(),
    };
  } else {
    result.user.avatar += '?imageView2/1/w/100/h/100';
  }
  return result;
});

class Components extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: modifyProps(getComments()),
    };
  }

  render() {
    const action = {
      delete(id) {
        console.log(id);
      },
    };
    return (
      <div className={style.container}>
        { this.state.comments.map((v, i) => (
          <CommentItem key={i} {...v} isAdmin={this.props.isAdmin} action={action} />)
        )}
      </div>
    );
  }
}

Components.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
};

export default Components;
