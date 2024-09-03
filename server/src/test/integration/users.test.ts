import request from "supertest";
import { User } from "../../models/users";
import { app } from "../../index";
import bcrypt from "bcrypt";
import { UserDoc } from "../../models/users";

interface templateUser {
  userName: string;
  email: string;
  password: string;
}
describe("/api/users", () => {
  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /me ", () => {
    let token: string;
    let user: templateUser;
    beforeEach(async () => {
      user = {
        userName: "12345",
        email: "12345@gmail.com",
        password: "12345",
      };
    });

    const exec = function () {
      return request(app).get("/api/users/me").set("x-auth-token", token);
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return user info if a valid token is passed", async () => {
      const userInDB = new User(user);
      await userInDB.save();

      token = userInDB.generateAuthToken();
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userName", user.userName);
      expect(res.body).toHaveProperty("email", user.email);
    });
  });

  describe("Post / ", () => {
    let user: templateUser;
    beforeEach(async () => {
      user = {
        userName: "12345",
        email: "12345@gmail.com",
        password: "12345",
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
      const dbUser = new User(user);
      await dbUser.save();
      user.email = "post123456@gmail.com";

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toBe("duplicated userName");
    });

    it("should return 400 if duplicated email", async () => {
      const dbUser = new User(user);
      await dbUser.save();
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
    let user: templateUser;
    let userInDB: UserDoc; //idk what is the returned type of User(user).save()
    let token: string;
    let newInfo: object;
    let salt: string;
    beforeEach(async () => {
      salt = await bcrypt.genSalt(10);
      user = {
        userName: "12345",
        email: "12345@gmail.com",
        password: await bcrypt.hash("12345", salt),
      };

      userInDB = await new User(user).save();
      token = userInDB.generateAuthToken();
    });

    const exec = function () {
      return request(app)
        .put("/api/users/")
        .set("x-auth-token", token)
        .send(newInfo);
    };
    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if the name is less than 5 character", async () => {
      user.userName = "1";
      newInfo = user;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if the name is larger than 50 character", async () => {
      user.userName = new Array(52).join("a");
      newInfo = user;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    //do we implement validate logic in mongoose schema too?
    it("should return 400 if the email is invaild", async () => {
      user.email = "12345";
      newInfo = user;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    //the passwords passed below are encrypted
    it("should return 400 if the password is less than 5 character", async () => {
      user.password = "1";
      newInfo = user;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is larger than 255 character", async () => {
      user.password = new Array(257).join("a");
      newInfo = user;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if same info passed", async () => {
      newInfo = user;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should update the user if passed info is valid", async () => {
      user.userName = "123456";
      newInfo = user;
      const res = await exec();
      const updatedUser = await User.findById(userInDB._id);

      expect(res.status).toBe(200);
      expect(updatedUser).toHaveProperty("userName", user.userName);
    });

    it("should return the updated user if passed info is valid", async () => {
      user.userName = "123456";
      newInfo = user;
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userName", user.userName);
      expect(res.body).toHaveProperty("email", user.email);
      expect(res.body).toHaveProperty("password", user.password);
    });
  });

  describe("Delete /", () => {
    let token: string;
    let user: templateUser;
    let userInDB: UserDoc;
    beforeEach(async () => {
      user = {
        userName: "12345",
        email: "12345@gmail.com",
        password: "12345",
      };

      userInDB = await new User(user).save();
      token = userInDB.generateAuthToken();
    });

    const exec = function () {
      return request(app).delete("/api/users/").set("x-auth-token", token);
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should delete the user", async () => {
      const res = await exec();

      const deletedUser = await User.findById(userInDB._id);

      expect(res.status).toBe(200);
      expect(deletedUser).toBe(null);
    });

    it("should return the deleted the user", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userName", user.userName);
      expect(res.body).toHaveProperty("email", user.email);
      expect(res.body).toHaveProperty("password", user.password);
    });
  });
});
