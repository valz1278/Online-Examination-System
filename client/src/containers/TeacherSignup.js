import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { createPostRequest } from "../api";
import LoaderButton from "../components/button/LoaderButton";
import "./StudentSignup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);

  function validateForm() {
    return (
      email.length > 0 && password.length > 0 && password === confirmPassword
    );
  }

  function validateConfirmationForm() {
    return confirmationCode.length > 0;
  }

  async function sendConfirmationCode() {
    await createPostRequest(
      "/api/teacher/confirm",
      { email },
      () => {},
      () => {},
      () => {},
      (err, result) => {
        setVerify(result.Data);
      }
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    await createPostRequest(
      "/api/teacher/signupcheck",
      { email },
      () => {},
      () => {},
      () => {},
      (err, result) => {
        if (result) 
          setMessage("Account already exists");
        else 
          setFormSubmit(true);
      }
    );
    setIsLoading(false);
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    if (confirmationCode.toString() === verify.toString()) {
      createPostRequest(
        "/api/teacher/signup",
        { name, email, password },
        () => {},
        () => {},
        () => {},
        (err, result) => {}
      );
      history.push("/");
    }
    setIsLoading(false);
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={(e) => setConfirmationCode(e.target.value)}
            value={confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
            block
            size="lg"
            type="button"
            variant="success"
            isLoading={isLoading}
            onClick={(e) => sendConfirmationCode()}
          >
            Send Confirmation Code
          </LoaderButton>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" size="lg">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
        <div>{message}</div>
      </Form>
    );
  }

  return <div className="Signup">{formSubmit === false ? renderForm() : renderConfirmationForm()}</div>;
}
