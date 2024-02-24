// 'use client';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonMenuButton,
} from '@ionic/react';
import LoginWithGithubButton from '@/app/login/components/LoginWithGithub';
import LoginWithKakaoButton from '@/app/login/components/LoginWithKakao';
import LoginWithGoogleButton from '@/app/login/components/LoginWithGoogle';

const Login = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>로그인</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">로그인</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LoginWithGithubButton />
        <LoginWithGoogleButton />
        <LoginWithKakaoButton />
      </IonContent>
    </IonPage>
  );
};

export default Login;
