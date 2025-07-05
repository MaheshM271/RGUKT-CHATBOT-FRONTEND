import React from "react";
import ReactLoading from "react-loading";
import "./loader.css";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <ReactLoading
        type="spinningBubbles"
        color="#143D59"
        height={75}
        width={75}
      />
    </div>
  );
};

export default Loader;
