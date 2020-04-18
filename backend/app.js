import fs from "fs";
import path from "path";

function getID(array) {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
}

class MessageApp {
  constructor(filepath) {
    this.filepath = filepath;
    this.messages = filepath ? this.readFromJson() : [];
  }

  readFromJson() {
    return JSON.parse(
      fs.readFileSync(
        __dirname + path.normalize(this.filepath),
        "utf8",
        (err, data) => {
          if (err) throw err;
        }
      )
    );
  }

  writeToJson() {
    if (this.filepath) {
      const jsonItem = JSON.stringify(this.messages);
      fs.writeFileSync(
        __dirname + path.normalize(this.filepath),
        jsonItem,
        (err) => {
          if (err) throw err;
        }
      );
    }
  }

  post(content) {
    const item = {
      id: getID(this.messages),
      content: content,
      date: new Date(),
    };
    this.messages.push(item);
    this.writeToJson();
    return this.messages;
  }

  get(id) {
    return this.messages.filter((message) => message.id === id)[0];
  }

  update(id, update) {
    let index = this.messages.findIndex((message) => message.id == id);
    this.messages[index].content = update;
    this.writeToJson();
    return this.messages[index];
  }

  delete(id) {
    this.messages = this.messages.filter((message) => message.id != id);
    this.writeToJson();
    return this.messages;
  }
}

export default MessageApp;
