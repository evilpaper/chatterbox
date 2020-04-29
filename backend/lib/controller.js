import MessageApp from "./model.js";

let messageApp;

// Creates an instance of our database, use different
// databases depending on if it test och prod
if (process.env.npm_lifecycle_event == "test") {
  messageApp = new MessageApp("/json/testMessages.json");
} else {
  messageApp = new MessageApp("/json/messages.json");
}

function getAll() {
  return new Promise((resolve, reject) => {
    let result = messageApp.getAll();
    if (result.length !== 0) {
      resolve(result);
    } else {
      reject("No messages in database");
    }
  });
}

function getSingleMessage(id) {
  return new Promise((resolve, reject) => {
    let result = messageApp.get(id);
    if (result) {
      resolve(result);
    } else {
      reject("Message not found in database");
    }
  });
}

function post(content) {
  return new Promise((resolve, reject) => {
    let message = messageApp.post(content);
    if (message.length !== 0) {
      resolve(message);
    } else {
      reject("You can't post an empty message");
    }
  });
}

function updateMessage(id, content) {
  return new Promise((resolve, reject) => {
    let result = messageApp.update(id, content);
    if (result.length !== 0) {
      resolve(result);
    } else {
      reject("You can't post an empty message");
    }
  });
}

function deleteMessage(id) {
  return new Promise((resolve, reject) => {
    let result = messageApp.delete(id);
    if (result !== "Message not found in database") {
      resolve(result);
    } else {
      reject(result);
    }
  });
}

module.exports = {
  getAll,
  getSingleMessage,
  post,
  deleteMessage,
  updateMessage,
};
