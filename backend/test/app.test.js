import request from "supertest";
import { expect } from "chai";
import MessageApp from "../app.js";

// The nasty little word "only" make sure we only run this little test

describe("message API endpoint tests", function () {
  it("gets from backend messages", function (done) {
    const res = request(MessageApp).get("/");
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body.length).to.equal(0);
      done();
    });
  });

  it("post a message", function (done) {
    var data = {
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

});
