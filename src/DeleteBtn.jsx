import React, { PropTypes } from 'react';

class DeleteBtn extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.action.delete(this.props.id);
  }
  render() {
    return <a href="javascript:;" onClick={this.handleClick}>删除</a>;
  }
}

DeleteBtn.propTypes = {
  id: PropTypes.number.isRequired,
  action: PropTypes.object.isRequired,
};

export default DeleteBtn;
