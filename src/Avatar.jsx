import React from 'react';

import style from './css/comment_item.css';

const defaultAvatar = require('./images/8.jpg');

class Avatar extends React.Component {
  constructor() {
    super();

    this.onError = () => {
      this.refs.img.src = defaultAvatar;
    };
  }
  render() {
    const { name, src } = this.props;
    return (
      <div className={style['avatar-container']}>
        <div className={style.avatar}>
          <img alt={name} src={src} onError={this.onError} ref="img" />
        </div>
      </div>
    );
  }
}

Avatar.propTypes = {
  name: React.PropTypes.string,
  src: React.PropTypes.string,
};

export default Avatar;
