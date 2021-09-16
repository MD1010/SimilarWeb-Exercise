import React from "react";
import { VideoList } from "../VideoList/VideoList";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import "./playlist.scss";

export const PlaylistContainer = () => {
  return (
    <div className="playlist-container">
      <VideoList />
      <VideoPlayer />
    </div>
  );
};
