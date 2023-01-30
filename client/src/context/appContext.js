import { io } from "socket.io-client";
import { createContext } from "react";

const socket_url = "http://localhost:3500";

export const socket = io(socket_url);
export const AppContext = createContext();