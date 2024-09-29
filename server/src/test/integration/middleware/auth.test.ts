import { User } from "../../../models/users";
import app from "../../../index";
import bcrypt from "bcrypt";
import request from "supertest";

describe("auth middleware", () => {
  let email: string = "123451@gmail.com";
  let password: string = "12345";
  let cookie: string = "";

  //get auth
  const login = async () => {
    const authRes = await request(app)
      .post("/api/auth")
      .send({ email, password });

    return authRes.headers["set-cookie"][0];
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
    cookie = await login();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  const exec = function () {
    return request(app).get("/api/users/me").set("Cookie", cookie); // Include the full cookie string
    // Expect HTTP status 200
  };

  it("should return 401 if the user did not login", async () => {
    cookie = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 200 if a valid session is passed", async () => {
    cookie = await login();
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
