import React, { memo, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { IVideo } from "../../interfaces/Video";
import { swapElements } from "../../utils/helpers";
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
  setVideos: (videos: IVideo[]) => void;
}

export const VideoList: React.FC<VideoListProps> = memo(
  ({ videos, setVideos, onVideoAdded, loadMore, hasMoreToLoad, isLoading, isCurrentVideoMuted, setVideoMuted }) => {
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
          <Container
            onDrop={({ addedIndex, removedIndex }) => {
              // this check is to prevent modifing the currently playing song
              addedIndex && removedIndex && setVideos([...swapElements(videos, addedIndex, removedIndex)]);
            }}
          >
            {videos.map((videoItem, index) => {
              const { duration, title } = videoItem;
              return (
                <Draggable key={videoItem._id}>
                  <div className="video-item">
                    <span>{title}</span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {!index && <MuteButton isMuted={isCurrentVideoMuted} setIsMuted={setVideoMuted} />}
                      <span style={{ fontWeight: "bold", marginLeft: 10 }}>{duration}</span>
                    </div>
                  </div>
                </Draggable>
              );
            })}
          </Container>
          {!isLoading && hasMoreToLoad && <button onClick={loadMore}>Load More</button>}
          {!videos.length && <h1>Playlist is Empty</h1>}
        </div>
      </>
    );
  }
);
