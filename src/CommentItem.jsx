import React from 'react';
import moment from 'moment';
import { PropTypes } from 'react';

import { randomUserName, tryKey } from './utils';
import Avatar from './Avatar';
import DeleteBtn from './DeleteBtn';
import style from './css/comment_item';

moment.locale('zh-cn');

class CommentItem extends React.Component {
  constructor() {
    super();

    this.state = {
      showInput: false,
    };

    this.toggleApply = this.toggleApply.bind(this);
  }

  toggleApply() {
    this.setState({
      showInput: !this.state.showInput,
    });
  }

  render() {
    const { id, body, depth, user, parent_id, created_at, isAdmin, action } = this.props;
    const isReplyStyle = parent_id === 0 ? '' : style.reply;
    const userURL = user ? `//www.geekpark.net${user.url}` : 'javascript:;';
    const userName = user ? user.username : randomUserName();
    const replyBtn = depth < 3 ? (
      <a href="javascript:;" onClick={this.toggleApply}>{this.state.showInput ? '取消回复' : '回复'}</a>
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
          </div>
        </div>
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
  parent_id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  action: PropTypes.object.isRequired,
};

export default CommentItem;
