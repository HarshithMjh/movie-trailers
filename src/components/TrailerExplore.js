import calendarSvg from "../images/calendar.svg";
import likeSvg from "../images/like.svg";
import willWatchSvg from "../images/will-watch.svg";
import maybeSvg from "../images/maybe.svg";
import wontWatchSvg from "../images/wont-watch.svg";
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
      <div className="forTrailerDetails">
        <div className="trailerTitle">{trailerDetails.EventTitle}</div>
        <div className="trailerLanguage">{trailerDetails.EventLanguage}</div>
        <div className="trailerGenres">
          {trailerDetails.EventGenre.split("|").map((genre) => (
            <div className="trailerGenre">{genre}</div>
          ))}
        </div>
        <div className="trailerLikesAndCalendar">
          <div className="svgAndDetailsSection">
            <div className="svgContainer">
              <img src={likeSvg} alt="" />
            </div>
            <div className="detailsContainer">
              <div className="line1">
                {Math.round(
                  (trailerDetails.wtsCount * 100) /
                    (trailerDetails.wtsCount +
                      trailerDetails.maybeCount +
                      trailerDetails.dwtsCount)
                )}
                %
              </div>
              <div className="line2">
                {trailerDetails.wtsCount +
                  trailerDetails.maybeCount +
                  trailerDetails.dwtsCount}{" "}
                votes
              </div>
            </div>
          </div>
          <div className="svgAndDetailsSection">
            <div className="svgContainer">
              <img src={calendarSvg} alt="" />
            </div>
            <div className="detailsContainer">
              <div className="line1">
                {trailerDetails.ShowDate.split(",")[0]}
              </div>
              <div className="line2">
                {trailerDetails.ShowDate.split(" ")[2]}
              </div>
            </div>
          </div>
        </div>
        <div className="trailerText"></div>
        <div className="trailerInterestCounts">
          <CircularCountSection
            text="WILL WATCH"
            count={trailerDetails.wtsCount}
            color="#43ab82"
            icon={willWatchSvg}
          />
          <CircularCountSection
            text="MAYBE"
            count={trailerDetails.maybeCount}
            color="#FEA502"
            icon={maybeSvg}
          />
          <CircularCountSection
            text="WON'T WATCH"
            count={trailerDetails.dwtsCount}
            color="#B24142"
            icon={wontWatchSvg}
          />
        </div>
      </div>
    </div>
  );
}

function CircularCountSection({ text, count, color, icon }) {
  return (
    <div className="circularCountSection" style={{ color: color }}>
      <div className="forCircle" style={{ borderColor: color }}>
        <img src={icon} alt="" />
      </div>
      <div className="forText">{text}</div>
      <div className="forCount">({count})</div>
    </div>
  );
}

export default TrailerExplore;
