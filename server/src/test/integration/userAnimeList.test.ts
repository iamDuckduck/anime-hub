import request from "supertest";
import { User, UserDoc } from "../../models/users";
import { userAnimeList, userAnimeListDoc } from "../../models/userAnimeList";
import { app } from "../../index";
import _ from "lodash";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";

describe("/api/animeList", () => {
  let email: string = "123451@gmail.com";
  let password: string = "12345";

  const animeListTemplate = {
    userId: new mongoose.Types.ObjectId(),
    watchListIds: [],
    anime: {
      animeId: "54309",
      status: "finished Airing",
      format: "TV",
      title: "ブルーアーカイブ The Animation",
      imageUrl: "https://cdn.myanimelist.net/images/anime/1739/140995.jpg",
      genre: "Action",
      totalEpisodes: 12,
      score: 7.07,
      year: "2024",
    },
    status: "Completed",
    currentEpisode: 12,
  };

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
    return await user.save();
  };

  afterEach(async () => {
    await userAnimeList.deleteMany({});
    await User.deleteMany({});
  });

  describe("Get /myList", () => {
    let cookie: string = "";
    let userInDb: UserDoc;
    let userAnimeListInDb: userAnimeListDoc;

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();

      //save animeList
      userAnimeListInDb = new userAnimeList(
        JSON.parse(JSON.stringify(animeListTemplate))
      );
      userAnimeListInDb.userId = userInDb._id;
      userAnimeListInDb = await userAnimeListInDb.save();
    });

    const exec = function () {
      return request(app)
        .get("/api/userAnimeList/myList")
        .set("Cookie", cookie);
    };

    it("should return 401 if the user did not login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return animeList info if a valid session is passed", async () => {
      const res = await exec();
      const diff =
        new Date().getTime() - userAnimeListInDb.created_at.getTime();

      expect(res.status).toBe(200);
      expect(diff).toBeLessThan(10 * 1000);
      expect(res.body[0]).toHaveProperty(
        "userId",
        userAnimeListInDb.userId.toString()
      );
      expect(res.body[0]).toHaveProperty(
        "watchListIds",
        userAnimeListInDb.watchListIds
      );
      expect(res.body[0]).toHaveProperty("anime", userAnimeListInDb.anime);
      expect(res.body[0]).toHaveProperty("status", userAnimeListInDb.status);
      expect(res.body[0]).toHaveProperty(
        "currentEpisode",
        userAnimeListInDb.currentEpisode
      );
      expect(res.body[0]).toHaveProperty(
        "expectedFinishDate",
        userAnimeListInDb.expectedFinishDate
      );
    });
  });

  describe("Post /", () => {
    let cookie: string = "";
    let userInDb: UserDoc;
    let newAnimeList: any;

    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();

      newAnimeList = JSON.parse(JSON.stringify(animeListTemplate));
      newAnimeList.userId = userInDb._id;
    });
    const exec = function () {
      return request(app)
        .post("/api/userAnimeList")
        .set("Cookie", cookie)
        .send(newAnimeList);
    };

    it("should return 401 if the user did not login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if provided userId invalid ", async () => {
      newAnimeList.userId = 123 as unknown as Types.ObjectId; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if watchId is invalid ", async () => {
      newAnimeList.watchListIds = [123] as unknown as Types.ObjectId[]; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if anime is invalid ", async () => {
      newAnimeList.anime.genre = [123] as unknown as string; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if status is invalid ", async () => {
      newAnimeList.status = "123"; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if currentEpisode is invalid ", async () => {
      newAnimeList.currentEpisode = "222d" as unknown as number; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if expectedFinishDate is invalid ", async () => {
      newAnimeList.expectedFinishDate = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 401 if the user trying to add animeList to another user", async () => {
      newAnimeList.userId = new mongoose.Types.ObjectId();

      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.text).toBe("unauthorized you can't post animeList for others");
    });

    it("should return 400 if duplicated animeList", async () => {
      await new userAnimeList(newAnimeList).save();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("duplicated animeList");
    });

    it("should save the anime", async () => {
      const res = await exec();

      const savedAnimeList = await userAnimeList.findById(res.body._id);
      expect(res.status).toBe(200);
      expect(savedAnimeList).not.toBeNull();
    });

    it("should return the saved anime", async () => {
      const res = await exec();

      const savedAnimeList = await userAnimeList.findById(res.body._id);
      const diff = new Date().getTime() - savedAnimeList!.created_at.getTime();

      expect(diff).toBeLessThan(10 * 1000);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("userId", newAnimeList.userId.toString());
      expect(res.body).toHaveProperty(
        "watchListIds",
        newAnimeList.watchListIds
      );

      expect(res.body).toHaveProperty("anime", newAnimeList.anime);
      expect(res.body).toHaveProperty("status", newAnimeList.status);
      expect(res.body).toHaveProperty(
        "currentEpisode",
        newAnimeList.currentEpisode
      );
      expect(res.body).toHaveProperty("expectedFinishDate", null);
    });
  });

  describe("Put /:id", () => {
    let cookie = "";
    let userInDb: UserDoc;
    let id: string;
    let newAnimeList: any;

    let userAnimeListInDb: userAnimeListDoc;
    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();

      userAnimeListInDb = new userAnimeList(
        JSON.parse(JSON.stringify(animeListTemplate))
      );
      userAnimeListInDb.userId = userInDb._id;
      await userAnimeListInDb.save();
      id = userAnimeListInDb._id.toString();

      newAnimeList = JSON.parse(JSON.stringify(animeListTemplate));
      newAnimeList.updated_at = new Date();
      delete newAnimeList.userId;
    });
    const exec = function () {
      return request(app)
        .put(`/api/userAnimeList/${id}`)
        .set("Cookie", cookie)
        .send(newAnimeList);
    };

    it("should return 401 if user no login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    //invalid animeListId
    it("should return 400 if animeListId invalid", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("animeListId isn't a valid objectId");
    });

    //animeListId unmatch
    it("should return 400 if animeListId doesn't match", async () => {
      id = new mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid animeListId");
    });

    it("should return 400 if watchId is invalid ", async () => {
      newAnimeList.watchListIds = [123] as unknown as Types.ObjectId[]; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if anime is invalid ", async () => {
      newAnimeList.anime.genre = [123] as unknown as string; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if status is invalid ", async () => {
      newAnimeList.status = "123"; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if currentEpisode is invalid ", async () => {
      newAnimeList.currentEpisode = "222d" as unknown as number; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if expectedFinishDate is invalid ", async () => {
      newAnimeList.expectedFinishDate = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if created_at is invalid ", async () => {
      newAnimeList.created_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if updated_at is invalid  ", async () => {
      newAnimeList.updated_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return updated animeList (only uploading a part of the info) ", async () => {
      // Remove the 'age' property
      delete newAnimeList.currentEpisode;
      const res = await exec();

      const diff =
        new Date().getTime() - userAnimeListInDb.updated_at.getTime();
      expect(diff).toBeLessThan(10 * 1000);

      expect(res.status).toBe(200);

      expect(res.body).toHaveProperty(
        "watchListIds",
        newAnimeList.watchListIds
      );

      expect(res.body).toHaveProperty("anime", newAnimeList.anime);
      expect(res.body).toHaveProperty("status", newAnimeList.status);
      expect(res.body).toHaveProperty("expectedFinishDate", null);
    });

    //return data
    it("should return updated animeList ", async () => {
      const res = await exec();

      const diff =
        new Date().getTime() - userAnimeListInDb.updated_at.getTime();
      expect(diff).toBeLessThan(10 * 1000);

      expect(res.status).toBe(200);

      expect(res.body).toHaveProperty(
        "watchListIds",
        newAnimeList.watchListIds
      );

      expect(res.body).toHaveProperty("anime", newAnimeList.anime);
      expect(res.body).toHaveProperty("status", newAnimeList.status);
      expect(res.body).toHaveProperty(
        "currentEpisode",
        newAnimeList.currentEpisode
      );
      expect(res.body).toHaveProperty("expectedFinishDate", null);
    });
  });

  describe("Delete /:id", () => {
    let cookie = "";
    let userInDb: UserDoc;
    let id: string;

    let userAnimeListInDb: userAnimeListDoc;
    beforeEach(async () => {
      userInDb = await saveUser();
      cookie = await login();

      userAnimeListInDb = new userAnimeList(
        JSON.parse(JSON.stringify(animeListTemplate))
      );
      userAnimeListInDb.userId = userInDb._id;
      await userAnimeListInDb.save();

      id = userAnimeListInDb._id.toString();
    });

    const exec = function () {
      return request(app)
        .delete(`/api/userAnimeList/${id}`)
        .set("Cookie", cookie);
    };

    it("should return 400 if user no login", async () => {
      cookie = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    //invalid animeListId
    it("should return 400 if animeListId invalid", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("animeListId isn't a valid objectId");
    });

    it("should return 400 if animeListId doesn't match", async () => {
      id = new mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid animeListId");
    });

    //return data
    it("should delete the animeList ", async () => {
      const res = await exec();
      const deletedAnimeList = await userAnimeList.findById(id);
      expect(res.status).toBe(200);
      expect(deletedAnimeList).toBeNull();
    });

    it("should return the deleted the animeList ", async () => {
      const res = await exec();

      expect(res.status).toBe(200);

      expect(res.body).toHaveProperty(
        "watchListIds",
        userAnimeListInDb.watchListIds
      );

      expect(res.body).toHaveProperty("anime", userAnimeListInDb.anime);
      expect(res.body).toHaveProperty("status", userAnimeListInDb.status);
      expect(res.body).toHaveProperty(
        "currentEpisode",
        userAnimeListInDb.currentEpisode
      );
      expect(res.body).toHaveProperty("expectedFinishDate", null);

      expect(res.body).toHaveProperty(
        "created_at",
        userAnimeListInDb.created_at.toISOString() //whY?
      );
      expect(res.body).toHaveProperty(
        "updated_at",
        userAnimeListInDb.updated_at.toISOString() //whY?
      );
    });
  });
});
