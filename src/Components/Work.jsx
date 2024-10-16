import React from "react";

function Work() {
  const images = [
    {
      src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef09178195ce0073e38f3_Refokus%20Tools-1.png",
      top: "50%",
      left: "50%",
      isActive: 'false'
    },
    {
        src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0accfe1b3e66bc55462_Refokus%20Tools.png",
        top: "54%",
        left: "45%",
        isActive: 'false'
      },
      {
        src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0acbc45cb2f4fc5c6b2_Yahoo.png",
        top: "42%",
        left: "54%",
            isActive: 'false'
      },
      {
        src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef092455ce2cf591e52d1_Rainfall.png",
        top: "55%",
        left: "47%",
            isActive: 'false'
      },
      {
        src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0ac7e7179d210dc41f0_Summon.png",
        top: "40%",
        left: "40%",
            isActive: 'false'
      },
      {
        src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0af108a465002975acd_Showcase%20Websites%20(1).png",
        top: "60%",
        left: "58%",
        isActive: 'false'
      },
     
  ];

  return (
    <div className="w-full relative text-white items-center flex ">
      <h1 className="text-[60vh] font-semibold tracking-tight mx-auto">Work</h1>
      <div className="w-full h-full absolute top-0">
      {images.map((image, i) => (!image.isActive && <img src={image.src} style={{top: image.top, left: image.left}} className={`h-52 w-52 rounded-lg absolute -translate-x-1/2 -translate-y-1/2`} key={i} />))}
      </div>
    </div>
  );
}

export default Work;
