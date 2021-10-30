import React from "react";
import Filters from "../components/Filters";
import TrailersList from "../components/TrailersList";
import "./MovieTrailers.scss";

function MovieTrailers(props) {
  const [trailers, setTrailers] = React.useState({});
  const [languages, setLanguages] = React.useState([]);
  const [filteredTrailerIds, setFilteredTrailerIds] = React.useState([]);

  React.useEffect(function () {
    fetch("https://peaceful-forest-62260.herokuapp.com/")
      .then((res) => res.json())
      .then((response) => {
        setTrailers(response.moviesData);
        setLanguages(response.languageList.sort());
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to fetch trailers list");
      });
  }, []);

  return (
    <div id="movieTrailersContainer">
      <div id="movieTrailersHeaderSection">
        <Filters
          trailers={trailers}
          languages={languages}
          setFilteredTrailerIds={setFilteredTrailerIds}
        />
      </div>
      <div id="movieTrailersBodySection">
        <TrailersList
          trailers={trailers}
          filteredTrailerIds={filteredTrailerIds}
        />
      </div>
    </div>
  );
}

export default MovieTrailers;
