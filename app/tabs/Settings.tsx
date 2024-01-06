'use client';

import React, { useEffect, useState } from 'react';
import Store from '@/store';
import * as selectors from '@/store/selectors';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonToggle,
} from '@ionic/react';
import { setSettings } from '@/store/actions';

interface List {
  id: string;
  name: string;
}

interface ListEntryProps {
  list: List;
}

const ListEntry: React.FC<ListEntryProps> = ({ list }) => (
  <IonItem routerLink={`/tabs/lists/${list.id}`} className="list-entry">
    <IonLabel>{list.name}</IonLabel>
  </IonItem>
);

interface AllListsProps {
  onSelect?: (list: List) => void;
}

const AllLists: React.FC<AllListsProps> = ({ onSelect }) => {
  const lists = Store.useState(selectors.getLists) as List[];

  return (
    <>
      {lists.map((list, i) => (
        <ListEntry list={list} key={i} />
      ))}
    </>
  );
};

const Settings: React.FC = () => {
  const settings = Store.useState(selectors.getSettings);
  const [notificationState, setNotificationState] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/user-notification`)
      .then(response => response.json())
      .then(data => {
        setNotificationState(data.notifications);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle
              checked={notificationState}
              onIonChange={e => {
                setSettings({
                  ...settings,
                  enableNotifications: e.target.checked,
                });
              }}
            />
          </IonItem>
          <AllLists />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
