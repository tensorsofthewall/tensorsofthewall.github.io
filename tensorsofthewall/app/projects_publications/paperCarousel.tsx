"use client";
import React from 'react';
import { Carousel } from 'antd';
import PaperCard, {PaperCardProps} from './paperCard';
  
  interface ResearchCarouselProps {
    papers: PaperCardProps[];
  }
  
  const ResearchCarousel: React.FC<ResearchCarouselProps> = ({ papers }) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    return (
      <Carousel {...settings} dotPosition='bottom' arrows={true} className="research-paper-carousel">
        {papers.map((paper, index) => (
          <div key={index} className="research-paper-slide hover:scale-105">
          <PaperCard {...paper} key={index}/>
          </div>
        ))}
      </Carousel>
    );
  };

export default ResearchCarousel;
