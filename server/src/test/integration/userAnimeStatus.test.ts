import request from "supertest";
import { User, UserDoc } from "../../models/users";
import {
  userAnimeStatus,
  userAnimeStatusDoc,
} from "../../models/userAnimeStatus";
import app from "../../index";
import _ from "lodash";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import { tempAnime } from "../testData/animeTemp";
import { Anime } from "../../models/anime";
import { userAnimeStatusTemp } from "../testData/userAnimeStatusTemp";

describe("/api/userAnimeStatus", () => {
  let email: string = "123451@gmail.com";
  let password: string = "12345";

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
    return await user.save();
  };

  const getAnime = () => {
    return tempAnime;
  };

  afterEach(async () => {
    await userAnimeStatus.deleteMany({});
    await User.deleteMany({});
  });

  describe("Get /myStatus", () => {
    let token: string = "";
    let userInDb: UserDoc;
    let userAnimeStatusInDb: userAnimeStatusDoc;

    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();

      const anime = getAnime();
      await new Anime(anime).save();

      // Shallow copy userAnimeStatusTemp
      const userAnimeStatusTempCopy = { ...userAnimeStatusTemp };

      userAnimeStatusInDb = new userAnimeStatus(
        _.set(userAnimeStatusTempCopy, "userId", userInDb._id)
      );

      userAnimeStatusInDb = await userAnimeStatusInDb.save();
    });

    const exec = function () {
      return request(app)
        .get("/api/userAnimeStatus/myStatus")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`);
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return animeStatus info if a valid session is passed", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty("animeID", 54309);
    });
  });

  describe("Post /", () => {
    let token: string = "";
    let userInDb: UserDoc;
    let userAnimeStatusInDb: any;
    let newUserAnimeStatus: any;

    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();

      const anime = getAnime();
      await new Anime(anime).save();

      const userAnimeStatusTempCopy = _.cloneDeep(userAnimeStatusTemp);
      newUserAnimeStatus = userAnimeStatusTempCopy;

      const userAnimeStatusTempCopy2 = _.cloneDeep(userAnimeStatusTemp);
      userAnimeStatusInDb = new userAnimeStatus(
        _.set(userAnimeStatusTempCopy2, "userId", userInDb._id)
      );
    });

    const exec = function () {
      return request(app)
        .post("/api/userAnimeStatus")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send(newUserAnimeStatus);
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if duplicated animeStatus", async () => {
      await new userAnimeStatus(userAnimeStatusInDb).save();

      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("duplicated animeStatus");
    });

    it("should save the status", async () => {
      const res = await exec();

      const savedAnimeStatus = await userAnimeStatus.findById(res.body._id);
      expect(res.status).toBe(200);
      expect(savedAnimeStatus).not.toBeNull();
    });

    it("should return the saved anime", async () => {
      const res = await exec();
      const savedAnimeStatus = await userAnimeStatus.findById(res.body._id);
      const diff =
        new Date().getTime() - savedAnimeStatus!.created_at.getTime();
      expect(diff).toBeLessThan(10 * 1000);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "userId",
        userAnimeStatusInDb.userId.toString()
      );
    });
    // it("should return 401 if the user trying to add animeList to another user", async () => {
    //   newAnimeList.userId = new mongoose.Types.ObjectId();

    //   const res = await exec();
    //   expect(res.status).toBe(401);
    //   expect(res.text).toBe("unauthorized you can't post animeList for others");
    // });
  });

  describe("Put /:id", () => {
    let token = "";
    let userInDb: UserDoc;
    let id: string;
    let userAnimeStatusInDb: any;
    let newUserAnimeStatus: any;

    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();

      const anime = getAnime();
      await new Anime(anime).save();

      const userAnimeStatusTempCopy = _.cloneDeep(userAnimeStatusTemp);
      newUserAnimeStatus = _.set(
        userAnimeStatusTempCopy,
        "updated_at",
        new Date()
      );

      const userAnimeStatusTempCopy2 = _.cloneDeep(userAnimeStatusTemp);
      userAnimeStatusInDb = new userAnimeStatus(
        _.set(userAnimeStatusTempCopy2, "userId", userInDb._id)
      );

      await userAnimeStatusInDb.save();
      id = userAnimeStatusInDb._id;
      // userAnimeListInDb = new userAnimeStatus(
      //   JSON.parse(JSON.stringify(animeListTemplate))
      // );
      // userAnimeListInDb.userId = userInDb._id;
      // await userAnimeListInDb.save();
      // id = userAnimeListInDb._id.toString();

      // newAnimeList = JSON.parse(JSON.stringify(animeListTemplate));
      // newAnimeList.updated_at = new Date();
      // delete newAnimeList.userId;
    });
    const exec = function () {
      return request(app)
        .put(`/api/userAnimeStatus/${id}`)
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send(newUserAnimeStatus);
    };

    it("should return 401 if user no login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    //invalid animeStatusID
    it("should return 400 if animeStatusID invalid", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("animeStatusID isn't a valid objectId");
    });

    //animeStatusID unmatch
    it("should return 400 if animeStatusID doesn't match", async () => {
      id = new mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid animeStatusID");
    });

    it("should return updated animeStatus (only uploading a part of the info) ", async () => {
      newUserAnimeStatus = _.set(newUserAnimeStatus, "currentEpisode", 11);
      delete newUserAnimeStatus.status;

      const res = await exec();
      const diff =
        new Date().getTime() - userAnimeStatusInDb.updated_at.getTime();
      expect(diff).toBeLessThan(10 * 1000);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "userWatchListIDs",
        newUserAnimeStatus.userWatchListIDs
      );
      expect(res.body).toHaveProperty("animeID", newUserAnimeStatus.animeID);
      expect(res.body).toHaveProperty(
        "currentEpisode",
        newUserAnimeStatus.currentEpisode
      );
      expect(res.body).toHaveProperty("expectedFinishDate", null);
    });

    // //return data
    // it("should return updated animeList ", async () => {
    //   newUserAnimeStatus = _.set(newUserAnimeStatus, "currentEpisode", 11);

    //   const res = await exec();

    //   const diff =
    //     new Date().getTime() - userAnimeStatusInDb.updated_at.getTime();
    //   expect(diff).toBeLessThan(10 * 1000);

    //   expect(res.status).toBe(200);

    //   expect(res.body).toHaveProperty(
    //     "userWatchListIDs",
    //     newUserAnimeStatus.userWatchListIDs
    //   );

    //   expect(res.body).toHaveProperty("animeID", newUserAnimeStatus.animeID);
    //   expect(res.body).toHaveProperty("status", newUserAnimeStatus.status);
    //   expect(res.body).toHaveProperty(
    //     "currentEpisode",
    //     newUserAnimeStatus.currentEpisode
    //   );
    //   expect(res.body).toHaveProperty("expectedFinishDate", null);
    // });

    // it("should return 400 if watchId is invalid ", async () => {
    //   newAnimeList.watchListIds = [123] as unknown as Types.ObjectId[]; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return 400 if anime is invalid ", async () => {
    //   newAnimeList.anime.genre = [123] as unknown as string; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return 400 if status is invalid ", async () => {
    //   newAnimeList.status = "123"; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return 400 if currentEpisode is invalid ", async () => {
    //   newAnimeList.currentEpisode = "222d" as unknown as number; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return 400 if expectedFinishDate is invalid ", async () => {
    //   newAnimeList.expectedFinishDate = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return 400 if created_at is invalid ", async () => {
    //   newAnimeList.created_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return 400 if updated_at is invalid  ", async () => {
    //   newAnimeList.updated_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });
  });

  describe("Delete /:id", () => {
    let token = "";
    let userInDb: UserDoc;
    let userAnimeStatusInDb: userAnimeStatusDoc;
    let id: string;

    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();

      const userAnimeStatusTempCopy2 = _.cloneDeep(userAnimeStatusTemp);
      userAnimeStatusInDb = new userAnimeStatus(
        _.set(userAnimeStatusTempCopy2, "userId", userInDb._id)
      );
      await userAnimeStatusInDb.save();

      id = userAnimeStatusInDb._id.toString();
    });

    const exec = function () {
      return request(app)
        .delete(`/api/userAnimeStatus/${id}`)
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`);
    };

    it("should return 400 if user no login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    //invalid animeStatusID
    it("should return 400 if animeStatusID invalid", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("animeStatusID isn't a valid objectId");
    });

    it("should return 400 if animeStatusID doesn't match", async () => {
      id = new mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid animeStatusID");
    });

    //return data
    it("should delete the animeList ", async () => {
      const res = await exec();
      const deletedAnimeList = await userAnimeStatus.findById(id);
      expect(res.status).toBe(200);
      expect(deletedAnimeList).toBeNull();
    });

    it("should return the deleted the animeList ", async () => {
      const res = await exec();

      expect(res.status).toBe(200);

      expect(res.body).toHaveProperty(
        "userWatchListIDs",
        userAnimeStatusInDb.userWatchListIDs
      );

      expect(res.body).toHaveProperty("animeID", userAnimeStatusInDb.animeID);
      expect(res.body).toHaveProperty("status", userAnimeStatusInDb.status);
      expect(res.body).toHaveProperty(
        "currentEpisode",
        userAnimeStatusInDb.currentEpisode
      );
      expect(res.body).toHaveProperty("expectedFinishDate", null);

      expect(res.body).toHaveProperty(
        "created_at",
        userAnimeStatusInDb.created_at.toISOString() //whY?
      );
      expect(res.body).toHaveProperty(
        "updated_at",
        userAnimeStatusInDb.updated_at.toISOString() //whY?
      );
    });
  });
});
