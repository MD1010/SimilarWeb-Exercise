import React, { useCallback, useEffect, useState } from "react";
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
    if (currentlyPlayingIndex < playlist.length - 1)
      setCurrentlyPlayingIndex((currentlyPlaying) => currentlyPlaying + 1);
  };

  const handleVideoEnded = () => {
    //todo delete previous video from db
    // console.log(playlist[currentlyPlayingIndex].videoId);

    // playNextVideo();
    setPlaylist(playlist.filter((x) => x.videoId !== playlist[currentlyPlayingIndex].videoId));
    // console.log(playlist);
  };

  const handleAddVideo = (videoId: string) => {
    // todo call api backend
    setPlaylist([...playlist, { addedAt: new Date(), duration: 200, title: "new video", videoId }]);
  };

  useEffect(() => {
    setPlaylist(fetchPlaylist());
  }, []);

  // useEffect(() => {
  //   // as soon as video is added it should be played
  //   if (currentlyPlayingIndex === playlist.length) playNextVideo();
  // }, [playlist]);

  return (
    <div className="playlist-container">
      <VideoList videos={playlist} onVideoAdded={handleAddVideo} />

      <VideoPlayer
        isPlaylistEnded={currentlyPlayingIndex === playlist.length}
        playingVideoId={playlist[currentlyPlayingIndex]?.videoId}
        onVideoEnded={handleVideoEnded}
      />
    </div>
  );
};
