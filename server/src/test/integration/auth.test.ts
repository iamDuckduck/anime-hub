import request from "supertest";
import { app } from "../../index"; // Your Express app
import { User } from "../../models/users"; // Your User model
import bcrypt from "bcrypt";
describe("/api/auth", () => {
  let email: string;
  let password: string;
  let userName: string;
  let loginInfo: { email: string; password: string };
  let user: any;

  beforeEach(async () => {
    // Create a test user
    email = "test@example.com";
    password = "password123";
    userName = "test123";

    loginInfo = { email, password };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ userName, email, password: hashedPassword });
    await user.save();
  });

  afterEach(async () => {
    // Clean up after each test
    await User.deleteMany({});
  });

  const exec = () => {
    return request(app).post("/api/auth").send(loginInfo);
  };

  it("should return 400 if invalid body req", async () => {
    loginInfo.email = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if incorrect email", async () => {
    loginInfo.email = "wrong@gmail.com";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return a cookie if valid", async () => {
    const res = await exec();
    expect(res.headers["set-cookie"]).toBeDefined();
  });
});
