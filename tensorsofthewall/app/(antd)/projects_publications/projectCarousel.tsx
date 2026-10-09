"use client";
import React from 'react';
import { Carousel } from 'antd';
import ProjectCard, {ProjectCardProps} from './projectCard';
  
  interface ProjectCarouselProps {
    projects: ProjectCardProps[];
  }
  
  const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
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
        {projects.map((project, index) => (
          <div key={index} className="research-paper-slide hover:scale-105">
          <ProjectCard {...project} key={index}/>
          </div>
        ))}
      </Carousel>
    );
  };

export default ProjectCarousel;
