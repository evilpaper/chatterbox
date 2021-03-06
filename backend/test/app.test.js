import request from "supertest";
import { expect } from "chai";
import MessageApp from "../app.js";

// The nasty little word "only" make sure we only run this little test

describe("message API endpoint tests", function () {
  it("post a message", function (done) {
    const data = {
      content: "hi world",
    };
    const res = request(MessageApp)
      .post("/message")
      .send(data)
      .set("Accept", "application/json");
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body[0].content).to.equal("hi world");
      done();
    });
  });

  it("gets a single message", function (done) {
    const res = request(MessageApp).get("/message/1");
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body.content).to.equal("hi world");
      done();
    });
  });

  it("updates a message", function (done) {
    const data = {
      content: "Hello World",
    };
    const res = request(MessageApp)
      .put("/update/1")
      .send(data)
      .set("Accept", "application/json");
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body.content).to.equal("Hello World");
      done();
    });
  });

  it("deletes a message", function (done) {
    const res = request(MessageApp)
      .delete("/delete/1")
      .set("Accept", "application/json");
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body.length).to.equal(0);
      done();
    });
  });
});

describe("message api errors correctly", function () {
  it("posts a message errors", function (done) {
    const data = {
      content: "",
    };
    const res = request(MessageApp)
      .post("/message")
      .send(data)
      .set("Accept", "application/json");
    res.expect(404).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("You can't post an empty message");
      done();
    });
  });

  it("gets all errors when no messages", function (done) {
    const res = request(MessageApp).get("/");
    res.expect(404).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("No messages in database");
      done();
    });
  });

  it("error if cant find a single message", function (done) {
    const res = request(MessageApp).get("/message/1");
    res.expect(404).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Message not found in database");
      done();
    });
  });

  it("errors on bad update", function (done) {
    const data = {
      content: "Hello World",
    };
    const res = request(MessageApp)
      .put("/update/0")
      .send(data)
      .set("Accept", "application/json");
    res.expect(404).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("You can't post an empty message");
      done();
    });
  });

  it("errors deleteing message that doesn't exist", function (done) {
    const data = {
      id: 0,
    };
    const res = request(MessageApp)
      .delete("/delete/0")
      .send(data)
      .set("Accept", "application/json");
    res.expect(404).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Message not found in database");
      done();
    });
  });
});
