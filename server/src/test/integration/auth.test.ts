import request from "supertest";
import { User } from "../../models/users";
import { app } from "../../index";

let token: string;

describe("auth middleware", () => {
  const exec = function () {
    return request(app).get("/api/users/me").set("x-auth-token", token);
  };

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should return 401 if the user did not login", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if the token is invaild", async () => {
    token = "invaild token";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if a valid token is passed", async () => {
    const user = new User({
      userName: "123451",
      email: "123451@gmail.com",
      password: "12345",
    });
    await user.save();

    token = user.generateAuthToken();
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
