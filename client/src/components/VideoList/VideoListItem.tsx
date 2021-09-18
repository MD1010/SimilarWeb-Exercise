import React from "react";
import { IVideo } from "../../interfaces/Video";

interface VideoListItemProps {
  video: IVideo;
}

export const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
  const { title, duration } = video;
  return (
    <div className="video-item">
      <span>{title}</span>
      <span style={{ marginLeft: "15px", fontWeight: "bold" }}>{duration}</span>
    </div>
  );
};
