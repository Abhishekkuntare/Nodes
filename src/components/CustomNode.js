import React from "react";
import { Handle } from "react-flow-renderer";
import { FaWhatsapp } from "react-icons/fa";

const CustomNode = ({ data }) => {
  return (
    <>
      <div className="flex items-center mb-2 bg-[#abefe3] rounded-tl-lg rounded-tr-lg shadow-lg p-1">
        <FaWhatsapp className="text-green-500 mr-2 " size={10} />
        <p className="text-xs sm:text-[10px] font-bold">Send Message</p>
      </div>
      <div className="p-4 bg-white shadow-lg border border-gray-100 rounded-lg mt-[-10px] sm:w-[200px]">
        <div className="text-center text-xs sm:text-sm">{data.label}</div>
        <div className="flex justify-between mt-2">
          <Handle type="source" position="right" id="a" className="w-2 h-2" />
          <Handle type="target" position="left" id="b" className="w-2 h-2" />
        </div>
      </div>
    </>
  );
};

export default CustomNode;
