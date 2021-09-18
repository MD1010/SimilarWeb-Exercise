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
  const fetchPlaylist = async () => {
    const { res, error } = await fetchAPI(RequestMethod.GET, FETCH_PLAYLIST, null, {
      limit: VIDEO_FETCH_COUNT - playlist.length > 0 ? VIDEO_FETCH_COUNT - playlist.length : VIDEO_FETCH_COUNT,
      cursor: playlist[playlist.length - 1]?._id,
    });
    if (error) {
      return setError(error);
    }
    if (res.entities.length) setPlaylist([...playlist, ...res.entities]);
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
    console.log("before", playlist);
    // playlist.filter((playlistVideo) => playlistVideo._id !== playlist[0]._id)

    setPlaylist(playlist.slice(1));
    console.log("after", playlist);
    // setPlayingVideo(playlist[0]);
    // console.log(playlist);
  };

  const handleAddVideo = async (videoId: string) => {
    const { error, res } = await fetchAPI(RequestMethod.POST, ADD_YOUTUBE_VIDEO, { videoId });
    if (error) {
      return setError(error);
    }
    res.created && setAdded([...added, res.created]);
    // we will fetch the added video when we reach it, in order to preserve the playing order
    // setPlaylist([...playlist, res.created]);
  };

  // useEffect(() => {
  //   fetchPlaylist();
  // }, []);

  useEffect(() => {
    playlist.length < 10 && fetchPlaylist();
  }, [added.length]);
  // useEffect(() => {
  //   // todo maybe change the condition??? meybe fetch while less then 10
  //   !error && !playlist.length && fetchPlaylist();
  // }, [playlist]);

  // useEffect(() => {
  //   // as soon as video is added it should be played
  //   if (currentlyPlayingIndex.current === playlist.length) playNextVideo();
  // }, [playlist]);

  return (
    <div className="playlist-container">
      <VideoList videos={playlist} onVideoAdded={handleAddVideo} />

      <VideoPlayer
        // isPlaylistEnded={currentlyPlayingIndex === playlist.length}
        playingVideo={playlist[0]}
        onVideoEnded={handleVideoEnded}
      />
    </div>
  );
};
