import React from 'react'

function Card({value}) {
  return (
    <div className="w-[16.66%] border-gray-600 flex text-white justify-between items-center px-6 py-6 border-2 border-l-0">
        <img className='w-36' src={value.src} alt="" />
        <h3>{value.num}</h3>
    </div>
  )
}

export default Card