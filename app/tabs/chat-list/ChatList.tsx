'use client';

import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonSearchbar,
  IonText,
  IonRow,
  IonCol,
} from '@ionic/react';
import RandomAvatar from '@/components/RandomAvatar/RandomAvatar';
import { randomInformation } from '@/components/RandomAvatar/randomInformation';
import './Matches.scss';

type Props = {
  history: any;
};

const ChatList: React.FC<Props> = ({ history }) => {
  const [segmentView, setSegmentView] = useState<string>('LIST');
  const dummyMessageCount = 14;

  const goToChat = () => {
    history.push('/chat');
  };

  return (
    <IonPage>
      <IonHeader className="header-custom">
        <IonToolbar className="toolbar-no-border toolbar-no-safe-area">
          <IonSegment
            className="segment-custom"
            value={segmentView}
            onIonChange={e => setSegmentView(e.detail.value as string)}
            mode="md"
          >
            <IonSegmentButton value="LIST">
              <IonLabel>
                메시지
                <div className="segment-badge">6</div>
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="FEED">
              <IonLabel>
                매칭
                <div className="segment-badge">3</div>
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="matches-page">
        <div className="safe-area-bottom">
          {segmentView === 'LIST' && (
            <div>
              <div className="border-bottom">
                <IonSearchbar placeholder="받은 메시지 검색" className="search-bar"></IonSearchbar>
              </div>

              <div>
                <div className="list-header">
                  <IonText color="primary">
                    <strong>대화</strong>
                  </IonText>
                </div>
                <div className="message-list">
                  {Array.from({ length: dummyMessageCount }).map((_, index) => {
                    const information = randomInformation();
                    return (
                      <IonRow
                        className="ion-align-items-center"
                        key={information.name + index}
                        onClick={goToChat}
                      >
                        <IonCol size="auto">
                          <RandomAvatar size="lg" />
                        </IonCol>
                        <IonCol className="message-item-text">
                          <div>
                            <div className="user-name">{information.name}</div>
                            <IonText color="medium">{information.message}</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

ChatList.defaultProps = {};

export default ChatList;
