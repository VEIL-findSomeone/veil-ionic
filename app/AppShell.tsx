'use client';

import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Tabs from './tabs';

// custom CSS
import './sass/variables.override.scss';
import './sass/helper.scss';
import './sass/app.scss';
import './sass/dark.scss';

import '@/styles/fonts.css';
import Landing from '@/app/landing/Landing';

setupIonicReact({});

window.matchMedia('(prefers-color-scheme: dark)').addListener(async status => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          {children}
          <Route path="/tabs" render={() => <Tabs />} />
          <Route path="/landing" component={Landing} exact />
          <Route path="/" render={() => <Redirect to="/landing" />} exact={true} />
          {/*<Route path="/" render={() => <Redirect to="/tabs/feed" />} exact={true} />*/}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
