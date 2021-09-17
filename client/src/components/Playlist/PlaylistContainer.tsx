import React, { useEffect, useRef, useState } from "react";
import { ADD_YOUTUBE_VIDEO, FETCH_PLAYLIST, REMOVE_VIDEO } from "../../api/playlist.api";
import { VideoPlayer } from "../../common/VideoPlayer/VideoPlayer";
import { IVideo } from "../../interfaces/Video";
import { VIDEO_FETCH_COUNT } from "../../utils/consts";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { VideoList } from "../VideoList/VideoList";
import "./playlist.scss";

export const PlaylistContainer = () => {
  const [playlist, setPlaylist] = useState<IVideo[]>([]);
  // const [playingVideo, setCurrentVideo] = useState<IVideo | undefined>();
  // const [currentlyPlayingIndex.current, setCurrentlyPlayingIndex.current] = useState(0);
  const currentlyPlayingIndex = useRef(0);
  const [error, setError] = useState<string>();

  const fetchPlaylist = async () => {
    const { res, error } = await fetchAPI(RequestMethod.GET, FETCH_PLAYLIST, null, {
      limit: VIDEO_FETCH_COUNT,
      cursor: playlist[playlist.length - 1]?._id,
    });
    if (error) {
      return setError(error);
    }
    setPlaylist(res.entities);
  };

  useEffect(() => {
    error && alert(error);
  }, [error]);
  // const playNextVideo = () => {
  //   if (currentlyPlayingIndex.current < playlist.length - 1)
  //     setCurrentlyPlayingIndex.current((currentlyPlaying) => currentlyPlaying + 1);
  // };

  const handleVideoEnded = async () => {
    const endedVideoId = playlist[currentlyPlayingIndex.current]._id;
    const { error } = await fetchAPI(RequestMethod.DELETE, `${REMOVE_VIDEO}/${endedVideoId}`);
    if (error) {
      return setError(error);
    }

    setPlaylist(playlist.filter((playlistVideo) => playlistVideo._id !== playlist[currentlyPlayingIndex.current]._id));
    // console.log(playlist);
  };

  const handleAddVideo = async (videoId: string) => {
    const { error } = await fetchAPI(RequestMethod.POST, ADD_YOUTUBE_VIDEO, { videoId });
    if (error) {
      return setError(error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  useEffect(() => {
    !error && !playlist.length && fetchPlaylist();
  }, [playlist]);

  // useEffect(() => {
  //   // as soon as video is added it should be played
  //   if (currentlyPlayingIndex.current === playlist.length) playNextVideo();
  // }, [playlist]);

  return (
    <div className="playlist-container">
      <VideoList videos={playlist} onVideoAdded={handleAddVideo} />

      <VideoPlayer
        isPlaylistEnded={currentlyPlayingIndex.current === playlist.length}
        playingVideoId={playlist[currentlyPlayingIndex.current]?.videoId}
        onVideoEnded={handleVideoEnded}
      />
    </div>
  );
};
