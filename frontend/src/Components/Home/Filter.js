import React, { useEffect, useState } from "react";
import FilterModal from "./FilterModal";

import { UseDispatch, useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Filter = () => {
  // modal controller
  const [isModalOpen, setIsModalOpen] = useState(false);
  // storing selected filter
  const [selectedFilters, setSelectedFilters] = useState({});

  const dispatch =useDispatch();
  useEffect(() => {
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties());
  }, [selectedFilters,dispatch] );

  // func to handel modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  // func for closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // func for handeling changes in filter
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <>
      {/* clck event to open modal */}
      <span class="material-symbols-outlined filter" onClick={handleOpenModal}>
        tune
      </span>

      {isModalOpen && (
        <FilterModal
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Filter;
