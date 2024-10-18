import React, { useEffect, useState } from "react";
import { motion, progress, useScroll } from "framer-motion";
function Work() {
  const [images, setImages] = useState([
    {
      src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef09178195ce0073e38f3_Refokus%20Tools-1.png",
      top: "50%",
      left: "50%",
      isActive: false,
    },
    {
      src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0accfe1b3e66bc55462_Refokus%20Tools.png",
      top: "54%",
      left: "45%",
      isActive: false,
    },
    {
      src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0acbc45cb2f4fc5c6b2_Yahoo.png",
      top: "42%",
      left: "54%",
      isActive: false,
    },
    {
      src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef092455ce2cf591e52d1_Rainfall.png",
      top: "55%",
      left: "47%",
      isActive: false,
    },
    {
      src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0ac7e7179d210dc41f0_Summon.png",
      top: "40%",
      left: "40%",
      isActive: false,
    },
    {
      src: "https://assets-global.website-files.com/6334198f239547d0f9cd84b3/634ef0af108a465002975acd_Showcase%20Websites%20(1).png",
      top: "60%",
      left: "58%",
      isActive: false,
    },
  ]);
  const ShowImage = (arr) => {
    console.log(arr);
    setImages((prev) =>
      prev.map((item, index) =>
        arr.indexOf(index) === -1
          ? { ...item, isActive: false }
          : { ...item, isActive: true }
      )
    );
  };
  const { scrollYProgress } = useScroll();
  scrollYProgress.on("change", (progress) => {
    switch (Math.floor(progress * 100)) {
      case 0:
        ShowImage([]);
        break;
      case 1:
        ShowImage([0]);
        break;
      case 2:
        ShowImage([0, 1]);
        break;
      case 3:
        ShowImage([0, 1, 2]);
        break;
      case 4:
        ShowImage([0, 1, 2, 3]);
        break;
      case 5:
        ShowImage([0, 1, 2, 3, 4]);
        break;
      case 6:
        ShowImage([0, 1, 2, 3, 4, 5]);
        break;

      case 7:
        ShowImage([0, 1, 2, 3, 4, 5, 6]);
        break;
      case 8:
        ShowImage([0, 1, 2, 3, 4, 5, 6, 7]);
    }
  });

  return (
    <div className="w-full relative text-white items-center flex ">
      <h1 className="text-[60vh] font-semibold tracking-tight mx-auto">Work</h1>
      <div className="w-full h-full absolute top-0">
        {images.map(
          (image, i) =>
            image.isActive && (
              <img
                src={image.src}
                style={{ top: image.top, left: image.left }}
                className={`h-52 w-52 rounded-lg absolute -translate-x-1/2 -translate-y-1/2`}
                key={i}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Work;
