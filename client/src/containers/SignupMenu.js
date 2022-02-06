import React from "react";
import LoaderButton from "../components/button/LoaderButton";
import "./SignupMenu.css";

const SignupMenu = () => {

  const renderSignupMenu = () => {
    return (
      <div>
        Signup as a..
        <LoaderButton
          block
          href="/student/signup"
          size="lg"
          type="button"
          variant="success"
        >
          Student
        </LoaderButton>
        <LoaderButton
          block
          href="/teacher/signup"
          size="lg"
          type="button"
          variant="success"
        >
          Teacher
        </LoaderButton>
      </div>
    );
  };

  return <div className="SignupMenu">{renderSignupMenu()}</div>;
};

export default SignupMenu;
