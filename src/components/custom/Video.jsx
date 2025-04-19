import React from 'react';
import { Play } from 'lucide-react';
import video from"../../../public/video.mp4";
const HeroSection = () => {
  return (
    <section
      className="relative h-[600px] flex items-center justify-center text-white"
      style={{
        backgroundImage: "url('../../../public/pixa.jpg')", // Replace with actual image path in public or import
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Text & Button */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          We Are The Leader in<br />
          <span className="block">Trip Planning</span>
        </h1>

        {/* Play Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              const videoModal = document.getElementById('video-modal');
              if (videoModal) videoModal.style.display = 'flex';
            }}
            className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 transition border-2 border-white flex items-center justify-center"
          >
            <Play className="text-white w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <div
        id="video-modal"
        className="hidden fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        onClick={() => {
          const videoModal = document.getElementById('video-modal');
          const video = document.getElementById('local-video');
          if (video) video.pause(); // pause video on modal close
          if (videoModal) videoModal.style.display = 'none';
        }}
      >
        <div className="relative w-[90%] md:w-[800px] h-[450px] bg-black">
          <video
            id="local-video"
            className="w-full h-full"
            controls
            autoPlay
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
