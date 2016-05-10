import React from 'react';

import generAPI from './api';
import { tryKey, mockUser } from './utils';

import CommentItem from './CommentItem';
import InputBox from './InputBox';

import style from './css/comments.css';

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
      isAdmin: false,
      currentUser: mockUser(),
    };
  }

  componentWillMount() {
    const z = this;
    const { type, token, id } = this.props;
    const { get, user } = generAPI(token);
    get({ type, id })
      .then(d => {
        z.setState({ comments: modifyProps(d) });
        z.doCallback('onGet', d);
      });

    if (!token) return;
    user().then(d => {
      if (d.roles.indexOf('admin') !== -1) {
        z.setState({ isAdmin: true });
      }
      z.setState({ currentUser: d });
    });
  }

  doCallback(funName, param) {
    const { cb } = this.props;
    if (tryKey(cb, funName) !== null) cb[funName](param);
  }

  render() {
    const z = this;
    const { type, id, token } = this.props;
    const API = generAPI(token);

    // public action for components
    // child action(params) => global action => API => global action => component action
    //   params from ui        global param             update list         UI update
    const action = {
      currentUser: this.state.currentUser,
      add(params) {
        return API.add(Object.assign({
          commentable_id: id,
          commentable_type: type,
        }, params))
        .then(d => {
          const newComment = d;
          newComment.user = z.state.currentUser;
          const comments = z.state.comments.concat([newComment]);
          z.setState({ comments });
          z.doCallback('onAdd', newComment);
        });
      },
      delete(commentID) {
        if (confirm('确认删除该评论？')) {
          API.delete({ id: commentID })
            .then(() => {
              z.setState({ comments: z.state.comments.filter(v => v.id !== commentID) });
              z.doCallback('onDelete', null);
            });
        }
      },
      like(commentID) {
        if (!token) {
          if (confirm('点赞需要登录喔，点击确定去登录')) window.location.href = this.props.loginURL;
          return;
        }

        API.like({ id: commentID }).then(d => {
          z.setState({
            comment: z.state.comments.map(v => {
              const newState = v;
              if (v.id === commentID) {
                newState.liked = !v.liked;
                newState.ups_count = d.ups_count;
                const cbType = v.liked ? 'onUp' : 'onDown';
                z.doCallback(cbType, newState);
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
      a.ancestry > b.ancestry ? 1 : -1
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
          {commentList.map((v, i) => (
            <CommentItem key={i} {...v} isAdmin={this.state.isAdmin} action={action} />)
          )}
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  id: React.PropTypes.string.isRequired,
  loginURL: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['Topic', 'Video', 'Activity']).isRequired,
  token: React.PropTypes.string,
  cb: React.PropTypes.object,
};

export default Comments;
