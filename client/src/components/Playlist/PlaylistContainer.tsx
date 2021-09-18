import React, { useCallback, useEffect, useRef, useState } from "react";
import { ADD_YOUTUBE_VIDEO, FETCH_PLAYLIST, REMOVE_VIDEO } from "../../api/playlist";
import { VideoPlayer } from "../../common/VideoPlayer/VideoPlayer";
import { IVideo } from "../../interfaces/Video";
import { VIDEO_FETCH_COUNT } from "../../utils/consts";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { VideoList } from "../VideoList/VideoList";
import "./playlist.scss";

export const PlaylistContainer = () => {
  const [playlist, setPlaylist] = useState<IVideo[]>([]);
  // const [playingVideo, setPlayingVideo] = useState<IVideo>();
  // const [currentlyPlayingIndex.current, setCurrentlyPlayingIndex.current] = useState(0);
  // const [videosLeftToFetch, setVideosLeftToFetch] = useState(true);
  const [error, setError] = useState<string>();
  const [added, setAdded] = useState<IVideo[]>([]);
  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaylist = async () => {
    setIsLoading(true);
    const { res, error } = await fetchAPI(RequestMethod.GET, FETCH_PLAYLIST, null, {
      limit: VIDEO_FETCH_COUNT,
      cursor: playlist[playlist.length - 1]?._id,
    });
    if (error) {
      return setError(error);
    }
    setIsLoading(false);
    if (res.entities.length) setPlaylist([...playlist, ...res.entities]);
    if (res.entities.length < VIDEO_FETCH_COUNT) setHasMoreToLoad(false);
  };

  useEffect(() => {
    error && alert(error);
    setError("");
  }, [error]);
  // const playNextVideo = () => {
  //   if (currentlyPlayingIndex.current < playlist.length - 1)
  //     setCurrentlyPlayingIndex.current((currentlyPlaying) => currentlyPlaying + 1);
  // };

  const handleVideoEnded = async () => {
    const endedVideoId = playlist[0]._id;
    //todo what happends when video was deleted by other client
    const { error } = await fetchAPI(RequestMethod.DELETE, `${REMOVE_VIDEO}/${endedVideoId}`);
    if (error) {
      return setError(error);
    }
    // playlist.filter((playlistVideo) => playlistVideo._id !== playlist[0]._id)

    setPlaylist(playlist.slice(1));
    // setPlayingVideo(playlist[0]);
    // console.log(playlist);
  };

  const handleAddVideo = async (videoId: string) => {
    const { error, res } = await fetchAPI(RequestMethod.POST, ADD_YOUTUBE_VIDEO, { videoId });
    if (error) {
      return setError(error);
    }
    res.created && setAdded([...added, res.created]);
    setHasMoreToLoad(true);
    // we will fetch the added video when we reach it, in order to preserve the playing order
    // setPlaylist([...playlist, res.created]);
  };

  // useEffect(() => {
  //   fetchPlaylist();
  // }, []);

  useEffect(() => {
    playlist.length < VIDEO_FETCH_COUNT && fetchPlaylist();
  }, [added.length]);

  return (
    <div className="playlist-container">
      <VideoList
        isLoading={isLoading}
        videos={playlist}
        onVideoAdded={handleAddVideo}
        hasMoreToLoad={hasMoreToLoad}
        loadMore={fetchPlaylist}
      />

      <VideoPlayer isPlaylistEnded={!playlist.length} playingVideo={playlist[0]} onVideoEnded={handleVideoEnded} />
    </div>
  );
};
