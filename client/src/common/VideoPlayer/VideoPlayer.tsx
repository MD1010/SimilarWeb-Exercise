import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
// import YouTube from "react-youtube";
import { MuteButton } from "../../components/shared/Mute";
import { IVideo } from "../../interfaces/Video";

interface VideoPlayerProps {
  playingVideo: IVideo | undefined;
  onVideoEnded: () => void;
  isPlaylistEnded?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ playingVideo, onVideoEnded, isPlaylistEnded }) => {
  const [isMuted, setIsMuted] = useState(true);
  // };
  return (
    <div style={{}}>
      {!isPlaylistEnded ? <MuteButton isMuted={isMuted} setIsMuted={setIsMuted} /> : null}
      <ReactPlayer
        // onBuffer={() => console.log("buffering")}
        // onSeek={() => console.log(0)}
        onEnded={onVideoEnded}
        playing
        muted={isMuted}
        url={`https://www.youtube.com/watch?v=${playingVideo?.videoId}&showinfo=0`}
      />
    </div>
  );
};
