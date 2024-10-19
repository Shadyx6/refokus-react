import { motion } from 'framer-motion'
import { line } from 'framer-motion/client'
import React, { useEffect, useRef, useState } from 'react'
function Marque({imageSrcs, index}) {
  let boxRef = useRef(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if(boxRef.current)
      console.log(boxRef.current.scrollWidth)
      setWidth(boxRef.current.scrollWidth)
  }, [])
  return (
    <>
    <div className="flex w-full p-2 overflow-hidden mt-20">
    <motion.div ref={boxRef}  initial={{x: index === 0 ? 0 : '-1500.5px'}} animate={{x: index === 0 ? - width / 2 : 0}} transition={{ease: 'linear', duration: 10, repeat: Infinity, repeatType: 'loop'}} style={{height: '26px', width: '150px'}} className="flex gap-20">
      {imageSrcs.map((src, i) => (<img className='' key={i} src={src} />))}
      {imageSrcs.map((src, i) => (<img className='' key={i} src={src} />))}
    </motion.div>
    
    </div>
    
    </>
 
  )
}

export default Marque