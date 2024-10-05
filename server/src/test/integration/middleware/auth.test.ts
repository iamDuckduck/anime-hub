import { User } from "../../../models/users";
import app from "../../../index";
import bcrypt from "bcrypt";
import request from "supertest";

describe("auth middleware", () => {
  let email: string = "123451@gmail.com";
  let password: string = "12345";
  let token: string = "";

  //get auth
  const login = async () => {
    const authRes = await request(app)
      .post("/api/auth")
      .send({ email, password });
    return authRes.body.token;
  };

  //save user
  const saveUser = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      userName: "123451",
      email,
      password: hashedPassword,
    });
    await user.save();
  };

  beforeEach(async () => {
    await saveUser();
    token = await login();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  const exec = function () {
    return request(app)
      .get("/api/users/me")
      .set("Content-Type", "application/json")
      .set("authorization", `Bearer ${token}`); // Pass the JWT token
  };

  it("should return 401 if the user did not login", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 403 if authorization is undefinded", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Content-Type", "application/json")
      .set("authorization", ""); // Pass the JWT token

    expect(res.status).toBe(403);
  });

  it("should return 200 if a valid session is passed", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
