import React, { memo, useState } from "react";
import { Container as DragAndDropContainer, Draggable } from "react-smooth-dnd";
import { IVideo } from "../../interfaces/Video";
import { swapElements } from "../../utils/helpers";
import { MuteButton } from "../shared/Mute";
import { FiTrash } from "react-icons/fi";
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
  onVideoDeleted: (videoId: string) => void;
}

export const VideoList: React.FC<VideoListProps> = memo(
  ({
    videos,
    setVideos,
    onVideoAdded,
    loadMore,
    hasMoreToLoad,
    isLoading,
    isCurrentVideoMuted,
    setVideoMuted,
    onVideoDeleted,
  }) => {
    const [videoId, setVideoId] = useState<string>("");

    const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setVideoId(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setVideoId("");
      onVideoAdded(videoId);
    };

    const VideoItem = ({ videoItem, index }: { videoItem: IVideo; index: number }) => {
      const { title, duration, _id } = videoItem;
      return (
        <div className="video-item">
          <span>{title}</span>
          <div className="video-item__controls">
            <span className="video-item__delete" onClick={() => onVideoDeleted(_id)}>
              <FiTrash size={22} />
            </span>
            {!index && <MuteButton isMuted={isCurrentVideoMuted} setIsMuted={setVideoMuted} />}
            <span className="video-item__duration">{duration}</span>
          </div>
        </div>
      );
    };
    return (
      <>
        <div className="video-list">
          <form onSubmit={handleSubmit} className="add-video-form">
            <input className="add-video-form__text" type="text" value={videoId} onChange={handleVideoIdChange}></input>
            <input className="add-video-form__submit-btn" type="submit" disabled={!videoId.length}></input>
          </form>
          <DragAndDropContainer
            onDrop={({ addedIndex, removedIndex }) => {
              // this check is to prevent modifing the currently playing song
              addedIndex && removedIndex && setVideos([...swapElements(videos, addedIndex, removedIndex)]);
            }}
          >
            {videos.map((videoItem, index) => {
              return (
                <Draggable key={videoItem._id}>
                  <VideoItem videoItem={videoItem} index={index} />
                </Draggable>
              );
            })}
          </DragAndDropContainer>
          {!isLoading && hasMoreToLoad && <button onClick={loadMore}>Load More</button>}
          {!videos.length && <h1>Playlist is Empty</h1>}
        </div>
      </>
    );
  }
);
