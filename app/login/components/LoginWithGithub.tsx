'use client';

import { IonButton } from '@ionic/react';
import React from 'react';
import { supabase } from '@/lib/supabase/client';

export default function LoginWithGithubButton() {
  const loginWithGithub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/api/auth-callback`,
      },
    });
  };

  return (
    <IonButton className="w-full" onClick={loginWithGithub}>
      Github 계정으로 로그인 (개발용)
    </IonButton>
  );
}
