import React from "react";
import Routes from "./Routes/index";
import Navbar from "./containers/Navbar";
import "./App.css";

function App() {
  
  return (
    <div className="App container py-3">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;