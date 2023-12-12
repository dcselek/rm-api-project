import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader" />
      <span className="loader-text">Loading...</span>
    </div>
  );
};

export default Loader;
