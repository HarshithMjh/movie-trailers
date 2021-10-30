import React from "react";
import { useIntersection } from "./IntersectionObserver";
import "./LazyImageRenderer.scss";

function LazyImageRenderer({ id, url, altText }) {
  const [isInView, setIsInView] = React.useState(false);
  const [isImageNotAvailable, setIsImageNotAvailable] = React.useState(false);
  const imgRef = React.useRef();

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  return (
    <div
      className="lazyImageRendererContainer"
      id={`lazy-image-${id}`}
      ref={imgRef}
    >
      {isInView && !isImageNotAvailable && (
        <img
          className="lazyImage"
          src={url}
          alt={altText}
          onError={() => setIsImageNotAvailable(true)}
        />
      )}
      {isImageNotAvailable && <div className="lazyImageNotAvailable"></div>}
    </div>
  );
}

export default LazyImageRenderer;
