import React from 'react'
import Navbar from './Components/Navbar'
import Work from './Components/Work'
import Cards from './Components/Cards'
import Products from './Components/Products'
import Marquees from './Components/Marquees'


function App() {
  return (
    <div className="main w-full bg-[#18181B]">
      <Navbar />
      <Work />
      <Cards />
      <Products />
      <Marquees />
    </div>
   
  )
}

export default App