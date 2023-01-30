import React, { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./MessageForm.css";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { useRef } from "react";
import { useEffect } from "react";

const MessageForm = () => {
  const user = useSelector((state) => state.user);
  const messageEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const {
    socket,
    messages,
    setMessages,
    currentRoom,
    setCurrentRoom,
    privateMemberMsg,
  } = useContext(AppContext);
  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return month + "/" + day + "/" + year;
  };
  const todayDate = getFormattedDate();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() > 10 ? today.getMinutes() : "0" + today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;

    socket.emit("message-room", message, roomId, user, todayDate, time);
    setMessage("");
  };

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log("msg from room", roomMessages);
    setMessages(roomMessages);
  });

  return (
    <>
      <div className="messages-output">
        {user && !privateMemberMsg?._id && (
          <div className="alert alert-info">You are in {currentRoom} room</div>
        )}

        {user && privateMemberMsg?._id && (
          <div className="alert alert-info conversation-info">
            <div>
              Your conversation with {privateMemberMsg?.username}
              <img
                src={`http://localhost:3500/uploads/${privateMemberMsg.picturePath}`}
                alt="Conversation-profile-pic"
                className="conversation-profile-pic"
              />
            </div>
          </div>
        )}
        {!user && <div className="alert alert-danger">Please Login</div>}
        {user &&
          messages.map(({ _id: date, messagesByDate }, index) => (
            <div key={index}>
              <p className="alert alert-info text-center message-date-indicator">
                {date}{" "}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIndex) => (
                  <div
                    className={
                      sender?.email === user?.email
                        ? "message"
                        : "incoming-message"
                    }
                    key={msgIndex}
                  >
                    <div className="message-inner">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src={`http://localhost:3500/uploads/${sender.picturePath}`}
                          alt=""
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginLeft: "15px",
                          }}
                        />
                        <p className="message-sender ms-2">
                          {sender._id === user._id ? "You" : sender.username}
                        </p>
                      </div>
                      <p className="message-content">{content} </p>
                      <p className="message-timestamp-left">{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <Row>
        <Col md={11}>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Type your message"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={1}>
          <Button
            type="submit"
            style={{ width: "100%", backgroundColor: "orange", border: "none" }}
            disabled={!user}
            onClick={handleSubmit}
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default MessageForm;
