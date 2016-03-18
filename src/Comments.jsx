import React, { PropTypes } from 'react';

import API from './api';
import { catchErr, tryKey, randomUserName, randomAvatar } from './utils';

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
      comments: [],
    };
  }

  componentWillMount() {
    const _this = this;
    const { type, id } = this.props;
    API.get({ type, id })
      .then(d => _this.setState({ comments: modifyProps(d) }))
      .catch(catchErr);
  }

  render() {
    const currentUser = this.props.currentUser || mockUser();

    const action = {
      delete(id) {
        if (confirm('确认删除该评论？')) {
          API.delete(id).then(d => console.log(d)).catch(e => console.error(e));
        }
      },
      getUser() {
        return currentUser;
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
  type: PropTypes.oneOf(['Topic', 'Video', 'Activity']).isRequired,
  id: PropTypes.number.isRequired,
};

export default Components;
