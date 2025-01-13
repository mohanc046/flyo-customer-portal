import { useRef, useState } from "react";

const VideoComponent = (props) => {
  const {
    width = "100%",
    height = "100%",
    src,
    showControls,
    loop,
    autoPlay,
    muted,
    styles,
    onClickHandler,
    className,
  } = props;

  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWaiting = () => setIsLoading(true);

  const handleCanPlay = () => setIsLoading(false);

  const handleLoadedData = () => setIsLoading(false);

  return (
    <div   className={className}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid rgba(237, 230, 230, 0.1)",
              borderTop: "4px solid #fff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}
      <video
        className={className}
        width={width}
        ref={videoRef}
        style={{
          ...styles,
          opacity: isLoading ? 0.5 : 1,
          transition: "opacity 0.3s ease",
        }}
        height={height}
        onClick={onClickHandler}
        controls={showControls}
        loop={loop}
        autoPlay={autoPlay}
        muted={muted}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
      >
        <source src={src} type="video/mp4" />
      </video>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default VideoComponent;
