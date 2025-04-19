import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import project1 from '../images/project1.jpg';
import project2 from '../images/project2.jpg';
import project3 from '../images/project3.jpg';
import project4 from '../images/project4.jpg';
import project5 from '../images/project5.jpg';
import project6 from '../images/project6.jpg';

const ProjectsSection = () => {
  // Image URLs array

  const images = [project1, project2, project3, project4, project5, project6];

  return (
    <section className="py-16 bg-white text-center">
      <p className="text-red-600 font-semibold uppercase text-sm tracking-widest mb-2">
        Our Best Places
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-10">
        Destinations Chosen by Intelligence
      </h2>

      <div className="px-6 max-w-9xl mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[360px] overflow-hidden  shadow-md">
                <img
                  src={img}
                  alt={`Project ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectsSection;
