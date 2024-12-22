import { forwardRef, useImperativeHandle, useRef } from "react";
import { IVideoProps, IVideoRef } from "../types/components/IVideo.types";

const Video = forwardRef<IVideoRef, IVideoProps>(function (
  { videoSrc, videoId, styleClasses, onVideoLoaded, restprops },
  ref
) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    setLoop: (to: boolean) => {
      if (videoRef.current) {
        videoRef.current.loop = to;
      }
    },
    muted() {
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    },
    autoPlay() {
      if (videoRef.current) {
        videoRef.current.autoplay = true;
      }
    },
    stop: () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    },
    play() {
      if (videoRef.current) {
        videoRef.current
          .play()
          .then(() => console.log("video is playing!!!"))
          .catch((error) =>
            console.error(`Error while playing video ${error}`)
          );
      }
    },
    pause() {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
  }));

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      id={videoId}
      className={styleClasses}
      onLoadedData={onVideoLoaded}
      {...restprops}
    />
  );
});

export default Video;
