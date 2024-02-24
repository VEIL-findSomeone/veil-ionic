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
import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/gotrue-js';
import { supabase } from '@/lib/supabase/client';
import readUserSession from '@/lib/actions';

const Landing = () => {
  const [session, setSession] = useState<Session | null | false>(false);

  useEffect(() => {
    const checkSession = async () => {
      // const result = await readUserSession();
      const { data } = await supabase.auth.getSession();
      console.log(data);
      return data;
    };

    checkSession()
      .then(data => {
        if (data.session) setSession(data.session);
        else {
          console.log('없는데...?', data.session);
          setSession(false);
        }

        console.log('있는데...?', data.session);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (session === null) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>랜딩페이지</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <img src="/landing-page.jpeg" alt="avartar" />
        </IonContent>
      </IonPage>
    );
  } else {
    console.log('사용자 정보를 확인했으나 로그인이 되어있지 않습니다. 로그인페이지로 이동합니다');
  }

  if (session === false) {
    return (
      // login 이 안되었을 때,
      <IonRouterOutlet>
        <Route path="/landing" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    );
  }

  return (
    // login 이 되었을 때,
    <IonRouterOutlet>
      <Route path="/landing" render={() => <Redirect to="/tabs/feed" />} />
    </IonRouterOutlet>
  );
};

export default Landing;
