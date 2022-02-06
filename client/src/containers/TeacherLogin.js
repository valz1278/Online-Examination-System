import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/button/LoaderButton";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPostRequest } from "../api";
import Auth from "../modules/Auth";
import { LOGIN } from "../redux/actions/auth";
import "./TeacherLogin.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [code, setCode] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  function validateForm() {
    return email.length > 0 && password.length > 0;
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
        setCode(result.Data);
      }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    createPostRequest(
      "/api/teacher/login",
      { email, password },
      () => {},
      () => {},
      () => {},
      (err, result) => {
        if (result.token) {
          setFormSubmit(true);
          setToken(result);
        } else {
          setMessage(result.message);
        }
      }
    );
    setIsLoading(false);
  }

  function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    if (confirmationCode.toString() === code.toString()) {
      Auth.authenticateUser(token.token);
      dispatch({
        type: LOGIN,
        token: token.token,
      });
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
        </Form.Group>
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

  function renderLoginForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
        <div>{message}</div>
      </Form>
    );
  }

  return (
    <div className="Login">
      {formSubmit === false ? renderLoginForm() : renderConfirmationForm()}
    </div>
  );
}
