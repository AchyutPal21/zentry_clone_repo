import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { IVideoRef } from "../types/components/IVideo.types";
import Button from "./Button";
import Video from "./Video";

const TOTAL_VIDEOS = 4;
const getNextVideo = (index: number) =>
  `/videos/hero-${index % TOTAL_VIDEOS}.mp4`;

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [userInteraction, setUserInteraction] = useState(false);

  const currentVideoRef = useRef<IVideoRef>(null);
  const nextVideoRef = useRef<IVideoRef>(null);
  const zoomInVideoRef = useRef<IVideoRef>(null);

  function handleMiniVideoClick() {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % TOTAL_VIDEOS) + 1);
  }

  function handleVideoLoadedData() {
    setLoadedVideos((prev) => prev + 1);
  }

  useEffect(() => {
    if (zoomInVideoRef.current) {
      zoomInVideoRef.current.autoPlay();
      zoomInVideoRef.current.muted();
    }
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <Video
                ref={currentVideoRef}
                videoSrc={getNextVideo(currentIndex + 1)}
                videoId="current-video"
                styleClasses="size-64 origin-center scale-150 object-cover object-center"
                onVideoLoaded={handleVideoLoadedData}
                restprops={{ loop: true, muted: true }}
              />
            </div>
          </div>
          <Video
            ref={nextVideoRef}
            videoSrc={getNextVideo(currentIndex)}
            videoId="next-video"
            styleClasses="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onVideoLoaded={handleVideoLoadedData}
            restprops={{ loop: true, muted: true }}
          />
          <Video
            ref={zoomInVideoRef}
            videoSrc={getNextVideo(currentIndex)}
            videoId="zoom-in-video"
            styleClasses="absolute left-0 top-0 size-full object-cover object-center"
            onVideoLoaded={handleVideoLoadedData}
            restprops={{ loop: true, muted: true, autoPlay: true }}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              btnId="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              styleClasses="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
}

export default Hero;
