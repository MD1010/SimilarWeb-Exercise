import React, { useState } from "react";
import { IVideo } from "../../interfaces/Video";
import { VideoListItem } from "./VideoListItem";

interface VideoListProps {
  videos: IVideo[];
}

export const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const [videoId, setVideoId] = useState<string>("");

  const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoId(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVideoId("");
    //todo add song axios post
  };

  return (
    <div className="video-list">
      <form onSubmit={handleSubmit}>
        <input type="text" value={videoId} onChange={handleVideoIdChange}></input>
        <input type="submit"></input>
      </form>

      {videos.map((video) => (
        <VideoListItem video={video} />
      ))}
    </div>
  );
};
