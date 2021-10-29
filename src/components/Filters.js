import React from "react";
import "./Filters.scss";

function Filters(trailers, languages) {
  return (
    <div id="filtersContainer">
      <div id="headerFilters">
        <div id="appLogo">Movie Trailers</div>
        <div id="filterDropdowns">
          <div className="dropdownContainer"></div>
          <div className="dropdownContainer"></div>
        </div>
      </div>
      <div id="selectedFilters"></div>
    </div>
  );
}

export default Filters;
