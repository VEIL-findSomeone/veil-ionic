import React, { useState } from 'react';
import { IonRow, IonCol, IonIcon, IonButton } from '@ionic/react';
import {
  checkmarkOutline,
  ellipse,
  briefcaseOutline,
  locationOutline,
  informationCircle,
} from 'ionicons/icons';
import './SwipeCard.scss';
import ProfileImageSlides from '../ProfileImageSlides/ProfileImageSlides';
import { User } from '@/app/tabs/swipe/Explore';

type Props = {
  user: User;
  isPreview?: boolean;
  onNoMoreSlide?: (l: boolean) => void;
  onViewInfo?: () => void;
};

const SwipeCard: React.FC<Props> = ({ user, isPreview, onNoMoreSlide, onViewInfo }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNoMoreSlide = (isOnTheLeft: boolean) => {
    if (onNoMoreSlide) onNoMoreSlide(isOnTheLeft);
  };

  const handleViewInfo = () => {
    if (onViewInfo) onViewInfo();
  };

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="swipe-card">
      <ProfileImageSlides
        images={[
          { id: 0, imageUrl: user.profile_veil_img_url },
          { id: 1, imageUrl: user.profile_veil_img_url },
          { id: 2, imageUrl: user.profile_veil_img_url },
          { id: 3, imageUrl: user.profile_veil_img_url },
        ]}
        isClickable
        onNoMoreSlide={handleNoMoreSlide}
        onChange={handleSlideChange}
      />

      <div className="card-caption" onClick={handleViewInfo}>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol>
            <div className="card-title">
              <span className="card-user-name">{user.name}</span>
              <span className="card-user-age">{user.mbti}</span>
              <span className="icon-verified">
                <IonIcon icon={checkmarkOutline} />
              </span>
            </div>

            {currentIndex === 0 && (
              <div className="card-user-info">
                {/*<div>*/}
                {/*  <IonIcon icon={ellipse} color="success" />*/}
                {/*  현재 접속중*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <IonIcon icon={briefcaseOutline} />*/}
                {/*  {user.job_title}*/}
                {/*</div>*/}
                <div>
                  <IonIcon icon={locationOutline} />
                  {user.region1}, {user.region2}
                </div>
              </div>
            )}

            {currentIndex === 1 && (
              <div className="card-user-info">
                <div className="passion-list">
                  <IonButton fill="outline" shape="round" color="white" size="small">
                    Netflix
                  </IonButton>
                  <IonButton fill="outline" shape="round" color="white" size="small">
                    Foodie
                  </IonButton>
                  <IonButton fill="outline" shape="round" color="white" size="small">
                    Instagram
                  </IonButton>
                  <IonButton fill="outline" shape="round" color="white" size="small">
                    Photography
                  </IonButton>
                  <IonButton fill="outline" shape="round" color="white" size="small">
                    Travel
                  </IonButton>
                </div>
              </div>
            )}

            {currentIndex > 1 && (
              <div className="card-user-info">
                <p>{user.self_description}</p>
              </div>
            )}
          </IonCol>
          {!isPreview && (
            <IonCol size="auto">
              {/*<IonIcon className="button-info" icon={informationCircle} onClick={handleViewInfo} />*/}
            </IonCol>
          )}
        </IonRow>
      </div>
    </div>
  );
};
//
// SwipeCard.defaultProps = {
//   user: {},
//   isPreview: false,
//   onNoMoreSlide: () => {},
//   onViewInfo: () => {},
// };

export default SwipeCard;
