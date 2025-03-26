import React from 'react'
import Navbar from './Components/Navbar'
import Work from './Components/Work'
import Cards from './Components/Cards'
import Products from './Components/Products'
import Marquees from './Components/Marquees'
import Tabs from './Components/Tabs'
import Footer from './Components/Footer'
import LocomotiveScroll from 'locomotive-scroll';



function App() {
  const locomotiveScroll = new LocomotiveScroll();
  return (
  <div className="h-full w-screen relative overflow-x-hidden">
    <div className="h-full w-full lg:hidden absolute bg-[#18181B] z-50 flex items-center justify-center">
  <div className="text-white text-3xl md:text-4xl font-bold text-center p-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
    <h2 className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Please use a desktop or larger screen to continue.💻</h2>
  </div>
</div>
    <div className="main w-full bg-[#18181B] ">
      
      <Navbar />
      <Work />
      <Cards />
      <Products />
      <Marquees />
      <Tabs />
      <Footer />
    </div>
  </div>
   
  )
}

export default App