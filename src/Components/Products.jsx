import React, { useState } from 'react'
import Product from './Product'
import { motion } from 'framer-motion'
import Cula from '../assets/Videos/cula.webm'
import Yir from '../assets/Videos/yir.webm'
import Ttr from '../assets/Videos/ttr.webm'
import LayoutLand from '../assets/Videos/layoutland.webm'
import Umault from '../assets/Videos/umault.webm'

function Products() {
    const data = [
        {name: 'Cula', isCase: false, desc: "We immersed ourselves in a 3D world we created to explain how Cula's platform collects data from carbon removal processes and converts them into carbon credit certificates."},
        {name: 'Layout Land', isCase: false, desc: "An interactive learning game that can educate and entertain you on the basics of web layouts in Webflow."},
        {name: 'Umault', isCase: false, desc: "Bold visuals, a new typeface, iconography, and custom motion graphics were at the core of our collaboration with Umault, building a website that matches their excellence in B2B video production."},
        {name: 'TTR AI', isCase: true, desc: "We've created an interactive site using generative AI to allow users to engage with our thinking about Ai, industry trends and design."},
        {name: 'YIR 2022', isCase: true, desc: "We designed and developed a magical gaming experience made in Webflow to promote the translation service and their sponsorship of the 2022 Webflow Conference."}
    ]
    const [pos, setPos] = useState(0)
    const mover = (val) => {
      setPos(val * 23)
    }
  return (
    <>
    <div className="w-full relative mt-10">
      <div className="w-full h-full absolute top-0 pointer-events-none">
      <motion.div initial={{y: pos}} animate={{y: pos + 'rem'}} className="h-[23rem] w-1/3  absolute flex-col  rounded-lg ml-[26rem] overflow-hidden">
        <motion.div animate={{y: -pos + 'rem' }} className="h-full w-full rounded-lg">
          <video autoPlay muted className='h-full w-full object-cover' src={Cula}></video>
        </motion.div>
        <motion.div animate={{y: -pos + 'rem'}} className="h-full w-full rounded-lg ">
        <video autoPlay muted className='h-full w-full object-cover' src={LayoutLand}></video>
        </motion.div>
        <motion.div animate={{y: -pos + 'rem'}} className="h-full w-full rounded-lg">
        <video autoPlay muted className='h-full w-full object-cover' src={Umault}></video>
        </motion.div>
        <motion.div animate={{y: -pos + 'rem'}} className="h-full w-full rounded-lg ">
        <video autoPlay muted className='h-full w-full object-cover' src={Ttr}></video>
        </motion.div>
        <motion.div animate={{y: -pos + 'rem'}} className="h-full w-full rounded-lg ">
        <video autoPlay muted className='h-full w-full object-cover' src={Yir}></video>
        </motion.div>
      </motion.div>
      </div>
        {data.map((prod, i) => (<Product key={i} data={prod} mover={mover}  index={i} />))}
    </div>
    </>
  )
}

export default Products