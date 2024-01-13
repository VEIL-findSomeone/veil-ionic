import React from 'react';
import { IonAvatar } from '@ionic/react';
import {} from 'ionicons/icons';
import './RippleLoader.scss';

type Props = {
  imageUrl: string;
};

const RippleLoader: React.FC<Props> = ({ imageUrl }) => {
  return (
    <div className="ripple-loader">
      <IonAvatar className="thumbnail-xl ripple-trigger">
        <img src={imageUrl} className="h-full" alt="" />
      </IonAvatar>
      <div className="ripple-1"></div>
      <div className="ripple-2"></div>
    </div>
  );
};

export default RippleLoader;
