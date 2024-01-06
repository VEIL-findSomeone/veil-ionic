/**
  Random Avatar for Ionic 6 React
  v1.0.0 (27/04/2022)
  Ion Wizard (https://ionwizard.gumroad.com)
*/

import React from 'react';
import {

} from '@ionic/react';
import {

} from 'ionicons/icons';
import USERS from './avatars';
import './RandomAvatar.scss';

type Props = {
  size?: string,
  customSize?: number,
}

const RandomAvatar: React.FC<Props> = ({ size, customSize }) => {
  const randomIndex = Math.floor(Math.random() * (USERS.length - 1));
  const imageUrl = `${ USERS[randomIndex].profileUrl }`;
  const styles = {
    backgroundImage: `url(${ imageUrl })`,
  } as React.CSSProperties;
  let classes = 'avatar';

  if (size) {
    classes = `${classes} avatar-${size}`;
  }

  if (customSize) {
    styles.width = customSize;
    styles.height = customSize;
  }

  return (
    <div className="random-avatar">
      <div
        className={ classes }
        style={ styles }
      />
    </div>

  );
};

RandomAvatar.defaultProps = {

}

export default RandomAvatar;