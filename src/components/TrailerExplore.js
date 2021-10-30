import "./TrailerExplore.scss";

function TrailerExplore({ trailerDetails }) {
  return (
    <div className="trailerExploreContainer">
      <div className="forTrailerVideo">
        <iframe
          src={`https://www.youtube.com/embed/${
            trailerDetails.TrailerURL.split(/v=|&/)[1]
          }?autoplay=1`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="100%"
          height="100%"
        />
      </div>
      <div className="forTrailerDetails"></div>
    </div>
  );
}

export default TrailerExplore;
