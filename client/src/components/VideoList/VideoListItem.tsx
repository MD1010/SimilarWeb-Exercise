import React from "react";
import { IVideo } from "../../interfaces/Video";

interface VideoListItemProps {
  video: IVideo;
}

export const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
  const { title, duration } = video;
  return (
    <div>
      <span>{title}</span>
      <span>{duration}</span>
    </div>
  );
};
