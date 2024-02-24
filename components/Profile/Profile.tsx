import React from 'react';
import { IonHeader, IonToolbar, IonContent, IonFab, IonButton, IonIcon } from '@ionic/react';
import {
  arrowDown,
  checkmarkOutline,
  briefcaseOutline,
  locationOutline,
  closeSharp,
  star,
  heartSharp,
} from 'ionicons/icons';
import ProfileImageSlides from '@/components/ProfileImageSlides/ProfileImageSlides';
import './Profile.scss';
import { User } from '@/app/tabs/swipe/Explore';

type Props = {
  user: User;
  onClose: () => void;
};

const Profile: React.FC<Props> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <>
      <IonHeader>
        <IonToolbar className="toolbar-reduced toolbar-no-border" color="light" />
      </IonHeader>

      <IonContent className="profile-page">
        <div className="profile-header">
          <ProfileImageSlides
            images={[
              { id: 0, imageUrl: user.profile_veil_img_url },
              { id: 1, imageUrl: user.profile_veil_img_url },
              { id: 2, imageUrl: user.profile_veil_img_url },
              { id: 3, imageUrl: user.profile_veil_img_url },
            ]}
          />

          <IonFab vertical="bottom" horizontal="end" edge slot="fixed">
            <IonButton
              color="white"
              className="button-custom button-icon button-sm button-brand"
              onClick={onClose}
            >
              <IonIcon icon={arrowDown} slot="icon-only" />
            </IonButton>
          </IonFab>
        </div>

        <div className="profile-info border-bottom">
          <div className="profile-title">
            <span className="profile-user-name">{user.name}</span>
            <span className="profile-user-age">{user.mbti}</span>
            <span className="icon-verified">
              <IonIcon icon={checkmarkOutline} />
            </span>
          </div>

          <div className="profile-user-info">
            <div className="info-item">
              <IonIcon icon={briefcaseOutline} />
              {user.job_status}
            </div>
            <div className="info-item">
              <IonIcon icon={locationOutline} />
              {user.region1}과 {user.region2}에 거주
            </div>
          </div>

          <div className="passion-list">
            <IonButton fill="outline" shape="round" color="medium" size="small">
              넷플릭스
            </IonButton>
            <IonButton fill="outline" shape="round" color="medium" size="small">
              ENFJ
            </IonButton>
            <IonButton fill="outline" shape="round" color="medium" size="small">
              보드게임
            </IonButton>
            <IonButton fill="outline" shape="round" color="medium" size="small">
              카페투어
            </IonButton>
          </div>
        </div>

        <div className="profile-intro border-bottom">
          <p>{user.self_description}</p>
        </div>

        <IonFab className="bottom-actions" vertical="bottom" horizontal="center" slot="fixed">
          <IonButton color="white" className="button-custom button-icon button-dislike button-lg">
            <IonIcon slot="icon-only" icon={closeSharp} />
          </IonButton>
          <IonButton color="white" className="button-custom button-icon button-star">
            <IonIcon slot="icon-only" icon={star} />
          </IonButton>
          <IonButton color="white" className="button-custom button-icon button-like button-lg">
            <IonIcon slot="icon-only" icon={heartSharp} />
          </IonButton>
        </IonFab>
      </IonContent>
    </>
  );
};

export default Profile;
