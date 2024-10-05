import request from "supertest";
import { User } from "../../models/users";
import app from "../../index";
import bcrypt from "bcrypt";
import { UserDoc } from "../../models/users";

describe("/api/users", () => {
  const email: string = "123451@gmail.com";
  const password: string = "12345";
  const userName: string = "12345";
  const profileImage: string =
    "https://res.cloudinary.com/drbighiyo/image/upload/v1726897677/user/ehbo9vd8kbxpfpmtfykl.jpg";
  const bannerImage: string =
    "https://res.cloudinary.com/drbighiyo/image/upload/v1726910174/user/ayctbuje418140gbij5z.jpg";

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
      userName,
      email,
      password: hashedPassword,
      profileImage,
      bannerImage,
    });
    return await user.save();
  };

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("GET /me ", () => {
    let token = "";
    let userInDb: UserDoc;
    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();
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
      user.email = "post123456@gmail.com"; // aviod duplicated email

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.text).toBe("duplicated userName");
    });

    it("should return 400 if duplicated email", async () => {
      await saveUser();
      user.userName = "post123456"; // aviod duplicated userName

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

    it("should return the token if it is valid", async () => {
      const res = await exec();
      expect(res.body.token).toBeDefined();
    });
  });

  describe("Put /", () => {
    let token = "";
    let userInDb: UserDoc;
    let newUserInfo: {
      userName?: string;
      email?: string;
      password?: string | undefined;
      profileImage?: string;
      bannerImage?: string;
    };

    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();
      newUserInfo = {
        userName: userName,
        email: email,
        password: "12345",
        profileImage:
          "https://res.cloudinary.com/drbighiyo/image/upload/v1726897677/user/ehbo9vd8kbxpfpmtfykl.jpg",
        bannerImage:
          "https://res.cloudinary.com/drbighiyo/image/upload/v1726910174/user/ayctbuje418140gbij5z.jpg",
      };
    });

    const exec = function () {
      return request(app)
        .put("/api/users/")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`) // Pass the JWT token
        .send(newUserInfo);
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
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

    //the passwords passed below are encrypted, but i just hard code here
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

    it("should return 400 if profileImage format is invalid", async () => {
      newUserInfo.profileImage = new Array(257).join("a");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if bannerImg format is invalid", async () => {
      newUserInfo.profileImage = new Array(257).join("a");

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if same info passed (with password)", async () => {
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if same info passed (without password)", async () => {
      newUserInfo.password = undefined;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if partically same info passed ", async () => {
      newUserInfo.userName = "1234554321"; //(only userName is not the same)

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return the updated user (with password)", async () => {
      newUserInfo = {
        password: "1234554321",
        email: "testtest@gmail.com",
      };

      const res = await exec();

      const updatedUser = await User.findById(userInDb._id);
      const passwordCompare = await bcrypt.compare(
        "1234554321",
        updatedUser!.password
      );

      expect(res.status).toBe(200);
      expect(passwordCompare).toBe(true);
      expect(res.body).toHaveProperty("email", newUserInfo.email);
    });

    it("should return the updated user (without password)", async () => {
      newUserInfo = {
        email: "testtest@gmail.com",
        userName: "testtest@gmail.com",
      };

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("email", newUserInfo.email);
      expect(res.body).toHaveProperty("userName", newUserInfo.userName);
    });
  });

  describe("Delete /", () => {
    let token = "";
    let userInDb: UserDoc; //idk what is the returned type of User(user).save()

    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();
    });

    const exec = function () {
      return request(app)
        .delete("/api/users/")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`); // Pass the JWT token;
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
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
