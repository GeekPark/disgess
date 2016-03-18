import React, { PropTypes } from 'react';

import API from './api';
import { tryKey, mockUser } from './utils';

import CommentItem from './commentItem';
import InputBox from './InputBox';

import style from './css/comments';

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
      comments: [],
    };
  }

  componentWillMount() {
    const _this = this;
    const { type, id } = this.props;
    API.get({ type, id })
      .then(d => _this.setState({ comments: modifyProps(d) }));
  }

  render() {
    const { currentUser, type, id, isLogin, isAdmin } = this.props;

    // public action for components
    // joint params send to API and do some callback and change global state
    // child component invoke action just collect data/params to action
    // all action should return a promise when api and global callback complete
    const action = {
      currentUser,
      add(params) {
        return API.add(Object.assign({
          commentable_id: id,
          commentable_type: type,
        }, params));
      },
      delete(commentID) {
        if (confirm('确认删除该评论？')) {
          API.delete(commentID);
        }
      },
    };

    const length = tryKey(this.state.comments, 'length');

    return (
      <div className={style.container}>
        {
          length ?
          <h3>已有<span className={style['sum-number']}>{length}</span>条评论</h3> :
          <h3>还没有评论呢，快来抢沙发！</h3>
        }
        <InputBox action={action} />
        {/* empty div for css first-child selector */}
        <div>
          { this.state.comments.map((v, i) => (
            <CommentItem key={i} {...v} isAdmin={isAdmin} action={action} />)
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
  type: PropTypes.oneOf(['Topic', 'Video', 'Activity']).isRequired,
  id: PropTypes.number.isRequired,
};

Components.defaultProps = {
  currentUser: mockUser(),
};

export default Components;
