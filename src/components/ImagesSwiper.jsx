import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { messages, users } from '@/Data';
import 'swiper/css';
import '../app/Css/chat.css';
import { AllContext } from '@/app/Context';

import { IoClose, IoCopy } from "react-icons/io5";


function ImagesSwiper() {
  const {
    dataSwiperType,
    dataForSwiper,
    imgFocus,
    setImgFocus,
    imgIndex,
    setImgIndex,
    closeImgHolderRef
  } = useContext(AllContext);
  

  console.log(dataForSwiper);
  
  const [swiperRef, setSwiperRef] = useState(null);  

  const currentfocusdMsg = messages.find((msg) => msg.id === imgFocus);

  useEffect(() => {
    if (swiperRef) {
      swiperRef.slideTo(imgIndex);
    }
  }, [imgIndex, swiperRef]);
  

  const handleImageClick = (id, index) => {
    setImgFocus(id)
    if (index === '') {
      const mediaIndex = mediaMsgs.findIndex((msg) => msg.id == id);
      swiperRef.slideTo(mediaIndex, 500);
      setImgIndex(mediaIndex)
    } else {
      swiperRef.slideTo(index, 500);
      setImgIndex(index)
    }
  };

  return (
    <div ref={closeImgHolderRef} className={`focusedMsg ${imgFocus && 'active'} ${dataSwiperType}`}>
    <div className='hold'>
      {imgFocus && <IoClose className='closeMsg'         
        onClick={() => setImgFocus(null)}/>}
      {currentfocusdMsg?.user !== 'Bob' && <h5>{currentfocusdMsg?.user}</h5>}
      {currentfocusdMsg?.img && (
        <img 
          src={currentfocusdMsg?.img} 
          alt={currentfocusdMsg.user ? `${currentfocusdMsg.user}'s image` : "User image"} 
        />
      )}
      {currentfocusdMsg?.message && <p>{currentfocusdMsg?.message}</p>}
    </div>
    {dataForSwiper?.length > 1 && (
      <Swiper
        onSwiper={setSwiperRef}
        spaceBetween={5}
        slidesPerView={'auto'}
        centeredSlides={true}
        loop={false}
      >
        {dataForSwiper.map((x, index) => (
          <SwiperSlide 
              key={index}
              onClick={() => handleImageClick(x.id, index)}
              style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img 
                src={x.img} 
                alt={`Slide ${index}`}
                className={`${imgFocus == x.id && 'active'}`}
                style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'cover',
                    cursor: 'pointer'
                }}
            />
        </SwiperSlide>
        ))}
      </Swiper> 
    )}

  </div>
  )
}

export default ImagesSwiper