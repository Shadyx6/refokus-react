import React from 'react'

function Marque(imageSrcs) {
  console.log(imageSrcs)
  return (
    <>
    <div className="flex w-full p-2 overflow-hidden mt-20">
    <div style={{height: '26px', width: '150px'}} className="flex gap-20">
      {imageSrcs.src.map((src, i) => (<img className='' key={i} src={src} />))}
      {imageSrcs.src.map((src, i) => (<img className='' key={i} src={src} />))}
    </div>
    
    </div>
    
    </>
 
  )
}

export default Marque