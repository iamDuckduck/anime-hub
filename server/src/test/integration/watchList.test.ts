import { WatchList, watchListDoc } from "../../models/watchList";
import { Types } from "mongoose";
import mongoose from "mongoose";
import request from "supertest";
import app from "../../index";
import { User, UserDoc } from "../../models/users";
import bcrypt from "bcrypt";

describe("/api/watchList", () => {
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
    await WatchList.deleteMany({});
    await User.deleteMany({});
  });

  describe("GET /myList", () => {
    let cookie = "";
    let userInDb: UserDoc;

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();
    });

    const exec = function () {
      return request(app).get("/api/watchList/myList").set("Cookie", cookie);
    };

    it("should return 401 if the user didn't login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return user's animelists if login", async () => {
      const watchListInDb = await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", watchListInDb.name);
      expect(res.body).toHaveProperty(
        "userId",
        watchListInDb.userId.toString()
      );
    });
  });

  describe("Post /", () => {
    let cookie = "";
    let userInDb: UserDoc;
    let newWatchList: {
      userId: Types.ObjectId;
      name: string;
    };

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();
    });

    const exec = function () {
      return request(app)
        .post("/api/watchList/")
        .set("Cookie", cookie)
        .send(newWatchList);
    };

    it("should return 401 if the user didn't login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 401 if the user trying to add watchList to another user", async () => {
      const newUserInDb = await new User({
        userName: "12345A",
        email: "12345A@gmail.com",
        password: "12345",
      }).save();

      newWatchList = {
        userId: newUserInDb._id,
        name: "1",
      };

      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if name is empty", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: "",
      };

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if name is larger than 80", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: new Array(82).join("a"),
      };

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if the user created duplicated anime", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: "summer 2024",
      };
      await new WatchList(newWatchList).save();

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should add the watchList", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: "summer 2025",
      };

      const res = await exec();
      const watchListInDb = await WatchList.find(newWatchList);

      expect(res.status).toBe(200);
      expect(watchListInDb).not.toBeNull();
    });

    it("should return the watchList", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: "summer 2025",
      };

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userId", newWatchList.userId.toString());
      expect(res.body).toHaveProperty("name", newWatchList.name);
    });
  });

  describe("Put /:id", () => {
    let cookie = "";
    let userInDb: UserDoc;

    let watchListInDb: watchListDoc;
    let watchListId: Types.ObjectId | string;
    let newWatchList: {
      userId: Types.ObjectId | string;
      name: string;
    };

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();

      watchListInDb = await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

      watchListId = watchListInDb._id;
      newWatchList = {
        userId: userInDb._id,
        name: "summer 2025",
      };
    });

    const exec = function () {
      return request(app)
        .put(`/api/watchList/${watchListId}`)
        .set("Cookie", cookie)
        .send({ newWatchList });
    };

    it("should return 401 if the user didn't login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if provided userId invalid ", async () => {
      newWatchList.userId = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if name is null", async () => {
      newWatchList.name = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if name is more than 80 characters", async () => {
      newWatchList.name = new Array(82).join();
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if provided watchListId invalid", async () => {
      watchListId = "1";

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid watchListId");
    });

    it("should return 400 if provided watchListId not found", async () => {
      watchListId = new mongoose.Types.ObjectId();

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("provided watchListId not found");
    });

    it("should return 401 if the user trying to modify watchList of another user", async () => {
      newWatchList.userId = new mongoose.Types.ObjectId();

      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should update and return the watchList if valid", async () => {
      const res = await exec();

      const updatedWatchList = await WatchList.findById(watchListInDb._id);

      expect(res.status).toBe(200);
      expect(updatedWatchList).toHaveProperty("name", newWatchList.name);
      expect(res.body).toHaveProperty("name", newWatchList.name);
    });
  });

  describe("DELETE /:id", () => {
    let cookie = "";
    let userInDb: UserDoc;

    let watchListInDb: watchListDoc;
    let watchListId: Types.ObjectId | string;

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();

      watchListInDb = await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

      watchListId = watchListInDb._id;
    });
    const exec = function () {
      return request(app)
        .delete(`/api/watchList/${watchListId}`)
        .set("Cookie", cookie);
    };

    it("should return 401 if not login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if watchListId's Types.ObjectId is inValid", async () => {
      watchListId = "1";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if watchListId not found", async () => {
      watchListId = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("watchList not found");
    });

    it("should return 401 if the user trying to delete watchList of another user", async () => {
      const newUserWatchList = await new WatchList({
        userId: new mongoose.Types.ObjectId(),
        name: "1",
      }).save();

      watchListId = newUserWatchList._id;
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should detele the watchList", async () => {
      const res = await exec();
      const watchListInDb = await WatchList.findById(watchListId);
      expect(res.status).toBe(200);
      expect(watchListInDb).toBeNull();
    });

    it("should return the deteled the watchllist", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", "summer 2024");
    });
  });
});
