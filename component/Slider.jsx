"use client";
import React, { useState } from "react";
import CardCarousel from "./CardCarousel";
import SliderData from "@/data/slider.json";

const Slider = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const handleRadioChange = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container mx-auto max-w-xl relative ">
      <div className="relative w-full h-96 mb-5 ">
        <div className="relative h-full flex items-center justify-center">
          {SliderData.map((_, index) => (
            <CardCarousel
              key={index}
              selectedItem={selectedItem}
              index={index}
              handleRadioChange={handleRadioChange}
            />
          ))}
        </div>
        <div className="w-full flex justify-center items-center index">
          {SliderData.map((_, index) => (
            <input
              key={index}
              type="radio"
              name="slider"
              className="h-2 w-2 relative bottom-8 z-30 accent-gray-100 text-gray-100  mx-1 focus:ring-0 focus:outline-none cursor-pointer transition-colors duration-300 hover:scale-125 hover:text-gray-100 bg-slate-600"
              id={`item-${index}`}
              checked={selectedItem === index}
              onChange={() => handleRadioChange(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
