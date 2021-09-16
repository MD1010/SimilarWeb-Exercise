import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
// import YouTube from "react-youtube";
import { MuteButton } from "../../components/shared/Mute";

interface VideoPlayerProps {
  playingVideoId: string | undefined;
  onVideoEnded: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ playingVideoId, onVideoEnded }) => {
  const [isMuted, setIsMuted] = useState(true);

  // };
  return (
    <div style={{}}>
      <MuteButton isMuted={isMuted} setIsMuted={setIsMuted} />
      <ReactPlayer
        // onBuffer={() => console.log("buffering")}
        // onSeek={() => console.log(0)}
        onEnded={onVideoEnded}
        playing
        muted={isMuted}
        url={`https://www.youtube.com/watch?v=${playingVideoId}&showinfo=0`}
      />
    </div>
  );
};
