'use client';
import React from 'react';
import { useState, useRef, useEffect } from 'react';

import {
  IonPage,
  IonContent,
  IonRow,
  IonGrid,
  IonCol,
  IonButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonAvatar,
} from '@ionic/react';
import { refresh, closeSharp, star, heartSharp, flash } from 'ionicons/icons';
import * as swing from 'swing';
import ReactSwing from 'react-swing';
import './Explore.scss';
import RippleLoader from '@/components/RippleLoader/RippleLoader';
import SwipeCard from '@/components/SwipeCard/SwipeCard';
import MatchedModal from '@/components/MatchedModal/MatchedModal';
import Profile from '@/components/Profile/Profile';
import { enterAnimation, leaveAnimation } from '@/app/animations/animations2';
import USERS from './users.dummy';
import { RouteComponentProps } from 'react-router';

type User = {
  id: number;
  name: string;
  age: number;
  job_title: string;
  profile_image_url: string;
  images: any[];
};

const Explore = (props: unknown) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<User | null>(null);
  const [cards, setCards] = useState<User[]>([]);
  const [stack, setStack] = useState(null);

  const stackRef = useRef<React.RefObject<HTMLDivElement>>(null);
  let nopeEl: HTMLElement | null = null;
  let likeEl: HTMLElement | null = null;
  let nextCardEl: HTMLElement | null = null;

  const handleLogout = () => {
    // @ts-ignore
    props.history.push('/userprofile');
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // API call goes here
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setCards([...USERS]);
    }, 1000);
  };

  const getTopCardEl = () => {
    if (!stackRef) {
      return null;
    }
    // @ts-ignore
    const { children } = stackRef.current;
    let targetEl;

    if (children.length >= 1) {
      targetEl = children[children.length - 1];
    }

    if (targetEl) return targetEl;
  };

  const getNextCardEl = () => {
    if (!stackRef) {
      return null;
    }
    // @ts-ignore
    const { children } = stackRef.current;
    let targetEl;

    if (children.length >= 2) {
      targetEl = children[children.length - 2];
    }

    if (targetEl) return targetEl;
  };

  const handleSetStack = (swingStack: any) => {
    setStack(swingStack);
    const topCardEl = getTopCardEl();

    if (topCardEl) {
      nopeEl = topCardEl.querySelector('.stamp-nope');
      likeEl = topCardEl.querySelector('.stamp-like');
    }

    nextCardEl = getNextCardEl();
  };

  const handleButtonClicked = (type: string = 'NOPE') => {
    if (isLocked) return false;

    if (stackRef && stack) {
      const topCardEl = getTopCardEl();

      if (topCardEl) {
        if (type === 'NOPE') {
          if (nopeEl) nopeEl.style.opacity = '1';
        } else {
          if (likeEl) likeEl.style.opacity = '1';
        }

        setTimeout(() => {
          // @ts-ignore
          const topCard = stack.getCard(topCardEl);
          const throwX =
            type === 'NOPE' ? -0.5 * topCardEl.offsetWidth : 0.5 * topCardEl.offsetWidth;
          topCard.throwOut(
            throwX,
            20,
            type === 'NOPE' ? ReactSwing.DIRECTION.LEFT : ReactSwing.DIRECTION.RIGHT
          );
        }, 4000);
      }
    }
  };

  const handleClickNope = () => {
    handleButtonClicked('NOPE');
  };

  const handleClickLike = () => {
    handleButtonClicked('LIKE');
  };

  const handleGetMoreCards = () => {
    if (isLocked) return false;

    getData();
  };

  // Called whenever we drag an element
  const handleCardDragging = (element: HTMLElement, x: number, y: number, r: number) => {
    const calculatedValue = Math.min(100, Math.abs(x) - 20) / 100; // 0 <-> 1 for Opacity

    window.requestAnimationFrame(() => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
    });

    if (Math.abs(x) > 20 && Math.abs(x) <= element.offsetWidth / 2) {
      window.requestAnimationFrame(() => {
        // @ts-ignore
        nopeEl.style.opacity = x < 0 ? calculatedValue : 0;
        // @ts-ignore
        likeEl.style.opacity = x < 0 ? 0 : calculatedValue;
      });

      // Zoom effect for the card behind the current one
      window.requestAnimationFrame(() => {
        if (nextCardEl) {
          nextCardEl.style.transform = `translate3d(0,0,0) scale(${
            0.94 + 0.06 * calculatedValue
          }, ${0.94 + 0.06 * calculatedValue})`;
        }
      });
    } else if (x === 0) {
      window.requestAnimationFrame(() => {
        // @ts-ignore
        likeEl.style.opacity = 0;
        // @ts-ignore
        nopeEl.style.opacity = 0;
      });
    }
  };

  const handleCardThrowOut = (e: any, direction = ReactSwing.DIRECTION.LEFT) => {
    setIsLocked(true);
    const removedCard: User = cards[cards.length - 1];
    //여기서 swipeRight일때, matchModal을 띄워주면 될듯
    console.log(
      `${direction === ReactSwing.DIRECTION.LEFT ? 'SWIPED LEFT' : 'SWIPED RIGHT'}: ${
        removedCard.name
      }`
    );
  };

  const handleThrowIn = () => {
    setIsLocked(false);
  };

  const handleCardThrowOutEnd = () => {
    setCards(currentCards => {
      return currentCards.slice(0, -1);
    });
  };

  useEffect(() => {
    // cards 상태가 바뀌었을 때 실행되는 부수 효과
    console.log('cards바뀌어서 useEffect 실행!!!');
    const topCardEl = getTopCardEl();

    if (topCardEl) {
      topCardEl.style.transform = 'scale(1, 1)';
    }

    setIsLocked(false);

    if (cards.length === 0) {
      console.log('카드 다떨어져서 데이터 요청해버림;;');
      getData(); // 카드가 없으면 데이터 로드
    }
  }, [cards.length]);

  const handleToggleMatchModal = () => {
    setIsMatchModalOpen(!isMatchModalOpen);
  };

  const handleNoMoreSlide = (isOnTheLeft: boolean) => {
    if (stackRef && stackRef.current) {
      const className = isOnTheLeft ? 'rotate-left' : 'rotate-right';

      // @ts-ignore
      stackRef.current.classList.add(className);
      setTimeout(() => {
        // @ts-ignore
        stackRef.current.classList.remove(className);
      }, 2500);
    }
  };

  const handleOpenProfile = (user: User) => {
    setIsProfileOpen(!isProfileOpen);
    setCurrentProfile(user);
  };

  const handleToggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  /**
    Read more: https://github.com/gajus/swing#configuration
  */
  const stackConfig = {
    // Default setting only allows UP, LEFT and RIGHT so you can override this as below
    allowedDirections: [ReactSwing.DIRECTION.LEFT, ReactSwing.DIRECTION.RIGHT],
    throwOutConfidence: (offsetX: number, _offsetY: number, element: HTMLElement) => {
      return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
    },
    transform: (element: HTMLElement, x: number, y: number, r: number) => {
      handleCardDragging(element, x, y, r);
    },
    throwOutDistance: () => {
      return window.outerWidth * 1.5;
    },
  };

  return (
    <IonPage>
      <IonHeader className="no-border">
        <IonToolbar className="expolre-toolbar toolbar-no-border toolbar-no-safe-area">
          <IonButtons slot="start">
            <IonAvatar onClick={handleLogout}>
              <img src="/profile/emma3.jpeg" className="h-full" alt="" />
            </IonAvatar>
          </IonButtons>
          <IonTitle className="ion-text-center">
            <img src="assets/img/logowords.svg" alt="" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="explore-bg explore-page" forceOverscroll={false}>
        {isLoading && (
          <div className="full-height safe-area-bottom">
            <IonRow className="full-height ion-justify-content-center ion-align-items-center">
              <RippleLoader imageUrl="/profile/emma3.jpeg" />
            </IonRow>
          </div>
        )}

        {!isLoading && (
          <div className="cards-container safe-area-bottom">
            {/* @ts-ignore: TS2739 */}
            <ReactSwing
              ref={stackRef}
              className="card-stack"
              setStack={handleSetStack}
              config={stackConfig}
              throwin={handleThrowIn}
              throwoutleft={(e: any) => handleCardThrowOut(e, ReactSwing.DIRECTION.LEFT)}
              throwoutright={(e: any) => handleCardThrowOut(e, ReactSwing.DIRECTION.RIGHT)}
              throwoutend={handleCardThrowOutEnd}
            >
              {cards.map((item: User, index) => (
                <div
                  className={`card-item${index < cards.length - 2 ? ' ion-hide' : ''}`}
                  key={item.id}
                  data-card-id={item.id}
                >
                  <SwipeCard
                    user={item}
                    onNoMoreSlide={handleNoMoreSlide}
                    onViewInfo={() => handleOpenProfile(item)}
                  />

                  <div className="stamp stamp-like">Like</div>
                  <div className="stamp stamp-nope">Nope</div>
                </div>
              ))}
            </ReactSwing>

            <div className="card-actions">
              <IonGrid>
                <IonRow className="ion-justify-content-center ion-align-items-center">
                  <IonCol size="auto">
                    <IonButton
                      fill="outline"
                      color="gold"
                      className="button-custom button-icon button-revert"
                      onClick={handleGetMoreCards}
                    >
                      <IonIcon slot="icon-only" icon={refresh} />
                    </IonButton>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton
                      fill="outline"
                      color="dislike"
                      className="button-custom button-icon button-dislike button-lg"
                      onClick={handleClickNope}
                    >
                      <IonIcon slot="icon-only" icon={closeSharp} />
                    </IonButton>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton
                      fill="outline"
                      color="like"
                      className="button-custom button-icon button-star"
                    >
                      <IonIcon slot="icon-only" icon={star} />
                    </IonButton>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton
                      fill="outline"
                      color="like"
                      className="button-custom button-icon button-like button-lg"
                      onClick={handleClickLike}
                    >
                      <IonIcon slot="icon-only" icon={heartSharp} />
                    </IonButton>
                  </IonCol>
                  <IonCol size="auto">
                    <IonButton
                      fill="outline"
                      color="boost"
                      className="button-custom button-icon button-boost"
                    >
                      <IonIcon slot="icon-only" icon={flash} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </div>
        )}
      </IonContent>

      <IonModal
        isOpen={isMatchModalOpen}
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
      >
        <MatchedModal onClose={handleToggleMatchModal} />
      </IonModal>

      <IonModal isOpen={isProfileOpen}>
        <Profile user={currentProfile} onClose={handleToggleProfile} />
      </IonModal>
    </IonPage>
  );
};

export default Explore;
