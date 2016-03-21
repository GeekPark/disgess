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
    result.user.avatar.url += '?imageView2/1/w/100/h/100';
  }
  return result;
});

class Comments extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: [],
    };
  }

  componentWillMount() {
    const _this = this;
    const { type, token, id } = this.props;
    API.get({ token, type, id })
      .then(d => _this.setState({ comments: modifyProps(d) }));
  }

  render() {
    const _this = this;
    const { currentUser, type, id, isAdmin, token } = this.props;

    // public action for components
    // child action(params) => global action => API => global action => component action
    //   params from ui        global param             update list         UI update
    const action = {
      currentUser,
      add(params) {
        return API.add(Object.assign({
          commentable_id: id,
          commentable_type: type,
        }, params))
        .then(d => {
          const newComment = d;
          newComment.user = currentUser;
          const comments = _this.state.comments.concat([newComment]);
          _this.setState({ comments });
        });
      },
      delete(commentID) {
        if (confirm('确认删除该评论？')) {
          API.delete({ id: commentID, token })
            .then(() => {
              _this.setState({ comments: _this.state.comments.filter(v => v.id !== commentID) });
            });
        }
      },
      like(commentID) {
        if (token.length === 0) {
          if (confirm('点赞需要登录喔，点击确定去登录')) window.location.href = this.props.loginURL;
          return;
        }

        API.like({ token, id: commentID }).then(d => {
          _this.setState({
            comment: _this.state.comments.map(v => {
              const newState = v;
              if (v.id === commentID) {
                newState.liked = !v.liked;
                newState.ups_count = d.ups_count;
              }
              return newState;
            }),
          });
        });
      },
    };

    const length = tryKey(this.state.comments, 'length');

    // order by ancestry
    const commentList = this.state.comments.sort((a, b) => (
      a.ancestry.toString() > b.ancestry.toString()
    ));

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
          { commentList.map((v, i) => (
            <CommentItem key={i} {...v} isAdmin={isAdmin} action={action} />)
          )}
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  isAdmin: PropTypes.bool,
  currentUser: PropTypes.object,
  token: PropTypes.string,
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['Topic', 'Video', 'Activity']).isRequired,
  loginURL: PropTypes.string.isRequired,
};

Comments.defaultProps = {
  currentUser: mockUser(),
};

export default Comments;
