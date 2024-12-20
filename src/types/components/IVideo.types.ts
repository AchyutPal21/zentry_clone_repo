export interface IVideoProps {
  videoSrc: string;
  videoId: string;
  styleClasses: string;
  onVideoLoaded?: () => void;
  restprops?: React.ComponentProps<"video">;
}

export interface IVideoRef {
  setLoop: (to: boolean) => void;
  autoPlay: () => void;
  stop: () => void;
  play: () => void;
  pause: () => void;
  muted: () => void;
}
