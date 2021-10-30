import React from "react";
import MultiselectDropdown from "../formElements/MultiSelectDropdown";
import Chip from "@mui/material/Chip";
import { genres } from "../configs";
import "./Filters.scss";

function Filters({ trailers, languages, setFilteredTrailerIds }) {
  const [selectedLanguages, setSelectedLanguages] = React.useState([]);
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  React.useEffect(
    function () {
      let filteredTrailerIds = [];
      let selectedLanguagesLength = selectedLanguages.length;
      let selectedGenresLength = selectedGenres.length;
      if (selectedLanguagesLength === 0 && selectedGenresLength === 0) {
        setFilteredTrailerIds(Object.keys(trailers));
        return;
      }
      Object.keys(trailers).forEach((trailerId) => {
        if (
          selectedLanguagesLength > 0 &&
          !selectedLanguages.includes(trailers[trailerId].EventLanguage)
        ) {
          return;
        }
        if (
          selectedGenresLength > 0 &&
          selectedGenres.findIndex((selectedGenre) =>
            trailers[trailerId].EventGenre.includes(selectedGenre)
          ) === -1
        ) {
          return;
        }
        filteredTrailerIds.push(trailerId);
      });
      setFilteredTrailerIds(filteredTrailerIds);
    },
    [trailers, selectedLanguages, selectedGenres, setFilteredTrailerIds]
  );

  const deleteFilter = (setterFunction, index) => {
    setterFunction((prevState) => {
      let prevValues = [...prevState];
      prevValues.splice(index, 1);
      return [...prevValues];
    });
  };

  return (
    <div id="filtersContainer">
      <div id="headerFilters">
        <div id="appLogo">Movie Trailers</div>
        <div id="filterDropdowns">
          <div className="dropdownContainer">
            <MultiselectDropdown
              id="filter-languages"
              label="Languages"
              emptyValue="All Languages"
              options={languages}
              value={selectedLanguages}
              onChange={setSelectedLanguages}
            />
          </div>
          <div className="dropdownContainer">
            <MultiselectDropdown
              id="filter-genres"
              label="Genres"
              emptyValue="All Genres"
              options={genres}
              value={selectedGenres}
              onChange={setSelectedGenres}
            />
          </div>
        </div>
      </div>
      <div id="selectedFilters">
        {(selectedLanguages.length > 0 || selectedGenres.length > 0) && (
          <React.Fragment>
            <div className="appliedFiltersText">Applied Filters:</div>
            {selectedLanguages.map((language, index) => (
              <div>
                <Chip
                  label={language}
                  size="small"
                  className="filterChip"
                  onDelete={() => deleteFilter(setSelectedLanguages, index)}
                />
              </div>
            ))}
            {selectedGenres.map((genre, index) => (
              <div>
                <Chip
                  label={genre}
                  size="small"
                  className="filterChip"
                  onDelete={() => deleteFilter(setSelectedGenres, index)}
                />
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Filters;
