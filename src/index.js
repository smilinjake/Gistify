import React from "react";
import ReactDOM from "react-dom";

import App from "./App.jsx";
ReactDOM.render(<App />, document.getElementById("root"));
// hot reloading. It work s by replacing a module of the application
// during runtime with an updated one so that it’s available for instant use.
module.hot.accept();