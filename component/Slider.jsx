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
      <div className="relative w-full h-96 mb-5">
        <div className="relative h-full">
          {SliderData.map((_, index) => (
            <CardCarousel
              key={index}
              selectedItem={selectedItem}
              index={index}
              handleRadioChange={handleRadioChange}
            />
          ))}
        </div>
        {SliderData.map((_, index) => (
          <input
            key={index}
            type="radio"
            name="slider"
            className="h-3 w-3 accent-[grey] "
            id={`item-${index}`}
            checked={selectedItem === index}
            onChange={() => handleRadioChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
