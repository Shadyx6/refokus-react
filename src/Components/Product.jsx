import React from 'react'
import Btn from './Btn'

function Product({data, mover, index}) {
  return (
    <div onMouseEnter={() => mover(index)} className="h-[23rem] text-white  flex justify-between p-20">
        <h1 className='text-5xl'>{data.name}</h1>
        <div className=" flex flex-col justify-between ">
            <p className='max-w-96 font-semibold'>{data.desc}</p>
            <div className="flex space-x-3">
            <Btn />
            {data.isCase && <Btn value='Case Study' />}
            </div>
        </div>
    </div>

  )
}

export default Product