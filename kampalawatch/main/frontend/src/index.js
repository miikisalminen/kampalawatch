// --- IMPORTS ---
import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";

function Root() {
  return <Main />;
}

export default Root;

ReactDOM.render(<Root />, document.getElementById("root"));
