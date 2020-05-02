import React, { Component } from "react";
import MessageForm from "./components/messageForm.js";
import MessageList from "./components/messageList.js";
import "./App.css";

import axios from "axios";
const PORT = "http://localhost:3001";

class MessageApp extends Component {
  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data,
    });
  };
  render() {
    return (
      <div className="App">
        <MessageForm ref="messageFormRef" submitMessage={this.submitMessage} />
        <MessageList />
      </div>
    );
  }
}

export default MessageApp;
