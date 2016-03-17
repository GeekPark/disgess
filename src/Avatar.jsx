import React from 'react';
import { PropTypes } from 'react';

import style from './css/comment_item';

const Avatar = ({ name, src }) => (
  <div className={style['avatar-container']}>
    <div className={style.avatar}>
      <img alt={name} src={src} />
    </div>
  </div>
);

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
};

export default Avatar;
