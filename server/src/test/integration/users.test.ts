import request from "supertest";
import { User } from "../../models/users";
import { app } from "../../index";
import bcrypt from "bcrypt";
import { UserDoc } from "../../models/users";

describe("/api/users", () => {
  const email: string = "123451@gmail.com";
  const password: string = "12345";
  const userName: string = "12345";

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
      userName,
      email,
      password: hashedPassword,
    });
    return await user.save();
  };

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /me ", () => {
    let cookie = "";
    let userInDb: UserDoc;
    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();
    });

    const exec = function () {
      return request(app).get("/api/users/me").set("Cookie", cookie);
    };

    it("should return 401 if the user did not login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return user info if a valid token is passed", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userName", userInDb.userName);
      expect(res.body).toHaveProperty("email", userInDb.email);
    });
  });

  describe("Post / ", () => {
    let user: {
      userName: string;
      email: string;
      password: string;
    };
    beforeEach(async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = {
        userName,
        email,
        password: hashedPassword,
      };
    });

    const exec = function () {
      return request(app).post("/api/users/").send(user);
    };

    it("should return 400 if invaild register format", async () => {
      user.userName = "1";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if duplicated userName", async () => {
      await saveUser();
      user.email = "post123456@gmail.com";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toBe("duplicated userName");
    });

    it("should return 400 if duplicated email", async () => {
      await saveUser();
      user.userName = "post123456";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toBe("duplicated email");
    });

    it("should save the user if it is valid", async () => {
      const res = await exec();

      const userInDB = await User.find({ userName: user.userName });

      expect(res.status).toBe(200);
      expect(userInDB).not.toBeNull();
    });

    it("should return the saved user if it is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userName", user.userName);
      expect(res.body).toHaveProperty("email", user.email);
    });
  });

  describe("Put /", () => {
    let cookie = "";
    let userInDb: UserDoc; //idk what is the returned type of User(user).save()
    let newUserInfo: {
      userName: string;
      email: string;
      password: string;
    };

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();
      newUserInfo = {
        userName: userName,
        email: email,
        password: "12345",
      };
    });

    const exec = function () {
      return request(app)
        .put("/api/users/")
        .set("Cookie", cookie)
        .send(newUserInfo);
    };
    it("should return 401 if the user did not login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if the name is less than 5 character", async () => {
      newUserInfo.userName = "1";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if the name is larger than 50 character", async () => {
      newUserInfo.userName = new Array(52).join("a");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    //do we implement validate logic in mongoose schema too?
    it("should return 400 if the email is invaild", async () => {
      newUserInfo.email = "12345";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    //the passwords passed below are encrypted
    it("should return 400 if the password is less than 5 character", async () => {
      newUserInfo.password = "1";

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is larger than 255 character", async () => {
      newUserInfo.password = new Array(257).join("a");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if same info passed", async () => {
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should update the user if passed info is valid", async () => {
      newUserInfo.userName = "123456";

      const res = await exec();
      const updatedUser = await User.findById(userInDb._id);

      expect(res.status).toBe(200);
      expect(updatedUser).toHaveProperty("userName", newUserInfo.userName);
    });

    it("should return the updated user if passed info is valid", async () => {
      newUserInfo.userName = "123456";

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userName", newUserInfo.userName);
      expect(res.body).toHaveProperty("email", newUserInfo.email);
      expect(res.body).toHaveProperty("password", newUserInfo.password);
    });
  });

  describe("Delete /", () => {
    let cookie = "";
    let userInDb: UserDoc; //idk what is the returned type of User(user).save()
    let newUserInfo: {
      userName: string;
      email: string;
      password: string;
    };

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();
    });

    const exec = function () {
      return request(app).delete("/api/users/").set("Cookie", cookie);
    };

    it("should return 401 if the user did not login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should delete the user", async () => {
      const res = await exec();

      const deletedUser = await User.findById(userInDb._id);

      expect(res.status).toBe(200);
      expect(deletedUser).toBe(null);
    });

    it("should return the deleted the user", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userName", userInDb.userName);
      expect(res.body).toHaveProperty("email", userInDb.email);
      expect(res.body).toHaveProperty("password", userInDb.password);
    });
  });
});
