import React from 'react';
import { PropTypes } from 'react';

import Avatar from './Avatar';
import style from './css/comment_item';

const tryKey = (obj, key) => obj === null || !obj.hasOwnProperty(key) ? null : obj[key];

class CommentItem extends React.Component {
  constructor() {
    super();

    this.state = {
      showInput: false,
    };
  }

  render() {
    const { id, body, depth, user } = this.props;

    return (
      <div id={`comment-${id}`} className={style[`depth-${depth}`]}>
        <Avatar name={tryKey(user, 'username')} src={tryKey(user, 'avatar')} />
        {body}
      </div>
    );
  }
}

CommentItem.propTypes = {
  body: PropTypes.string.isRequired,
};

export default CommentItem;
