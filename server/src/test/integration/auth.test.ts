import request from "supertest";
import app from "../../index"; // Your Express app
import { User } from "../../models/users"; // Your User model
import bcrypt from "bcrypt";

describe("/api/auth", () => {
  let cookie = "";
  let email = "test@example.com";
  let password = "password123";
  let userName = "test123";
  let user: any;
  let loginInfo = { email, password };

  const saveUser = async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ userName, email, password: hashedPassword });
    await user.save();
  };

  const setUpLoginInfo = () => {
    loginInfo = { email, password };
  };

  afterEach(async () => {
    // Clean up after each test
    await User.deleteMany({});
  });

  describe("Post /", () => {
    beforeEach(async () => {
      await saveUser();
      setUpLoginInfo();
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

  describe("post /logout", () => {
    beforeEach(async () => {
      await saveUser();
      setUpLoginInfo();
    });

    const exec = () => {
      return request(app).post("/api/auth/logout").set("Cookie", cookie);
    };

    it("should return 401 if invalid cookie", async () => {
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return the deleted cookie", async () => {
      //get valid cookie
      const authRes = await request(app).post("/api/auth").send(loginInfo);
      cookie = authRes.headers["set-cookie"];

      //delete session
      let res = await exec();
      expect(res.status).toBe(200);

      //deleted session should be invalid
      res = await exec();
      expect(res.status).toBe(401);
    });
  });
});
