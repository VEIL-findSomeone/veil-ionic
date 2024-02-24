'use client';

import { IonButton } from '@ionic/react';
import React from 'react';
import { supabase } from '@/lib/supabase/client';

export default function LoginWithKakaoButton() {
  const loginWithKakao = () => {
    supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth-server-action/callback`,
      },
    });
  };

  return (
    <IonButton className="w-full" onClick={loginWithKakao}>
      kakao 계정으로 로그인하기
    </IonButton>
  );
}
