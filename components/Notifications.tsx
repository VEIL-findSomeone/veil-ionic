'use client';

import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
  IonLabel,
} from '@ionic/react';
import Store from '@/store';
import { getNotifications } from '@/store/selectors';
import { close } from 'ionicons/icons';

interface Notification {
  title: string;
  when: string;
}

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => (
  <IonItem>
    <IonLabel>{notification.title}</IonLabel>
    <IonNote slot="end">{notification.when}</IonNote>
    <IonButton slot="end" fill="clear" color="dark">
      <IonIcon icon={close} />
    </IonButton>
  </IonItem>
);

interface NotificationsProps {
  open: boolean;
  onDidDismiss: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ open, onDidDismiss }) => {
  const notifications = Store.useState(getNotifications) as Notification[];

  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {notifications.map((notification, i) => (
            <NotificationItem notification={notification} key={i} />
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default Notifications;
