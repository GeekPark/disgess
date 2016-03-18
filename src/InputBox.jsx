import React, { PropTypes } from 'react';

import Avatar from './Avatar';

import style from './css/comments';

class InputBox extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.action.add({
      content: this.refs.textarea.value,
    }).then(this.props.closeSelf);
  }
  render() {
    const { isReply, action } = this.props;
    const user = action.currentUser;

    return (
      <div className={`${style.inputbox} ${isReply ? style['reply-inputbox'] : ''}`}>
        <div style={{ position: 'relative' }}>
          <Avatar name={user.username} src={user.avatar} />
          <form className={style['input-form']}>
            <textarea className={style.textarea} ref="textarea"></textarea>
            <input type="button" className={style.submit}
              onClick={this.handleClick}
              value={isReply ? '发表回复' : '提交评论'}
            />
          </form>
        </div>
      </div>
    );
  }
}

InputBox.propTypes = {
  closeSelf: PropTypes.func,
  isReply: PropTypes.bool,
  action: PropTypes.object.isRequired,
};

export default InputBox;
