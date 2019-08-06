import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <h2>Contact</h2>
      <button>submit</button>
    </div>
  );
};

export default Contact;
