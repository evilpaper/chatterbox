import { expect } from "chai";
import MessageApp from "./app.js";

describe("app", function () {
  let testApp;

  this.beforeEach(() => {
    testApp = new MessageApp();
    testApp.post("Hi World!");
  });

  it("app has messages", function () {
    expect(testApp.messages).to.be.an("array");
  });

  it("app creates message (post)", function () {
    testApp.post("Hi World!");
    expect(testApp.messages.length).to.equal(2);
  });

  it("message has content, date and id", function () {
    expect(testApp.messages[0].content).to.equal("Hi World!");
    expect(testApp.messages[0].date).not.to.equal(undefined);
    expect(testApp.messages[0].id).to.equal(0);
  });

  it("app reads (get)", function () {
    expect(testApp.get(0).content).to.equal("Hi World!");
  });

  it("app updates (update)", function () {
    testApp.update(0, "Hello World!");
    expect(testApp.get(0).content).to.equal("Hello World!");
  });

  it("app deletes (delete)", function () {
    testApp.delete(0);
    expect(testApp.messages.length).to.equal(0);
  });
});
