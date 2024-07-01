import SliderData from "@/data/slider.json";

const CardCarousel = ({ selectedItem, index, handleRadioChange }) => {
  const cardStyle = () => { 
    if (index === selectedItem) {
      return "translate-x-0 scale-100 opacity-100 z-10";
    } else if (index === (selectedItem + 1) % SliderData.length) {
      return "translate-x-1/3 scale-75 opacity-40 z-0";
    } else if (
      index ===
      (selectedItem - 1 + SliderData.length) % SliderData.length
    ) {
      return "-translate-x-1/3 scale-75 opacity-40 z-0";
    } else {
      return "hidden";
    }
  };

  return (
    <div
      className={`card absolute w-3/5 h-full transition-transform duration-400 cursor-pointer ${cardStyle()}`}
      onClick={() => handleRadioChange(index)}
    >
      <img
        src={SliderData[index].image}
        alt={SliderData[index].name}
        className="w-full h-full object-cover rounded-lg relative"
      />
      <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-[#000000c3] to-transparent text-white w-full rounded-b-lg pb-10">
        <h2 className="text-lg font-semibold">{SliderData[index].name}</h2>
        <p className="text-sm  font-thin">{SliderData[index].description}</p>
        <a
          href={SliderData[index].wikipedia}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-[#c6c6c6] text-blue-950 py-1 rounded-2xl text-sm font-semibold hover:bg-blue-950 hover:text-white transition-colors duration-300 px-4"
        >
          EXPLORE
        </a>
      </div>
    </div>
  );
};

export default CardCarousel;
