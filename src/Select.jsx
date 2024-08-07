import React, { useState, useRef } from "react";
import { Checkbox, Typography } from "@material-tailwind/react";

function Select({ 
  text, 
  options, 
  setSelectedFilters, 
  selectedFilters,
  arrowDownIcon,
  cancelIcon,
  selectStyles,
  dropdownStyles
}) {
  const [isOpen, setIsOpen] = useState(false);
  const checkboxRef = useRef(null);

  const handleCheckboxChange = (e, item) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedFilters((prevFilters) => [
        ...(Array.isArray(prevFilters) ? prevFilters : []),
        { label: item.label, value: item.value, filter: text },
      ]);
    } else {
      setSelectedFilters((prevFilters) =>
        (Array.isArray(prevFilters) ? prevFilters : []).filter(
          (filter) => !(filter.value === item.value && filter.filter === text)
        )
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between items-start py-4 sm:pr-10 pr-8">
        <div
          className={`${selectStyles} flex flex-row items-center justify-between px-4 my-4 cursor-pointer`}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          <span className="text-tiny">{text}</span>
          <img src={arrowDownIcon} alt="icon" className="ml-2" />
        </div>
      </div>
      <div className={`${dropdownStyles} ${isOpen ? "flex flex-col" : "hidden"}`}>
        <div className="flex flex-row items-center justify-between p-3">
          <div className="text-start">{text}</div>
          <img
            src={cancelIcon}
            alt="icon"
            className="ml-2"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          {options?.map((item) => (
            <Checkbox
              key={item.value}
              value={item.value}
              checked={(selectedFilters.filter((filterItem) => filterItem.label === item.label)).length ? true : false}
              label={
                <Typography className="text-xs text-tiny">
                  {item.label}
                </Typography>
              }
              ref={checkboxRef}
              onChange={(e) => handleCheckboxChange(e, item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Select;
