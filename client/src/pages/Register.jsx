import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Register.css";
import bot from "../assets/bot.jpeg";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSubmit}>
            <h1 className="text-center mb-5">Create account</h1>
            <div className="register-profile-pic__container">
              <img src={bot} alt="" className="signup-profile-pic" />
              <label htmlFor="image-upload" className="image-upload-label">
                <i className="fas fa-plus-circle add-picture-icon"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg"
                onChange={validateImage}
              />
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Type your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Register</Button>
            <div className="py-4">
              <p className="text-center">
                Already Have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className="register__bg"></Col>
      </Row>
    </Container>
  );
};

export default Register;
