import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <br />
      <h2>Home</h2>
    </div>
  );
};

export default Home;
