import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./MessageForm.css";

const MessageForm = () => {
  return (
    <>
      <div className="messages-output"></div>
      <Row>
        <Col md={11}>
          <Form>
            <Form.Group>
              <Form.Control type="text" placeholder="Type your message" />
            </Form.Group>
          </Form>
        </Col>
        <Col md={1}>
          <Button
            type="submit"
            style={{ width: "100%", backgroundColor: "orange", border: "none" }}
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MessageForm;
