class MessageApp {
  constructor() {
    this.messages = [];
  }

  post(content) {
    const item = {
      content: content,
      date: new Date(),
      id: this.messages.length,
    };
    this.messages.push(item);
    return this.messages;
  }

  get(id) {
    return this.messages[id];
  }

  update(id, content) {
    this.messages[id].content = content;
    return this.messages[id];
  }

  delete(id) {
    this.messages.splice(id - 1, 1);
    return this.messages;
  }
}

export default MessageApp;
