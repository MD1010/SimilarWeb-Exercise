import React, { useEffect, useState } from "react";
import { ADD_YOUTUBE_VIDEO, FETCH_PLAYLIST, REMOVE_VIDEO } from "../../api/playlist";
import { VideoPlayer } from "../../common/VideoPlayer/VideoPlayer";
import { IVideo } from "../../interfaces/Video";
import { VIDEO_FETCH_COUNT, YT_PREFIX } from "../../utils/consts";
import { fetchAPI, RequestMethod } from "../../utils/fetchAPI";
import { VideoList } from "../VideoList/VideoList";
import "./playlist.scss";

export const PlaylistContainer = () => {
  const [playlist, setPlaylist] = useState<IVideo[]>([]);
  const [error, setError] = useState<string>();
  const [addedVideos, setAddedVideos] = useState<IVideo[]>([]);
  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentVideoMuted, setIsMuted] = useState(true);
  const playingVideoUri = `${YT_PREFIX}${playlist[0]?.videoId}&showinfo=0`;

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

  const handleAddVideo = async (videoId: string) => {
    const { error, res } = await fetchAPI(RequestMethod.POST, ADD_YOUTUBE_VIDEO, { videoId });
    if (error) {
      return setError(error);
    }
    res.created && setAddedVideos([...addedVideos, res.created]);
    setHasMoreToLoad(true);
  };

  const handleDeleteVideo = async (videoId: string) => {
    const { error } = await fetchAPI(RequestMethod.DELETE, `${REMOVE_VIDEO}/${videoId}`);
    if (error) {
      return setError(error);
    }
    setPlaylist(playlist.slice(1));
  };

  const handleVideoEnded = async () => {
    handleDeleteVideo(playlist[0]._id);
  };

  useEffect(() => {
    // if we add the video to the list when we have less than VIDEO_FETCH_COUNT (less than a page) we would
    // want to see the added video appears in the list right away, however we must fetch to see if other user
    // has added new videos meanwhile in order to preserve the playing order, as if we whould have added the video to the buttom
    // we would play it before videos that were supposed to be added earlier and havent been fetched before
    playlist.length < VIDEO_FETCH_COUNT && fetchPlaylist();
  }, [addedVideos]);

  return (
    <div className="playlist-container">
      <VideoList
        setVideos={setPlaylist}
        isCurrentVideoMuted={isCurrentVideoMuted}
        isLoading={isLoading}
        videos={playlist}
        onVideoAdded={handleAddVideo}
        onVideoDeleted={handleDeleteVideo}
        hasMoreToLoad={hasMoreToLoad}
        loadMore={fetchPlaylist}
        setVideoMuted={setIsMuted}
      />

      <VideoPlayer uri={playingVideoUri} isVideoMuted={isCurrentVideoMuted} onVideoEnded={handleVideoEnded} />
    </div>
  );
};
