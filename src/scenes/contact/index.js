import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./style.scss";

const Contact = props => {
  console.log(props);

  const isDisabledClass = props.testState ? "" : "--is-disabled";

  return (
    <div className="contact">
      <div>
        <Link to="/home">Home</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <h2>Contact</h2>
      <button className={`${isDisabledClass} btn`}>submit</button>
    </div>
  );
};

const mapStateToProps = state => ({
  testState: state.test.test
});

export default connect(
  mapStateToProps,
  null
)(Contact);
