import "./App.css";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";

function App() {
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMsgs, setNewMsgs] = useState({});
  const [members, setMembers] = useState([]);

  return (
    <AppContext.Provider
      value={{
        socket,
        members,
        setMembers,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMsgs,
        setNewMsgs,
      }}
    >
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}

          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
