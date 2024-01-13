import React, { useState, useRef } from 'react';
import {IonRow, IonCol, IonButton, IonIcon, IonText
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import {
  play
} from 'ionicons/icons';
import './SpotifyHighlights.scss';

const SpotifyHighlights = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const ionSlidesRef = useRef<SwiperClass>(null);
  const items: number[] = [0,1,2,3];

  const handleLoaded = () => {
    if (ionSlidesRef && ionSlidesRef.current) {
      ionSlidesRef.current.update();
    }
  }

  const handleSlideChange = () => {
    if (ionSlidesRef && ionSlidesRef.current) {
      ionSlidesRef.current.getActiveIndex()
        .then((index: number) => {
          setActiveIndex(index);
        })
    }
  }

  return (
    <div className="spotify-highlights">
      <div className="section-title">
        My Top Spotify Artists
      </div>

      <div className="custom-pagination">
        {
          items.map(bullet => (
            <div key={ bullet } className={ `pagination-bullet${ activeIndex === bullet ? ' pagination-bullet-active' : '' }` } />
          ))
        }
      </div>

      <Swiper
        ref={ ionSlidesRef }
        onInit={ handleLoaded }
        onSlideChange={ handleSlideChange }
      >
        {
          items.map(item => (
            <SwiperSlide key={ item }>
              <IonRow className="highlight-slide">
                <IonCol>
                  <div className="highlight-item">
                    <div className="album-artwork-fluid">
                      <div className="album-cover background-img" style={{ backgroundImage: 'url(assets/img/album.png)' }} />
                      <IonRow className="ion-justify-content-center ion-align-items-center">
                        <div className="album-artwork-overlay">
                          <IonButton color="white" className="button-custom button-icon text-primary">
                            <IonIcon slot="icon-only" icon={play} />
                          </IonButton>
                        </div>
                      </IonRow>
                    </div>
                    <div className="item-caption">
                      <div className="item-artist">
                        <div>Red Hot Chili Peppers</div>
                      </div>
                      <div className="item-title">
                        <IonText color="medium">Californication</IonText>
                      </div>
                    </div>
                  </div>
                </IonCol>
                <IonCol>
                  <div className="highlight-item">
                    <div className="album-artwork-fluid">
                      <div className="album-cover background-img" style={{ backgroundImage: 'url(assets/img/album2.png)' }} />
                      <IonRow className="ion-justify-content-center ion-align-items-center">
                        <div className="album-artwork-overlay">
                          <IonButton color="white" className="button-custom button-icon text-primary">
                            <IonIcon slot="icon-only" icon={play} />
                          </IonButton>
                        </div>
                      </IonRow>
                    </div>
                    <div className="item-caption">
                      <div className="item-artist">
                        <div>Green Day</div>
                      </div>
                      <div className="item-title">
                        <IonText color="medium">Basket Case</IonText>
                      </div>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className="spotify-connect">
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol>
            <IonText color="medium">Share your Spotify Music Interests</IonText>
          </IonCol>
          <IonCol size="auto">
            <IonButton color="success" size="small">
              LINK SPOTIFY
            </IonButton>
          </IonCol>
        </IonRow>
      </div>
    </div>
  );
};

export default SpotifyHighlights;
