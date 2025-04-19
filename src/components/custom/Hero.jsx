import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


function Hero() {
  return (
    <div
      className="relative h-screen overflow-hidden text-white font-sans bg-cover bg-center"
      style={{
        backgroundImage: "url('../../../public/park-city.jpg')", // Replace with your actual image path
      }}
    >
      {/* Overlay (optional for dark effect) */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full pl-24 space-y-6">
        <h2 className="text-4xl uppercase tracking-widest">GENERATE</h2>
        <h1 className="text-8xl font-extrabold leading-tight">
        AI VOYAGES
        </h1>
        <div className="flex items-center gap-6">
  <Link to="/create-trip">
  <button className="flex items-center gap-2 px-10 py-2 rounded-full border border-[#c63434] bg-[#df2b2b] text-white hover:bg-black hover:text-white transition-colors duration-300">
 
  GENERATE TRIP
</button>

  </Link>

  <button
  onClick={() => {
    const modal = document.getElementById("video-modal");
    if (modal) modal.style.display = "flex";
  }}
  className="flex items-center gap-2 border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition text-white"
>
  <svg width="20" height="20" fill="currentColor">
    <polygon points="5,3 19,10 5,17" />
  </svg>
  WATCH OUR VIDEO
</button>
</div>

      </div>
    </div>
  )
}

export default Hero
