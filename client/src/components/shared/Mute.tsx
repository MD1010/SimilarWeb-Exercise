import React from "react";
import muted from "../../assets/muted.svg";
import unmuted from "../../assets/unmuted.svg";
import "../shared/styles/mute.scss";

interface MuteButtonProps {
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
}

export const MuteButton: React.FC<MuteButtonProps> = ({ isMuted, setIsMuted }) => {
  return (
    <button className="mute" onClick={() => setIsMuted(!isMuted)}>
      {isMuted ? <img src={muted} alt="mute"></img> : <img src={unmuted} alt="mute"></img>}
    </button>
  );
};
