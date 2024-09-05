import { WatchList, watchListDoc } from "../../models/watchList";
import { Types } from "mongoose";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../index";
import { User, UserDoc } from "../../models/users";

interface templateUser {
  userName: string;
  email: string;
  password: string;
}

describe("/api/watchList", () => {
  afterEach(async () => {
    await WatchList.deleteMany({});
    await User.deleteMany({});
  });

  describe("GET /myList", () => {
    let token: string;
    let user: templateUser;
    let userInDb: UserDoc;
    beforeEach(async () => {
      user = {
        userName: "12345",
        email: "12345@gmail.com",
        password: "12345",
      };

      userInDb = await new User(user).save();
      token = userInDb.generateAuthToken();
    });

    const exec = function () {
      return request(app)
        .get("/api/watchList/myList")
        .set("x-auth-token", token);
    };
    it("should return 401 if the user didn't login", async () => {
      token = "";
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
      expect(res.body).toHaveProperty("userId", watchListInDb.userId);
    });
  });

  describe("Post /", () => {
    let token: string;
    let user: templateUser;
    let userInDb: UserDoc;
    let newWatchList: {
      userId: Types.ObjectId;
      name: string;
    };
    beforeEach(async () => {
      user = {
        userName: "12345",
        email: "12345@gmail.com",
        password: "12345",
      };
      userInDb = await new User(user).save();
      token = userInDb.generateAuthToken();
    });

    const exec = function () {
      return request(app)
        .post("/api/watchList/")
        .set("x-auth-token", token)
        .send(newWatchList);
    };

    it("should return 401 if the user didn't login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 401 if the user trying to add watchList to another user", async () => {
      const userAInDb = await new User({
        userName: "12345A",
        email: "12345A@gmail.com",
        password: "12345",
      }).save();

      newWatchList = {
        userId: userAInDb._id,
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
      await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

      newWatchList = {
        userId: userInDb._id,
        name: "summer 2024",
      };
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should add the watchList", async () => {
      await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

      newWatchList = {
        userId: userInDb._id,
        name: "summer 2025",
      };
      const res = await exec();

      const userInDB = await WatchList.find({
        userId: userInDb._id,
        name: "summer 2025",
      });

      expect(res.status).toBe(200);
      expect(userInDB).not.toBeNull();
    });

    it("should return the watchList", async () => {
      await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

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

  describe("Put /", () => {
    let token: string;
    let userInDb: UserDoc;
    let watchListInDb: watchListDoc;
    let watchListId: Types.ObjectId;
    let newWatchList: {
      userId: Types.ObjectId;
      name: string;
    };

    beforeEach(async () => {
      userInDb = await new User({
        userName: "12345",
        email: "12345@gmail.com",
        password: "12345",
      }).save();

      watchListInDb = await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

      watchListId = watchListInDb._id;
      token = userInDb.generateAuthToken();
    });

    const exec = function () {
      return request(app)
        .put("/api/watchList")
        .set("x-auth-token", token)
        .set("watchListId", watchListId.toString())
        .send(newWatchList);
    };

    it("should return 401 if the user didn't login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if no valid watchListId provided", async () => {
      watchListId = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid watchListId");
    });

    it("should return 401 if the user trying to modify watchList of another user", async () => {
      const userAInDb = await new User({
        userName: "12345A",
        email: "12345A@gmail.com",
        password: "12345",
      }).save();

      newWatchList = {
        userId: userAInDb._id,
        name: "1",
      };

      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if name is null", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: "",
      };
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid info");
    });

    it("should return 400 if name is more than 80 characters", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: new Array(82).join(),
      };
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid info");
    });

    it("should update and return the watchList if valid", async () => {
      newWatchList = {
        userId: userInDb._id,
        name: "summer 2025",
      };
      const res = await exec();

      const updatedWatchList = await WatchList.findById(watchListInDb._id);

      expect(res.status).toBe(200);
      expect(updatedWatchList).toHaveProperty("name", newWatchList.name);
      expect(res.body).toHaveProperty("name", newWatchList.name);
    });
  });

  describe("DELETE /", () => {
    let token: string;
    let userInDb: UserDoc;
    let watchListInDb: watchListDoc;
    let watchListId: Types.ObjectId | string;

    beforeEach(async () => {
      userInDb = await new User({
        userName: "12345",
        email: "12345@gmail.com",
        password: "12345",
      }).save();

      watchListInDb = await new WatchList({
        userId: userInDb._id,
        name: "summer 2024",
      }).save();

      watchListId = watchListInDb._id;
      token = userInDb.generateAuthToken();
    });
    const exec = function () {
      return request(app)
        .delete("/api/watchList/")
        .set("x-auth-token", token)
        .send({ watchListId: watchListId });
    };
    it("should return 401 if not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if watchListId's Types.ObjectId is inValid", async () => {
      watchListId = "1";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if invalid watchId is sent", async () => {
      watchListId = new mongoose.Types.ObjectId();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid watchListId");
    });

    it("should return 401 if the user trying to delete watchList of another user", async () => {
      const userAInDb = await new User({
        userName: "12345A",
        email: "12345A@gmail.com",
        password: "12345",
      }).save();

      const user_A_watch_list = await new WatchList({
        userId: userAInDb._id,
        name: "1",
      }).save();

      watchListId = user_A_watch_list._id;
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should detele the watchllist", async () => {
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
