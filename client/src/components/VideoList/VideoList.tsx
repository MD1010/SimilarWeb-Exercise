import React, { memo, useState } from "react";
import { IVideo } from "../../interfaces/Video";
import { MuteButton } from "../shared/Mute";
import "./videoList.scss";

interface VideoListProps {
  videos: IVideo[];
  onVideoAdded: (videoId: string) => void;
  loadMore: () => void;
  hasMoreToLoad: boolean;
  isLoading: boolean;
  isCurrentVideoMuted: boolean;
  setVideoMuted: (isMuted: boolean) => void;
}

export const VideoList: React.FC<VideoListProps> = memo(
  ({ videos, onVideoAdded, loadMore, hasMoreToLoad, isLoading, isCurrentVideoMuted, setVideoMuted }) => {
    const [videoId, setVideoId] = useState<string>("");

    const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setVideoId(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setVideoId("");
      onVideoAdded(videoId);
    };

    return (
      <>
        <div className="video-list">
          <form onSubmit={handleSubmit} className="add-video-form">
            <input className="text" type="text" value={videoId} onChange={handleVideoIdChange}></input>
            <input className="submit-btn" type="submit"></input>
          </form>
          {videos.map((videoItem, index) => {
            const { duration, title } = videoItem;
            return (
              <div className="video-item">
                <span>{title}</span>
                {!index && <MuteButton isMuted={isCurrentVideoMuted} setIsMuted={setVideoMuted} />}
                <span style={{ fontWeight: "bold" }}>{duration === "0:00" ? "live" : duration}</span>
              </div>
            );
          })}
          {!isLoading && hasMoreToLoad && <button onClick={loadMore}>Load More</button>}
          {!videos.length && <h1>Playlist is Empty</h1>}
        </div>
      </>
    );
  }
);
