import React from "react";
import MessageForm from "./components/messageForm.js";
import MessageList from "./components/messageList.js";
import "./App.css";

function MessageApp() {
  return (
    <div className="App">
      <MessageForm />
      <MessageList />
    </div>
  );
}

export default MessageApp;
