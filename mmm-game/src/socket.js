import socketIOClient from "socket.io-client";

let socket;
const endpoint = "http://localhost:5000/";
socket = socketIOClient(endpoint);

export default socket;