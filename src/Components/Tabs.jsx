import React from 'react'
import Tab from './Tab'
function Tabs() {
  return (
    <div className="w-full p-20 flex gap-1">
        <Tab width='basis-1/3' pera={true} title='News & Insights' hover='false' />
        <Tab width='basis-2/3' title='Get in touch' hover='true' />
    </div>
  )
}

export default Tabs