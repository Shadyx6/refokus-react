import React from 'react'
import Product from './Product'

function Products() {
    const data = [
        {name: 'Cula', isCase: false, desc: "We immersed ourselves in a 3D world we created to explain how Cula's platform collects data from carbon removal processes and converts them into carbon credit certificates."},
        {name: 'Layout Land', isCase: false, desc: "An interactive learning game that can educate and entertain you on the basics of web layouts in Webflow."},
        {name: 'Umault', isCase: false, desc: "Bold visuals, a new typeface, iconography, and custom motion graphics were at the core of our collaboration with Umault, building a website that matches their excellence in B2B video production."},
        {name: 'TTR AI', isCase: true, desc: "We've created an interactive site using generative AI to allow users to engage with our thinking about Ai, industry trends and design."},
        {name: 'Layout Land', isCase: true, desc: "We designed and developed a magical gaming experience made in Webflow to promote the translation service and their sponsorship of the 2022 Webflow Conference."}
    ]
  return (
    <>
    <div className="w-full relative mt-10">
        {data.map((prod, i) => (<Product key={i} data={prod}  />))}
    </div>
    </>
  )
}

export default Products