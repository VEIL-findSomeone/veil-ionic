'use client';

import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, cog, chatbubbles, people, flash } from 'ionicons/icons';
import Swipe from './swipe/Explore'
import Settings from './Settings';
import ListDetail from '../../components/ListDetail';
import ChatList from './chat-list/ChatList';
import Meet from '@/app/tabs/meet';
import Like from '@/app/tabs/Like';
import Chat from '@/app/chat';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/feed" component={Swipe} exact={true} />
        <Route path="/tabs/meet" component={Meet} exact={true} />
        <Route path="/tabs/like" render={() => <Like />} exact={true} />
        <Route path="/tabs/chat-list" component={ChatList} exact={true} />
        <Route path="/chat" component={Chat} exact />
        <Route path="/tabs/lists/:listId" render={() => <ListDetail />} exact={true} />
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/feed">
          <IonIcon icon={home} />
          <IonLabel>홈</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/meet">
          <IonIcon icon={flash} />
          <IonLabel>번개</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/like">
          <IonIcon icon={people} />
          <IonLabel>좋아요</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/chat-list">
          <IonIcon icon={chatbubbles} />
          <IonLabel>채팅</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>설정</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
