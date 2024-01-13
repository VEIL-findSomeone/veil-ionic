import React, { useState, useRef } from 'react';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import './ProfileImageSlides.scss';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

type Props = {
  images: any[];
  isClickable?: boolean;
  onNoMoreSlide?: (l: boolean) => void;
  onChange?: (i: number) => void;
};

SwiperCore.use([Pagination, Navigation]);

const ProfileImageSlides: React.FC<Props> = ({ images, isClickable, onChange, onNoMoreSlide }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  return (
    <div className="profile-image-slides">
      <Swiper
        className="slides"
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined,
        }}
        onInit={swiper => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        onSlideChange={swiper => {
          const currentIndex = swiper.realIndex;
          const totalSlides = swiper.slides.length;
          const isAtStart = currentIndex === 0;
          const isAtEnd = currentIndex === totalSlides - 1;
          if (isAtStart) {
            console.log('처음 슬라이드에 도달했습니다.');
          }
          if (isAtEnd) {
            console.log('마지막 슬라이드에 도달했습니다.');
          }
        }}
      >
        {images.map(item => (
          <SwiperSlide key={item.id}>
            <div
              className="slide-img background-img"
              style={{ backgroundImage: `url('${item.imageUrl}')` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination">
        {images.map((item, index) => (
          <div
            key={item.id}
            className={`pagination-bullet${
              activeIndex === index ? ' pagination-bullet-active' : ''
            }`}
          />
        ))}
      </div>
      {isClickable && (
        <div className="overlay-navigation">
          <div className="navi navi-left" ref={prevRef} />
          <div className="navi navi-right" ref={nextRef} />
        </div>
      )}
    </div>
  );
};

export default ProfileImageSlides;
