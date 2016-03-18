import React, { PropTypes } from 'react';
import moment from 'moment';

import { randomUserName, tryKey } from './utils';

import Avatar from './Avatar';
import DeleteBtn from './DeleteBtn';
import InputBox from './InputBox';

import style from './css/comment_item';

moment.locale('zh-cn');

class CommentItem extends React.Component {
  constructor() {
    super();

    this.state = {
      showInput: false,
    };

    this.toggleInput = this.toggleInput.bind(this);
  }

  toggleInput() {
    this.setState({
      showInput: !this.state.showInput,
    });
  }

  render() {
    const { id, body, depth, user, parent_id, created_at, isAdmin, action, liked } = this.props;
    const isReplyStyle = parent_id === 0 ? '' : style.reply;
    const userURL = user ? `//www.geekpark.net${user.url}` : 'javascript:;';
    const userName = user ? user.username : randomUserName();
    const replyBtn = depth < 3 ? (
      <a href="javascript:;" onClick={this.toggleInput}>{this.state.showInput ? '取消回复' : '回复'}</a>
    ) : null;

    return (
      <div id={`comment-${id}`} className={`${style[`depth-${depth}`]} ${isReplyStyle} ${style.item}`}>
        <Avatar name={tryKey(user, 'username')} src={tryKey(user, 'avatar')} />
        <div className={style['body-container']}>
          <div className={style.info}>
            <a href={userURL} target="_blank">{userName}</a>
            <span className={style.dot}>·</span>
            <span className={style.time}>{moment(created_at).fromNow()}</span>
          </div>
          <div className={style.body} dangerouslySetInnerHTML={{ __html: body }} />
          <div className={style.action}>
            {replyBtn}
            {isAdmin ? <DeleteBtn action={action} id={id} /> : null}
            <a href="javascript:;" className={`${style.like} ${liked ? style['like-success'] : ''}`}></a>
          </div>
        </div>
        { this.state.showInput ? <InputBox action={action} isReply /> : null }
      </div>
    );
  }
}

CommentItem.propTypes = {
  user: PropTypes.object,
  isAdmin: PropTypes.bool,
  id: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
  parent_id: PropTypes.number,
};

export default CommentItem;
