import React from "react";
import ReactDOM from "react-dom";
import CuratorFeed from "./CuratorFeed.jsx";

const showCuratorFeed = (apiKey, postsToShow, loadingClass, element) => {
  ReactDOM.render(<CuratorFeed config={{ apiKey, postsToShow }} />, element);
};

module.exports = showCuratorFeed;
