import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import login from "../../data/login";

interface Props {
  setToken: (token: any) => void;
}

// Login page renders the login component
const Login: React.FunctionComponent<Props> = ({ setToken }) => {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLoginSubmit = async (): Promise<void> => {
    if (username && password) {
      const token = await login({
        username,
      });
      if (token && token.token) {
        setToken(token);
      } else {
        alert("Can't login user");
      }
    }
  };

  return (
    <div>
      <div className="login">
        <p className="countries-title">Please login</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="secondary"
            disabled={!username || !password}
            onClick={onLoginSubmit}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
