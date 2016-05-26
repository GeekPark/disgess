import React from 'react';

import style from './css/comment_item.css';
import { randomAvatar } from './utils';

class Avatar extends React.Component {
  render() {
    const { name, src } = this.props;
    return (
      <div className={style['avatar-container']}>
        <div className={style.avatar}>
          <img alt={name} src={src || randomAvatar()} ref="img" />
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
