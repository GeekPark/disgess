import React, { PropTypes } from 'react';

import { getComments } from './api';
import { randomUserName, randomAvatar } from './utils';

import CommentItem from './commentItem';
import InputBox from './InputBox';

import style from './css/comments';

const mockUser = () => ({
  username: randomUserName(),
  avatar: randomAvatar(),
});

const modifyProps = prop => prop.map(v => {
  const result = v;
  if (v.user === null) {
    result.user = mockUser();
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
    const currentUser = this.props.currentUser || mockUser();

    const action = {
      delete(id) {
        console.log(id);
      },
      getUser() {
        return currentUser;
      },
    };

    return (
      <div className={style.container}>
        {
          this.state.comments.length ?
          <h3>已有<span className={style['sum-number']}>{this.state.comments.length}</span>条评论</h3> :
          <h3>还没有评论呢，快来抢沙发！</h3>
        }
        <InputBox action={action} />
        {/* empty div for css first-child selector */}
        <div>
          { this.state.comments.map((v, i) => (
            <CommentItem key={i} {...v} isAdmin={this.props.isAdmin} action={action} />)
          )}
        </div>
      </div>
    );
  }
}

Components.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default Components;
