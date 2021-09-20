import React from "react";
import ReactPlayer from "react-player";
import "./player.scss";

interface VideoPlayerProps {
  uri: string;
  onVideoEnded: () => void;
  isVideoMuted: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri, onVideoEnded, isVideoMuted }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer className="player" onEnded={onVideoEnded} playing muted={isVideoMuted} url={uri} />
    </div>
  );
};
