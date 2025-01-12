import React from "react";
import { CImage } from "@coreui/react";
import VideoComponent from "../VideoComponent/VideoComponent";
import { isImageUrl } from "../../utils/utils";

export default function ImgOrVideoRenderer(props) {
  const { className, onClick, src, width, height, description, videoStyles } =
    props;
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
        />
      ) : (
        <VideoComponent
          className={className}
          onClickHanlder={onClick}
          src={src}
          width={width}
          height={height}
          styles={videoStyles}
          autoPlay
          loop
          muted
        />
      )}
    </>
  );
}
