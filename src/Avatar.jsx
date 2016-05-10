import React from 'react';

import style from './css/comment_item.css';

const Avatar = ({ name, src }) => (
  <div className={style['avatar-container']}>
    <div className={style.avatar}>
      <img alt={name} src={src} />
    </div>
  </div>
);

Avatar.propTypes = {
  name: React.PropTypes.string,
  src: React.PropTypes.string,
};

export default Avatar;
