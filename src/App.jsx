import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'
import ProjectSec from './components/custom/ProjectSec'
import Video from './components/custom/Video'
import Service from './components/custom/Service'
import Footer from './view-trip/components/Footer'
import 'swiper/css';
import 'swiper/css/navigation';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Hero/>
      <Service/>
      <ProjectSec/>
      <Video/>
      <Footer/>
    </>
  )
}

export default App
