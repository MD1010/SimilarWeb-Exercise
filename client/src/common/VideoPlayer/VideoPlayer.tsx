import React from "react";
import ReactPlayer from "react-player";
import { IVideo } from "../../interfaces/Video";
import "./player.scss";

interface VideoPlayerProps {
  playingVideo: IVideo | undefined;
  onVideoEnded: () => void;
  isVideoMuted: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ playingVideo, onVideoEnded, isVideoMuted }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="player"
        onEnded={onVideoEnded}
        playing
        muted={isVideoMuted}
        url={`https://www.youtube.com/watch?v=${playingVideo?.videoId}&showinfo=0`} //Todo move to variable
      />
    </div>
  );
};
