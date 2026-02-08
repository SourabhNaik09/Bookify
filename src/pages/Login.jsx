import React,{useState,useEffect, use} from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase.jsx";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(firebase.isLoggedIn) {
      navigate("/");
    }
  },[firebase,navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login in a user");
    const result = await firebase.signinUserwithEmailandPass(email,password);
    console.log("User signed up successfully", result);
  }

  return (
  <div className="form-wrapper">
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login In
      </Button>
    </Form>

    <h1 className="or-divider">OR</h1>

    <Button
      className="google-btn"
      variant="danger"
      onClick={firebase.signinWithGoogle}
    >
      Sign in with Google
    </Button>
  </div>
);

};

export default LoginPage;
