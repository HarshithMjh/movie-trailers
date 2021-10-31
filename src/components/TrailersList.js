import React from "react";
import TrailerExplore from "./TrailerExplore";
import LazyImageRenderer from "../utils/LazyImageRenderer";
import "./TrailersList.scss";

function TrailersList({ trailers, filteredTrailerIds }) {
  const [selectedTrailer, setSelectedTrailer] = React.useState({});

  const trailerContainerRef = React.useRef();
  const trailerVideoSectionRef = React.useRef();

  React.useEffect(() => {
    setSelectedTrailer({});
  }, [trailers, filteredTrailerIds]);

  const handleTrailerCardSelected = function (event) {
    //verify the clicked target is a trailer card using dataset
    if (event.target.dataset.trailerid !== undefined) {
      findOrderOfTrailerVideo(event.target.dataset.trailerid);
    }
    event.stopPropagation();
  };

  const findOrderOfTrailerVideo = function (trailerId) {
    //We need to show the trailer video on a row above the selected trailer
    //we are achieving it using flex order CSS propery
    //Each trailer card has its index as flex order
    //Find the flex order for the trailer section to be shown, based on the number of trailers per row
    let numberOfTrailersPerRow = Math.floor(
      (trailerContainerRef.current.clientWidth - 20) / 204
    );
    let selectedTrailerIndex = filteredTrailerIds.indexOf(trailerId);
    setSelectedTrailer({
      trailerId: trailerId,
      trailerVideoOrder:
        Math.floor(selectedTrailerIndex / numberOfTrailersPerRow) *
        numberOfTrailersPerRow
    });
  };

  React.useEffect(() => {
    if (selectedTrailer.trailerId !== undefined) {
      trailerVideoSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selectedTrailer]);

  return (
    <div
      id="trailersListContainer"
      //Use a single event handler on parent, to identify the click on trailer card
      onClick={handleTrailerCardSelected}
      ref={trailerContainerRef}
    >
      {selectedTrailer.trailerId !== undefined && (
        //We need to show the trailer video on a row above the selected trailer
        //we are achieving it using flex order CSS propery
        //Each trailer card has its index as flex order
        <div
          className="trailerVideoSection"
          key={`trailer-video-${selectedTrailer.trailerId}`}
          style={{
            order: selectedTrailer.trailerVideoOrder
          }}
          ref={trailerVideoSectionRef}
        >
          <TrailerExplore
            trailerDetails={trailers[selectedTrailer.trailerId]}
          />
        </div>
      )}
      {filteredTrailerIds.map((trailerId, index) => (
        <div
          className={`trailerCard ${
            trailerId === selectedTrailer.trailerId ? "trailerCardSelected" : ""
          }`}
          key={`trailer-card-${trailerId}`}
          //dataset is needed to identify the target when click event occurs
          data-trailerid={trailerId}
          style={{ order: index }}
        >
          <div className="trailerCardHeader">
            <div className="forTrailerImage">
              <LazyImageRenderer
                id={trailerId}
                //observed scenario where 'EventImageUrl' key is not present in API response
                url={trailers[trailerId].EventImageUrl || ""}
                altText={trailers[trailerId].EventTitle}
              />
            </div>
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
