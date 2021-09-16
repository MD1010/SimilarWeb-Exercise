import React, { useEffect, useState } from "react";
import { VideoPlayer } from "../../common/VideoPlayer/VideoPlayer";
import { IVideo } from "../../interfaces/Video";
import "./playlist.scss";
import { VideoList } from "../VideoList/VideoList";
import { mockVideos } from "../../mock";

export const PlaylistContainer = () => {
  const [playlist, setPlaylist] = useState<IVideo[]>([]);
  const [playingVideoId, setVideoId] = useState<string>("");

  const fetchPlaylist = () => {
    return mockVideos;
  };

  const setCurrentlyPlayingVideo = (playingVideoIndex: number) => {
    const videoId = playlist[playingVideoIndex].videoId;
    setVideoId(videoId);
  };

  useEffect(() => {
    playlist.length && setCurrentlyPlayingVideo(0);
  }, [playlist]);

  useEffect(() => {
    setPlaylist(fetchPlaylist());
  }, []);

  return (
    <div className="playlist-container">
      <VideoList videos={playlist} />
      <VideoPlayer playingVideoId={playingVideoId} />
    </div>
  );
};
