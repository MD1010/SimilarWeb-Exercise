import React from "react";

interface VideoPlayerProps {
  playingVideoId: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ playingVideoId }) => {
  return <div>Here will be the video player</div>;
};
