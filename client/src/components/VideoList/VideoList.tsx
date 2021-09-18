import React, { memo, useEffect, useRef, useState } from "react";
import { IVideo } from "../../interfaces/Video";
import { VideoListItem } from "./VideoListItem";
import "./videoList.scss";
import InfiniteScroll from "react-infinite-scroll-component";

interface VideoListProps {
  videos: IVideo[];
  onVideoAdded: (videoId: string) => void;
  loadMore: () => void;
  hasMoreToLoad: boolean;
  isLoading: boolean;
}

export const VideoList: React.FC<VideoListProps> = memo(
  ({ videos, onVideoAdded, loadMore, hasMoreToLoad, isLoading }) => {
    const [videoId, setVideoId] = useState<string>("");
    // const loader = useRef(null);
    // const options = {
    //   root: null,
    //   // rootMargin: "5px",
    //   threshold: 1.0,
    // };
    const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setVideoId(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setVideoId("");
      onVideoAdded(videoId);
    };

    // useEffect(() => {
    //   const observer = new IntersectionObserver(handleObserver, options);
    //   if (loader.current) {
    //     observer.observe(loader.current);
    //   }
    // }, []);
    // const handleObserver = (entities: any) => {
    //   const target = entities[0];
    //   if (target.isIntersecting) {
    //     hasMoreToLoad && loadMore();
    //   }
    // };

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

          {!isLoading && hasMoreToLoad && <button onClick={loadMore}>Load More</button>}
          {isLoading && (
            <div className="loading">
              <h2>Loading...</h2>
            </div>
          )}
        </div>
      </>
    );
  }
);
