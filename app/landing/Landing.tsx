'use client';

import { Redirect, Route } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { IonButton } from '@ionic/react';

import React, { useState } from 'react';

const Landing = () => {
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>랜딩페이지</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <img src="/landing-page.jpeg" alt="avartar" />
          <IonButton color="secondary" onClick={() => setIsLogin(true)}>
            로그인 시켜주는 버튼
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    // login 이 되었을 때,
    <IonRouterOutlet>
      <Route path="/landing" render={() => <Redirect to="/tabs/feed" />} exact={true} />
    </IonRouterOutlet>
  );
};

export default Landing;
