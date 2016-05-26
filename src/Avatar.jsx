import React from 'react';

import style from './css/comment_item.css';
import { randomAvatar } from './utils';

class Avatar extends React.Component {
  constructor() {
    super();

    this.onError = () => {
      this.refs.img.src = randomAvatar();
    };
  }
  render() {
    const { name, src } = this.props;
    return (
      <div className={style['avatar-container']}>
        <div className={style.avatar}>
          <img alt={name} src={src || randomAvatar()} onError={this.onError} ref="img" />
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
