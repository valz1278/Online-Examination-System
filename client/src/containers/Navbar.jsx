import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../redux/actions/auth";
import Auth from "../modules/Auth";

const TheNavbar = () => {
  const auth = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
      <Navbar.Brand href="/" className="font-weight-bold text-muted">
        OES
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {auth.token ? (
            <>
              {Auth.getTokenInfo().role === "teacher" ? (
                <>
                  <Nav.Link href="/teacher/results">Results</Nav.Link>
                  <Nav.Link href="/teacher/exam">Exams</Nav.Link>
                  <Nav.Link href="/upload">Upload Exam</Nav.Link>
                  <Nav.Link href="/create">Create Exam</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/exam">Exams</Nav.Link>
                  <Nav.Link href="/results">Results</Nav.Link>
                </>
              )}
              <Nav.Link href="/login" onClick={handleLogout}>
                Signout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TheNavbar;
