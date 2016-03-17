import React from 'react';
import { PropTypes } from 'react';

import style from './css/comment_item';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const Avatar = ({ name, src }) => {
  const source = src ? `${src}?imageView2/1/w/100/h/100` : require(`./images/${random(1, 8)}.jpg`);

  return (
    <div className={style['avatar-container']}>
      <div className={style.avatar}>
        <img alt={name} src={source} />
      </div>
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
};

export default Avatar;
