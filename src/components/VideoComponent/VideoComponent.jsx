import { useRef } from "react";
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
    onClickHanlder,
    className,
  } = props;
  const videoRef = useRef(null);
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  return (
    <video
      className={className}
      width={width}
      ref={videoRef}
      style={styles}
      height={height}
      onClick={onClickHanlder}
      controls={showControls}
      loop={loop}
      autoPlay={autoPlay}
      muted={muted}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};
export default VideoComponent;
