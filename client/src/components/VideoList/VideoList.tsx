import React, { memo, useState } from "react";
import { IVideo } from "../../interfaces/Video";
import { VideoListItem } from "./VideoListItem";
import "./videoList.scss";

interface VideoListProps {
  videos: IVideo[];
  onVideoAdded: (videoId: string) => void;
}

export const VideoList: React.FC<VideoListProps> = memo(({ videos, onVideoAdded: addVideo }) => {
  const [videoId, setVideoId] = useState<string>("");

  const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoId(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (videoId.length < 11) return;
    setVideoId("");
    addVideo(videoId);
  };

  return (
    <>
      <div className="video-list">
        <form onSubmit={handleSubmit} className="add-video-form">
          <input className="text" type="text" value={videoId} onChange={handleVideoIdChange}></input>
          <input className="submit-btn" type="submit"></input>
        </form>
        {videos.map((videoItem) => (
          <VideoListItem key={videoItem._id} video={videoItem} />
        ))}
      </div>
    </>
  );
});
