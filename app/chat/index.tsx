import React, { useState, useRef, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
  IonText,
  IonFooter,
} from '@ionic/react';
import { shield, checkmarkCircle, heartOutline, chevronBack } from 'ionicons/icons';
import RandomAvatar from '@/components/RandomAvatar/RandomAvatar';
import InputWithGiphy from '@/components/InputWithGiphy/InputWithGiphy';
import './Chat.scss';
import MESSAGES from './messages.dummy';

const Index = () => {
  const [messages, setMessages] = useState<any[]>(MESSAGES);
  const contentRef = useRef<React.RefObject<HTMLIonContentElement>>(null);

  useEffect(() => {
    scrollToBottom(0, true);
  });

  const handleSubmitMessage = (data: any) => {
    setMessages(prev => [
      ...prev,
      {
        id: prev.length,
        isSender: true,
        type: data.type, // 'text' or 'image'
        body: data.type.toUpperCase() === 'IMAGE' ? data.imageUrl : data.message,
        timestamp: 'Mar 30, 2021 9:55am',
      },
    ]);

    setTimeout(() => {
      scrollToBottom();
      fakeReply();
    });
  };

  const fakeReply = () => {
    setMessages(prev => [
      ...prev,
      {
        id: prev.length,
        isSender: false,
        avatar: '/avatar/1.jpg',
        type: 'text',
        body: '넵! ㅎㅎ',
        timestamp: 'Mar 30, 2021 9:57am',
      },
    ]);

    setTimeout(() => {
      scrollToBottom();
    }, 500);
  };

  const scrollToBottom = (duration: number = 500, isFirstLoad: boolean = false) => {
    if (isFirstLoad) {
      setTimeout(() => {
        if (contentRef && contentRef.current) {
          // @ts-ignore
          contentRef.current.scrollToBottom(duration);
        }
      }, 500);
    } else {
      if (contentRef && contentRef.current) {
        // @ts-ignore
        contentRef.current.scrollToBottom(duration);
      }
    }
  };

  const nl2br = (text: string) => {
    if (!text) return text;

    return text.replace(/\n/gi, '<br>');
  };

  return (
    <IonPage className="chat-page">
      <IonHeader className="header-custom">
        <IonToolbar className="toolbar-no-border">
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} text={''} defaultHref="tabs/matches" />
          </IonButtons>
          <IonTitle>
            <RandomAvatar size="sm" />
            <div className="user-name">털이 복실한 얼룩말</div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton color="secondary">
              <IonIcon slot="icon-only" icon={shield} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* @ts-ignore: TS2739 */}
      <IonContent className="ion-padding" ref={contentRef}>
        <div className="ion-padding ion-text-center match-info">
          <IonText color="medium">털이 복실한 얼룩말님께서 메시지를 보냈습니다</IonText>
        </div>

        <div className="chat-list">
          <div className="chat-timestamp center">
            <strong>2024년 1월 6일</strong> 오전 12:38
          </div>

          {messages.map((item: any) => (
            <div className={`chat-item${item.isSender ? ' chat-item-outgoing' : ''}`} key={item.id}>
              <div className="chat-item-inner">
                {!item.isSender && (
                  <div className="chat-avatar">
                    <img src={item.avatar} alt="avartar" />
                  </div>
                )}

                <div className="chat-body">
                  <div
                    className={`chat-item-bubble${item.type === 'image' ? ' bubble-image' : ''}`}
                  >
                    {item.type !== 'image' && (
                      <div
                        className="chat-text"
                        dangerouslySetInnerHTML={{ __html: nl2br(item.body) }}
                      />
                    )}
                    {item.type === 'image' && <img src={item.body} alt="image" />}
                  </div>

                  {item.isSender && (
                    <div className="chat-item-status">
                      <IonIcon icon={checkmarkCircle} color="secondary" />
                      메시지를 읽음
                    </div>
                  )}
                </div>

                {!item.isSender && item.type === 'image' && (
                  <div className="chat-item-reaction">
                    <IonIcon icon={heartOutline} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar className="toolbar-no-border">
          <InputWithGiphy onChange={handleSubmitMessage} />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Index;
