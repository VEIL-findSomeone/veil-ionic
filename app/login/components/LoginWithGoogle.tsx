'use client';

import { IonButton } from '@ionic/react';
import React from 'react';
import { supabase } from '@/lib/supabase/client';

export default function LoginWithGoogleButton() {
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/api/auth-callback`,
      },
    });
  };

  return (
    <IonButton className="w-full" onClick={loginWithGoogle}>
      구글 계정으로 로그인 (개발용)
    </IonButton>
  );
}
