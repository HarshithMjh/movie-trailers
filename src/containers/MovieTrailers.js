import React from "react";
import "./MovieTrailers.scss";

function MovieTrailers(props) {
  const [trailers, setTrailers] = React.useState({});
  const [languages, setLanguages] = React.useState([]);

  React.useEffect(function () {
    fetch("https://peaceful-forest-62260.herokuapp.com/")
      .then((res) => res.json())
      .then((response) => {
        setTrailers(response.languageList);
        setLanguages(response.moviesData);
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to fetch trailers list");
      });
  }, []);

  return (
    <div id="movieTrailersContainer">
      <div id="movieTrailersHeaderSection">Header</div>
      <div id="movieTrailersBodySection">Body</div>
    </div>
  );
}

export default MovieTrailers;
