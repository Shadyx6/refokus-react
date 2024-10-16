import React from "react";
import { IoIosReturnRight } from "react-icons/io";

function Btn({value="Get Started"}) {
  return <button className="py-2 px-4 min-w-32 max-w-32 rounded-full flex justify-between bg-white">
    <span className="text-xs font-bold text-black">{value}</span>
    <IoIosReturnRight color="black" />
  </button>;
}

export default Btn;
