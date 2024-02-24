import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonIcon,
  IonRow,
  IonCol,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonList,
  IonListHeader,
  IonButtons,
  IonText,
  IonLabel,
  IonItem,
  IonBackButton,
  IonTitle,
  IonBadge,
} from '@ionic/react';
import {
  checkmarkOutline,
  settingsSharp,
  camera,
  add,
  pencilSharp,
  chevronBack,
} from 'ionicons/icons';
import ProfileEdit from './ProfileEdit/ProfileEdit';
import './UserProfile.scss';
import USERS from '../swipe/users.dummy';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

const UserProfile = () => {
  //FIXME: 원래는 history 정보를 같이 push 해줬음, 뒤로가기 구현?
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState<boolean>(false);
  const [isTinderGoldOpen, setIsTinderGoldOpen] = useState<boolean>(false);
  let [percentage, setPercentage] = useState(0);
  const user = USERS[3];
  const spentvalue = 6390;
  const endprecentageValue = 60;

  useEffect(() => {
    handleProgressValues();
  }, []);

  const handleViewSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleViewProfile = () => {
    setIsProfileOpen(true);
  };

  const handleViewEditProfile = () => {
    setIsProfileEditOpen(true);
  };

  const handleViewTinderGold = () => {
    setIsTinderGoldOpen(true);
  };

  const clearTheTimeOut = (timer: any) => {
    clearTimeout(timer);
  };

  const handleProgressValues = () => {
    const theinterval = setInterval(() => {
      percentage = percentage + 1;
      if (percentage <= endprecentageValue) {
        setPercentage(percentage);
      } else {
        clearTheTimeOut(theinterval);
      }

      // console.log(percentage);
    }, 40);
  };

  return (
    <IonPage>
      <IonHeader className="no-border">
        <IonToolbar className="user-profile-toolbar toolbar-no-border ">
          <IonButtons slot="start">
            <IonBackButton text={''} icon={chevronBack} defaultHref="tabs" />
          </IonButtons>
          <IonTitle className="ion-text-center">설정</IonTitle>
          <IonButtons slot="end">
            <IonButton></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent force-overscroll="false" className="me-page bg-light">
        <div className="vertical-layout safe-area-bottom">
          <div className="section-upper">
            <div className="me-header" onClick={handleViewProfile}>
              <div className="progress-holder">
                <CircularProgressbarWithChildren
                  value={percentage}
                  text={'$' + `${spentvalue}`}
                  circleRatio={0.75}
                  strokeWidth={5}
                  styles={buildStyles({
                    rotation: 1 / 2 + 1 / 8,
                    strokeLinecap: 'round',
                    trailColor: '#DFE7F5',
                    pathColor: '#fd5068',
                    textColor: '#042C5C',
                    textSize: '5px',
                  })}
                ></CircularProgressbarWithChildren>
              </div>
              <IonAvatar className="avatar">
                <img src="/avatar/1.jpg" alt="" />
                <IonBadge className="flex al-center jc-center">프로필 {percentage}% 완성</IonBadge>
              </IonAvatar>

              <div className="detail-holder">
                <span className="me-title">김필중</span>
                <span className="icon-verified">
                  <IonIcon icon={checkmarkOutline} />
                </span>
              </div>
              <div className="me-level">대학생, 수원</div>
            </div>
          </div>

          <IonList className="list-custom">
            <IonItem detail lines="none" onClick={handleViewEditProfile}>
              <IonLabel>
                <div className="text-xl">
                  <IonText color="">내 정보 수정</IonText>
                </div>
              </IonLabel>
            </IonItem>
            <IonItem detail lines="none" onClick={handleViewSettings}>
              <IonLabel>
                <div className="text-xl">
                  <IonText color="">앱 환경설정</IonText>
                </div>
              </IonLabel>
            </IonItem>
            <IonItem detail lines="none" onClick={handleViewSettings}>
              <IonLabel>
                <div className="text-xl">
                  <IonText color="">약관 보기</IonText>
                </div>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>

      <IonModal isOpen={isProfileEditOpen}>
        <ProfileEdit user={user} onClose={() => setIsProfileEditOpen(false)} />
      </IonModal>
    </IonPage>
  );
};

UserProfile.defaultProps = {};

export default UserProfile;
