import React from "react";
import "./TrailersList.scss";

function TrailersList({ trailers, filteredTrailerIds }) {
  const [selectedTrailerId, setSelectedTrailerId] = React.useState(null);

  React.useEffect(() => {
    setSelectedTrailerId(null);
  }, [trailers, filteredTrailerIds]);

  const handleTrailerCardSelected = function (event) {
    if (event.target.dataset.trailerid !== undefined) {
      setSelectedTrailerId(event.target.dataset.trailerid);
    }
  };

  return (
    <div id="trailersListContainer" onClick={handleTrailerCardSelected}>
      {filteredTrailerIds.map((trailerId, index) => (
        <div
          className={`trailerCard ${
            trailerId === selectedTrailerId ? "trailerCardSelected" : ""
          }`}
          key={`trailer-card-${trailerId}`}
          data-trailerid={trailerId}
        >
          <div className="trailerCardHeader">
            <div className="forTrailerImage"></div>
            <div className="dateDisplay">
              <div>
                {trailers[trailerId].DispReleaseDate.substring(
                  0,
                  3
                ).toLowerCase()}
              </div>
              <div>
                {trailers[trailerId].DispReleaseDate.slice(-4).toLowerCase()}
              </div>
            </div>
            <div className="playCircle">
              <div className="playTriangle"></div>
            </div>
          </div>
          <div className="trailerName">{trailers[trailerId].EventTitle}</div>
        </div>
      ))}
    </div>
  );
}

export default TrailersList;
