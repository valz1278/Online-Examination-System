import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/button/LoaderButton";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPostRequest } from '../api'
import Auth from '../modules/Auth'
import { LOGIN } from '../redux/actions/auth'
import "./AdminLogin.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    createPostRequest('/api/admin',{email,password},()=>{},()=>{},()=>{},(err,result)=>{
      if(result.token){
        Auth.authenticateUser(result.token)
        dispatch({
          type: LOGIN,
          token: result.token
        })
        const prevLocation = history.location.state?.prev?.pathname
        if(prevLocation)
          history.push(prevLocation)
        else history.push('/')        
      }
      else{
        console.log(result.message)
      }
    })
  }

  return (
    <div className="Login">
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
      </Form>
    </div>
  );
}