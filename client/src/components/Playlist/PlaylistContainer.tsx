import React, { useEffect, useState } from "react";
import { VideoPlayer } from "../../common/VideoPlayer/VideoPlayer";
import { IVideo } from "../../interfaces/Video";
import "./playlist.scss";
import { VideoList } from "../VideoList/VideoList";
import { mockVideos } from "../../mock";

export const PlaylistContainer = () => {
  const [playlist, setPlaylist] = useState<IVideo[]>([]);
  // const [playingVideo, setCurrentVideo] = useState<IVideo | undefined>();
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(0);

  const fetchPlaylist = () => {
    return mockVideos;
  };

  const playNextVideo = () => {
    setCurrentlyPlayingIndex((currentlyPlaying) => currentlyPlaying + 1);
  };

  // useEffect(() => {
  //   if(playlist.length)
  //   setCurrentVideo(playlist[0]);

  // }, [playlist]);

  useEffect(() => {
    setPlaylist(fetchPlaylist());
  }, []);

  return (
    <div className="playlist-container">
      <VideoList videos={playlist} />
      <VideoPlayer playingVideoId={playlist[currentlyPlayingIndex]?.videoId} onVideoEnded={playNextVideo} />
    </div>
  );
};
