import React, { useState } from "react";
import Select from "./Select";
import { Chip } from "@material-tailwind/react";

function MultiSelect({ 
  filters, 
  arrowDownIcon, 
  cancelIcon,
  selectStyles,
  dropdownStyles,
  chipStyles
}) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleRemoveFilter = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter(
        (item) => item.value !== filter.value || item.filter !== filter.filter
      )
    );
  };

  return (
    <div>
      <div className="flex space-x-4">
        {filters.map((filter, index) => (
          <Select
            key={index}
            text={filter.text}
            options={filter.options}
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            arrowDownIcon={arrowDownIcon}
            cancelIcon={cancelIcon}
            selectStyles={selectStyles}
            dropdownStyles={dropdownStyles}
          />
        ))}
      </div>
      <div className="flex flex-wrap mt-4">
        {selectedFilters.map((filter, index) => (
          <Chip
            key={index}
            className={`${chipStyles}`}
            value={filter.label}
            onClose={() => handleRemoveFilter(filter)}
          />
        ))}
      </div>
    </div>
  );
}

export default MultiSelect;
