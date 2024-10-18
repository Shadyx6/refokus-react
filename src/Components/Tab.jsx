import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import Btn from './Btn';

function Tab({title, pera, width}) {
  return (
    <>
    <div className={` ${width} bg-[#27272A] text-white p-4 rounded-lg flex flex-col justify-between h-[70vh]`}>
       <div className="">
       <div className="flex items-center justify-between">
            <h1>Blog</h1>
            <IoIosArrowRoundForward size={'25px'} color='white' />
        </div>
        <h1 className='text-4xl mt-6'>{title}</h1>
       </div>
       
        <div className="">
        {!pera && <h1 className='text-8xl leading-none tracking-tight whitespace-nowrap mb-10' >Start a Project</h1>}
            {pera ? <p className='text-gray-400 text-xs '>News and Insights on Web Design, Webflow Development, and Creative Development. </p> : <Btn value='Contact us' /> }
        </div>
      
    </div>
    </>
  )
}

export default Tab