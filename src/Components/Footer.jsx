import React from 'react'

function Footer() {
  return (
   <>
     <div className="w-full flex p-16 px-20 text-white">
        <div className="basis-1/2 text-center">
        <h1 className='text-[10rem] font-bold'>refokus.</h1></div>
        <div className="basis-1/2 flex items-center  justify-between">
        <div className="flex flex-col ml-10">
            <h1 className='text-gray-300 mb-9'>Socials</h1>
       { ["Instagram", "Twitter (X)", "LinkedIn"].map((soc, i) => <p className='mt-2 text-gray-600 whitespace-nowrap' key={i}>{soc}</p>)}
        </div>
        <div className="flex flex-col ml-10 ">
            <h1 className='text-gray-300 mb-9'>About</h1>
       { ["Privacy Policy", "Contact us", "Brand"].map((soc, i) => <p className='mt-2 text-gray-600 whitespace-nowrap' key={i}>{soc}</p>)}
        </div>
        <div className="flex flex-col ml-10 items-end">
            <p className='mb-8 text-md text-gray-200 w-56 text-right'>Refokus is pioneering digital agency driven by design and empowered by technology.</p>
            <img className='w-32 mt-5' src="https://assets-global.website-files.com/5df3de8e749203dc3167a479/65369e818884afbae46a35fc_Webflow-badge.svg" alt="" />
        </div>
        </div>
     </div>
   </>
  )
}

export default Footer