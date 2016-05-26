import React from 'react';
import moment from 'moment';

import Avatar from './Avatar';
import DeleteBtn from './DeleteBtn';
import InputBox from './InputBox';

import style from './css/comment_item.css';

moment.locale('zh-cn');

class CommentItem extends React.Component {
  constructor() {
    super();

    this.state = {
      showInput: false,
    };

    this.toggleInput = this.toggleInput.bind(this);
    this.closeSelf = this.closeSelf.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  toggleInput(e) {
    const showInput = e === false ? false : !this.state.showInput;
    this.setState({ showInput });
  }

  closeSelf() {
    return this.toggleInput(false);
  }

  handleLike() {
    const { action, id } = this.props;
    action.like(id);
  }

  render() {
    const { id, body, depth, user, created_at, isAdmin, action, liked, ups_count } = this.props;
    const isReplyStyle = depth === 1 ? '' : style.reply;
    const userURL = user.id ? `//www.geekpark.net/users/${user.id}` : 'javascript:;';
    const replyBtn = depth < 3 ? (
      <a href="javascript:;" onClick={this.toggleInput}>{this.state.showInput ? '取消回复' : '回复'}</a>
    ) : null;

    return (
      <div id={`comment-${id}`} className={`${style[`depth-${depth}`]} ${isReplyStyle} ${style.item}`}>
        <Avatar name={user.username} src={user.avatar_url} />
        <div className={style['body-container']}>
          <div className={style.info}>
            <a href={userURL} target="_blank">{user.username}</a>
            <span className={style.dot}>·</span>
            <span className={style.time}>{moment(created_at).fromNow()}</span>
          </div>
          <div className={style.body} dangerouslySetInnerHTML={{ __html: body }} />
          <div className={style.action}>
            {replyBtn}
            {isAdmin ? <DeleteBtn action={action} id={id} /> : null}
            <a href="javascript:;" onClick={this.handleLike} className={`${style.like} ${liked ? style['like-success'] : ''}`}>
              <i className={style['like-icon']}></i>
              <span className={style['like-nums']}>{ups_count}</span>
            </a>
          </div>
        </div>
        {this.state.showInput ? <InputBox action={action} parentID={id} closeSelf={this.closeSelf} /> : null}
      </div>
    );
  }
}

CommentItem.propTypes = {
  user: React.PropTypes.object,
  isAdmin: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired,
  body: React.PropTypes.string.isRequired,
  depth: React.PropTypes.number.isRequired,
  created_at: React.PropTypes.string.isRequired,
  action: React.PropTypes.object.isRequired,
  liked: React.PropTypes.bool.isRequired,
  ups_count: React.PropTypes.number.isRequired,
  parent_id: React.PropTypes.number,
};

export default CommentItem;
