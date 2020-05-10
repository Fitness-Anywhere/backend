import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Content from "./Content";

function Home() {
  return (
    <div className="marketing-Home">
      <div className="marketing-header-wrapper">
        <Navbar />
        <Header />
      </div>
      <Content />
    </div>
  );
}

export default Home;
