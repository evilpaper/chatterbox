function getID(array) {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
}

class MessageApp {
  constructor() {
    this.messages = [];
  }

  post(content) {
    const item = {
      id: getID(this.messages),
      content: content,
      date: new Date(),
    };
    this.messages.push(item);
    return this.messages;
  }

  get(id) {
    return this.messages.filter((message) => message.id === id)[0];
  }

  update(id, update) {
    let index = this.messages.findIndex((message) => message.id == id);
    this.messages[index].content = update;
    return this.messages[index];
  }

  delete(id) {
    this.messages = this.messages.filter((message) => message.id != id);
    return this.messages;
  }
}

export default MessageApp;
