import React from "react";
import Btn from "./Btn";
function Navbar() {
  const tags = ["Home", "Work", "Careers", "", "News"];
  return (
    <>
      <div className="flex justify-between py-8 items-center px-6 max-w-screen-xl mx-auto text-white border-b-[1px]  border-b-gray-700">
        <div className="flex ">
          <img
            src="https://assets-global.website-files.com/6334198f239547d0f9cd84b3/63349803431f1562dccf1802_refokus%20logo.svg"
            alt=""
          />
          <div className="flex gap ml-12 text-sm gap-10">
          {tags.map((tag, i) => (
            <a
              className="flex items-center justify-center gap-1"
              key={i}
              href=""
            >
              {i === 3 && <span className="w-[.5px] h-5 bg-gray-600"> </span>}
              {i === 1 && (
                <span
                  style={{ boxShadow: "0 0 0.45em #00FF19" }}
                  className="w-[6px] h-[6px] inline-block rounded-full bg-green-700"
                ></span>
              )}
              {tag}
            </a>
          ))}
          
        </div>
        </div>
        <Btn />
      </div>
    </>
  );
}

export default Navbar;
