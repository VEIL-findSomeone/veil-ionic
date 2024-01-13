'use client';

import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  // IonRow,
  // IonCol,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import './Discover.scss';
import EVENTS from '@/app/tabs/meet/events.dummy';
// import EventCard from '@/components/EventCard/EventCard';
import Testcard from '@/components/Vibecard/VibeCard';

const Meet: React.FC = ({}) => {
  const events: any[] = [...EVENTS];

  const [isActive, setActive] = useState(true);

  const handleStart = (actnum: number) => {
    if (isActive) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>주변 찾아보기</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">주변 찾아보기</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="section">
          <div>
            {events.map((event, _) => (
              <div key={event.id}>
                <Testcard onToggled={() => handleStart(event.id)} events={event} />
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Meet;
