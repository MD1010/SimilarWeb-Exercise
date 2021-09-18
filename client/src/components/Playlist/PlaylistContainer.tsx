import React, { useEffect, useState } from "react";
import { ADD_YOUTUBE_VIDEO, FETCH_PLAYLIST, REMOVE_VIDEO } from "../../api/playlist";
import { VideoPlayer } from "../../common/VideoPlayer/VideoPlayer";
import { IVideo } from "../../interfaces/Video";
import { VIDEO_FETCH_COUNT } from "../../utils/consts";
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

  const handleVideoEnded = async () => {
    const endedVideoId = playlist[0]._id;
    //todo what happends when video was deleted by other client
    const { error } = await fetchAPI(RequestMethod.DELETE, `${REMOVE_VIDEO}/${endedVideoId}`);
    if (error) {
      return setError(error);
    }
    setPlaylist(playlist.slice(1));
  };

  const handleAddVideo = async (videoId: string) => {
    const { error, res } = await fetchAPI(RequestMethod.POST, ADD_YOUTUBE_VIDEO, { videoId });
    if (error) {
      return setError(error);
    }
    res.created && setAddedVideos([...addedVideos, res.created]);
    setHasMoreToLoad(true);
  };

  useEffect(() => {
    playlist.length < VIDEO_FETCH_COUNT && fetchPlaylist();
  }, [addedVideos.length]);

  return (
    <div className="playlist-container">
      <VideoList
        isCurrentVideoMuted={isCurrentVideoMuted}
        isLoading={isLoading}
        videos={playlist}
        onVideoAdded={handleAddVideo}
        hasMoreToLoad={hasMoreToLoad}
        loadMore={fetchPlaylist}
        setVideoMuted={setIsMuted}
      />

      <VideoPlayer isVideoMuted={isCurrentVideoMuted} playingVideo={playlist[0]} onVideoEnded={handleVideoEnded} />
    </div>
  );
};
