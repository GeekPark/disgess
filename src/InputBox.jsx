import React from 'react';

import Avatar from './Avatar';

import style from './css/comments';

class InputBox extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.refs.textarea.value.length === 0) return;

    const params = {
      content: this.refs.textarea.value,
    };
    this.refs.textarea.value = '';

    if (this.props.parentID !== undefined) params.parent_id = this.props.parentID;
    this.props.action.add(params).then(this.props.closeSelf);
  }
  render() {
    const { parentID, action } = this.props;
    const user = action.currentUser;
    const isReply = parentID !== undefined;

    return (
      <div className={`${style.inputbox} ${isReply ? style['reply-inputbox'] : ''}`}>
        <div style={{ position: 'relative' }}>
          <Avatar name={user.username} src={user.avatar.url} />
          <form className={style['input-form']}>
            <textarea className={style.textarea} ref="textarea" autoFocus={isReply}></textarea>
            <input type="button" className={style.submit}
              onClick={this.handleClick}
              value={isReply ? '提交回复' : '发表评论'}
            />
          </form>
        </div>
      </div>
    );
  }
}

InputBox.propTypes = {
  closeSelf: React.PropTypes.func,
  parentID: React.PropTypes.number,
  action: React.PropTypes.object.isRequired,
};

export default InputBox;
