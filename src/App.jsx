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
    <div className="main w-full bg-[#18181B] ">
      <Navbar />
      <Work />
      <Cards />
      <Products />
      <Marquees />
      <Tabs />
      <Footer />
    </div>
   
  )
}

export default App