import React from "react";
import { CImage } from "@coreui/react";

export default function ImgRenderer(props) {
  const { className, onClick, src, width, height, description, objectFit } =
    props;
  return (
    <>
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
    </>
  );
}
