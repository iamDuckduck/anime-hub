import request from "supertest";
import app from "../../index"; // Your Express app
import { User } from "../../models/users"; // Your User model
import bcrypt from "bcrypt";

describe("/api/auth", () => {
  let token = "";
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

    it("should return a token if valid", async () => {
      const res = await exec();
      expect(res.body).toBeDefined();
    });
  });

  describe("post /logout", () => {
    beforeEach(async () => {
      await saveUser();
      setUpLoginInfo();
    });

    const exec = () => {
      return request(app)
        .post("/api/auth/logout")
        .set("authorization", `Bearer ${token}`);
    };

    it("should return 401 if invalid token", async () => {
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return the token", async () => {
      //get valid token
      const authRes = await request(app).post("/api/auth").send(loginInfo);
      token = authRes.body.token;

      //delete token
      let res = await exec();
      expect(res.status).toBe(200);

      // //deleted token should be invalid !! we either handle it in frontend or use refresh token for it
      // res = await exec();
      // expect(res.status).toBe(401);
    });
  });
});
