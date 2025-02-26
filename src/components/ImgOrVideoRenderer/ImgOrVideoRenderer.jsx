import React from "react";
import { CImage } from "@coreui/react";
import VideoComponent from "../VideoComponent/VideoComponent";
import { isImageUrl } from "../../utils/utils";

export default function ImgOrVideoRenderer(props) {
  const {
    className,
    onClick,
    src,
    width,
    height,
    description,
    videoStyles,
    muted = true,
    objectFit,
    showControls,
  } = props;
  return (
    <>
      {isImageUrl(src) ? (
        <CImage
          className={className}
          onClick={onClick}
          src={src}
          width={width}
          height={height}
          alt={description}
          style={{
            objectFit: objectFit,
          }}
        />
      ) : (
        <VideoComponent
          className={className}
          onClickHanlder={onClick}
          src={src}
          showControls={showControls}
          width={width}
          height={height}
          styles={videoStyles}
          autoPlay
          loop
          muted={muted}
        />
      )}
    </>
  );
}
