import React from "react";
import LoaderButton from "../components/button/LoaderButton";
import "./LoginMenu.css";

const LoginMenu = () => {

  const renderLoginMenu = () => {
    return (
      <div>
        Login as a..
        <LoaderButton
          block
          href="/student/login"
          size="lg"
          type="button"
          variant="success"
        >
          Student
        </LoaderButton>
        <LoaderButton
          block
          href="/teacher/login"
          size="lg"
          type="button"
          variant="success"
        >
          Teacher
        </LoaderButton>
      </div>
    );
  };

  return <div className="LoginMenu">{renderLoginMenu()}</div>;
};

export default LoginMenu;
