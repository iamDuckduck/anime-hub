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
    favorite: true,
    created_at: new Date(1632751161874),
    updated_at: new Date(1632751161874),
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
      await userAnimeListInDb.save();
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

    it("should return user info if a valid token is passed", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "userId",
        userAnimeListInDb.userId.toString()
      );
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
      expect(res.body).toHaveProperty(
        "expectedFinishDate",
        userAnimeListInDb.expectedFinishDate
      );
      expect(res.body).toHaveProperty("favorite", userAnimeListInDb.favorite);
      expect(res.body).toHaveProperty(
        "created_at",
        userAnimeListInDb.created_at.toISOString()
      );
      expect(res.body).toHaveProperty(
        "updated_at",
        userAnimeListInDb.updated_at.toISOString()
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

    it("should return 400 if favorite is invalid ", async () => {
      newAnimeList.favorite = "222d" as unknown as Boolean; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if created_at is invalid ", async () => {
      newAnimeList.created_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if updated_at is invalid ", async () => {
      newAnimeList.updated_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

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
      expect(res.body).toHaveProperty("favorite", newAnimeList.favorite);
      expect(res.body).toHaveProperty("created_at", newAnimeList.created_at);
      expect(res.body).toHaveProperty("updated_at", newAnimeList.updated_at);
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
      newAnimeList.userId = userInDb._id;
      newAnimeList.currentEpisode = 11;
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

    //modify other animeListId
    it("should return 401 if the user trying to modify other user's animeList", async () => {
      let newAnimeListInDb = new userAnimeList(
        JSON.parse(JSON.stringify(animeListTemplate))
      );
      newAnimeListInDb.userId = new mongoose.Types.ObjectId();
      await newAnimeListInDb.save();
      id = newAnimeListInDb._id.toString();

      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.text).toBe(
        "unauthorized you can't edit other people's animeList"
      );
    });

    //data valid

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

    it("should return 400 if favorite is invalid ", async () => {
      newAnimeList.favorite = "222d" as unknown as Boolean; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if created_at is invalid ", async () => {
      newAnimeList.created_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if updated_at is invalid ", async () => {
      newAnimeList.updated_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    //return data
    it("should return updated animeList ", async () => {
      const res = await exec();
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
      expect(res.body).toHaveProperty("favorite", newAnimeList.favorite);
      expect(res.body).toHaveProperty("created_at", newAnimeList.created_at);
      expect(res.body).toHaveProperty("updated_at", newAnimeList.updated_at);
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

    //modify other animeListId
    it("should return 401 if the user trying to delete other user's animeList", async () => {
      let newAnimeListInDb = new userAnimeList(
        JSON.parse(JSON.stringify(animeListTemplate))
      );
      newAnimeListInDb.userId = new mongoose.Types.ObjectId();
      await newAnimeListInDb.save();
      id = newAnimeListInDb._id.toString();

      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.text).toBe(
        "unauthorized you can't delete other people's animeList"
      );
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
        "userId",
        userAnimeListInDb.userId.toString()
      );
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
      expect(res.body).toHaveProperty("favorite", userAnimeListInDb.favorite);
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
