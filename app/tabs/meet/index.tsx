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
// import EVENTS2 from '@/app/tabs/meet/events2.dummy';
// import EventCard from '@/components/EventCard/EventCard';
import Testcard from '@/components/Vibecard/VibeCard';

const Meet: React.FC = ({}) => {
  const events: any[] = [...EVENTS];
  // const events2: any[] = [...EVENTS2];

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
        {/*{isActive &&*/}
        {/*  <div className="section" >*/}
        {/*    <div className="title">*/}
        {/*      <h2>For You</h2>*/}
        {/*      <h4>Recommendations based on your profile</h4>*/}
        {/*    </div>*/}

        {/*    <div>*/}
        {/*      <IonRow>*/}
        {/*        {events2.map((event, index) => (*/}
        {/*          <IonCol*/}
        {/*            size="6"*/}
        {/*            key={event.id}*/}
        {/*          >*/}
        {/*            <EventCard  events={event} />*/}
        {/*          </IonCol>*/}
        {/*        ))}*/}
        {/*      </IonRow>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*}*/}
        {/* <Overlay
          prevYPosition={someState}
          isVisible={isActive}
          onClose={HnadleOverlay}
          id={selected}
        /> */}
      </IonContent>
    </IonPage>
  );
};

export default Meet;
