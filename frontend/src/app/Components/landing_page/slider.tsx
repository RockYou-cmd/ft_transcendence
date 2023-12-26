import { useEffect, useState } from 'react';
import Pong from "../../../../public/pingpong.gif"
import { StaticImageData } from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';




const  slides = [
    Pong,
    Pong,
    Pong,
]

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className=' w-full items-center justify-center'>
      <Slider {...settings} className='flex justify-center items-center '>
        <div>
          <img src={Pong.src} alt="Image 1" />
        </div>
        <div>
          <img src={Pong.src} alt="Image 2" />
        </div>
        <div>
          <img src={Pong.src} alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
