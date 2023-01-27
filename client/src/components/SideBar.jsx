import React from "react";
import { ListGroup } from "react-bootstrap";

const SideBar = () => {
  const rooms = ["room1", "room2", "room3", "room4"];
  return (
    <>
      <h3>Available Rooms</h3>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h3>Online Members</h3>
    </>
  );
};

export default SideBar;
