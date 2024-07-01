"use client";
import React, { useState, useEffect } from "react";
import Data from "@/data/tableData.json";
import { FaFilter } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import { TbFilterOff } from "react-icons/tb";

const ProductTable = ({ resultCount }) => {
  const [showFilter, setShowFilter] = useState(0);
  const [filters, setFilters] = useState([]);
  const [filterSelected, setFilterSelected] = useState(true);
  const [filteredData, setFilteredData] = useState(Data.products);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterClick = () => {
    handleAddFilter();
  };

  const handleAddFilter = () => {
    setFilters([
      ...filters,
      { id: filters.length, type: "", options: [], selectedOption: "" },
    ]);
  };

  const handleCheckboxChange = (event, id, type) => {
    setShowFilter(1);
    const updatedFilters = filters.map((filter) =>
      filter.id === id
        ? { ...filter, type: type, options: getFilterOptions(type) }
        : filter
    );
    setFilters(updatedFilters);
  };

  const getFilterOptions = (filterType) => {
    if (filterType === "category") {
      return [...new Set(Data.products.map((product) => product.category))];
    } else if (filterType === "price") {
      return ["0-100", "101-500", "501-1000"];
    } else {
      return [];
    }
  };

  const handleFilterOptionChange = (event, id) => {
    const option = event.target.value;
    const updatedFilters = filters.map((filter) =>
      filter.id === id ? { ...filter, selectedOption: option } : filter
    );
    setFilters(updatedFilters);
  };

  const applyFilters = () => {
    let filtered = Data.products;

    filters.forEach((filter) => {
      if (filter.type === "category" && filter.selectedOption) {
        filtered = filtered.filter(
          (product) => product.category === filter.selectedOption
        );
      } else if (filter.type === "price" && filter.selectedOption) {
        const [min, max] = filter.selectedOption.split("-").map(Number);
        filtered = filtered.filter(
          (product) => product.price >= min && product.price <= max
        );
      }
    });

    setFilteredData(filtered);
  };

  return (
    <div className="container">
      <h1 className="text-3xl">Product List</h1>
      <div className="sticky flex items-center my-7 border-b pb-4 top-0 bg-black py-2 ">
        <FaFilter
          onClick={handleFilterClick}
          className={`cursor-pointer text-white ${
            filterSelected && showFilter === 0 ? "block" : "hidden"
          }`}
        />

        <div className="flex flex-col text-white">
          <div className="flex gap-2 items-center">
            {filterSelected &&
              filters.map((filter) => (
                <div
                  key={filter.id}
                  className="flex gap-2 items-center relative"
                >
                  {!filter.type ? (
                    <div
                      className={`flex flex-col gap-2 border border-gray-400 rounded p-5 mt-2 absolute ${
                        !showFilter ? "left-0" : "right-0"
                      } top-4`}
                    >
                      <p className="text-gray-400">Apply Filters</p>
                      <div className="flex gap-2 text-gray-200 flex-col">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${filter.id}`}
                            onChange={(e) =>
                              handleCheckboxChange(e, filter.id, "category")
                            }
                          />
                          <label
                            htmlFor={`category-${filter.id}`}
                            className="ml-2"
                          >
                            Category
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`price-${filter.id}`}
                            onChange={(e) =>
                              handleCheckboxChange(e, filter.id, "price")
                            }
                          />
                          <label
                            htmlFor={`price-${filter.id}`}
                            className="ml-2"
                          >
                            Price
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <div className="relative border border-white  w-[200px]">
                        <div className="text-white text-[11px] bg-black bottom-8 absolute left-2 px-2">
                          {filter.type.charAt(0).toUpperCase() +
                            filter.type.slice(1)}
                        </div>
                        <div
                          className="text-white bg-black bottom-8 absolute right-4 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilters(
                              filters.filter((f) => f.id !== filter.id)
                            );
                            if (filters.length === 1) {
                              setShowFilter(0);
                            }
                          }}
                        >
                          <RxCrossCircled />
                        </div>
                        <select
                          onChange={(e) =>
                            handleFilterOptionChange(e, filter.id)
                          }
                          className="bg-transparent text-white relative border-none outline-none w-[98%] pr-4"
                        >
                          <option
                            value=""
                            className="bg-black text-white"
                          ></option>
                          {filter.options.map((option, index) => (
                            <option
                              key={index}
                              value={option}
                              className="bg-black text-white py-3"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <FiPlus
                        onClick={handleAddFilter}
                        className="cursor-pointer text-white"
                      />
                    </div>
                  )}
                </div>
              ))}
            {showFilter && filters.length > 0 && (
              <section className="flex items-center gap-3">
                <TbFilterOff
                  onClick={() => {
                    setShowFilter(0);
                    setFilters([]);
                    setFilteredData(Data.products); 
                  }}
                  className="cursor-pointer text-white"
                />
                <p>Showing {filteredData.length} records</p>
              </section>
            )}
          </div>
        </div>

        <div
          onClick={() => setFilterSelected(!filterSelected)}
          className="text-white absolute right-4 border-b border-white cursor-default"
        >
          {filterSelected ? "Hide Filters" : "Show Filters"}
        </div>
      </div>
      <div className="container grid place-content-center ">
        <table className="product-table w-[60vw] p-4 border ">
          <thead className="text-left p-4 border bg-gray-800">
            <tr>
              <th className="border px-2">ID</th>
              <th className="border px-2">Name</th>
              <th className="border px-2">Category</th>
              <th className="border px-2">Price</th>
              <th className="border px-2">Brand</th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((product) => (
                <tr key={product.id}>
                  <td className="px-2 border">{product.id}</td>
                  <td className="px-2">{product.name}</td>
                  <td className="px-2">{product.category}</td>
                  <td className="px-2">${product.price}</td>
                  <td className="px-2">{product.brand}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
