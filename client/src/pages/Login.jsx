import { Row, Col, Form, Container, Button } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useUserLoginMutation } from "../store/stateApi";
import { AppContext } from "../context/appContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userLogin, { isLoading, error }] = useUserLoginMutation();
  const { socket } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin({ email, password }).then(({ data }) => {
      if (data) {
        console.log("User LoggedIn", data);
        navigate("/chat");
      }
    });
    socket.emit("new-user");
  };

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col
          md={7}
          className="d-flex justify-content-center align-items-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSubmit}>
            <h1 className="text-center mb-5">Login</h1>

            <Form.Group className="mb-3">
              {error && <p className="alert alert-danger">{error.data}</p>}
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="text-muted"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your Password"
                className="text-muted"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Login</Button>
            <div className="py-4">
              <p className="text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
