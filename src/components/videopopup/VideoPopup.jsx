/* eslint-disable react/prop-types */

import ReactPlayer from "react-player/youtube";
import "./videoPopup.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidenPopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidenPopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidenPopup}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          //playing={true}
        />
      </div>
    </div>
  );
};

export default VideoPopup;
