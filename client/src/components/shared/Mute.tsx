import React, { useState } from "react";
import muted from "../../assets/muted.svg";
import unmuted from "../../assets/unmuted.svg";

interface MuteButtonProps {
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
}

export const MuteButton: React.FC<MuteButtonProps> = ({ isMuted, setIsMuted }) => {
  return (
    <button style={{ border: 0, background: "transparent" }} onClick={() => setIsMuted(!isMuted)}>
      {isMuted ? <img src={muted} alt="image1"></img> : <img src={unmuted} alt="image1"></img>}
    </button>
  );
};
