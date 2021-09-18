import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
// import YouTube from "react-youtube";
import { MuteButton } from "../../components/shared/Mute";
import { IVideo } from "../../interfaces/Video";
import "./player.scss";

interface VideoPlayerProps {
  playingVideo: IVideo | undefined;
  onVideoEnded: () => void;
  isVideoMuted: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ playingVideo, onVideoEnded, isVideoMuted }) => {
  // };
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="player"
        onEnded={onVideoEnded}
        playing
        muted={isVideoMuted}
        url={`https://www.youtube.com/watch?v=${playingVideo?.videoId}&showinfo=0`}
      />
    </div>
  );
};
