import request from "supertest";
import express from "express";

import accessController from "../../../controllers/access.controller";

const app = express();

// Middleware to parse incoming JSON requests

app.use(express.json());

// set up the POST route for signup

app.post("/signup", accessController.signUp);

describe("AccessController", () => {
  it("should successfully sign up a shop", async () => {
    const response = await request(app).post("/signup").send({});

    expect(response.status).toBe(201);
    expect(response.body.code).toBe("2001");
  });
});
