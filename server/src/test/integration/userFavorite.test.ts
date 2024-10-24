import request from "supertest";
import { User, UserDoc } from "../../models/users";
import app from "../../index";
import { userFavorite, userFavoriteDoc } from "../../models/userFavorite";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import { userFavoriteTemp } from "../testData/userFavorite";
import _ from "lodash";

describe("api/favorite", () => {
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

  afterEach(async () => {
    await userFavorite.deleteMany({});
    await User.deleteMany({});
  });

  describe("Get", () => {
    let token: string = "";
    let userInDb: UserDoc;
    let userFavoriteInDb: userFavoriteDoc;

    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();

      // Shallow copy userAnimeStatusTemp
      const userFavoriteTempCopy = { ...userFavoriteTemp };

      userFavoriteInDb = new userFavorite(
        _.set(userFavoriteTempCopy, "userId", userInDb._id)
      );

      userFavoriteInDb = await userFavoriteInDb.save();
    });

    const exec = function () {
      return request(app)
        .get("/api/favorite")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`);
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return favorite info if a valid session is passed", async () => {
      const res = await exec();
      const diff = new Date().getTime() - userFavoriteInDb.created_at.getTime();
      expect(res.status).toBe(200);
      expect(diff).toBeLessThan(10 * 1000);
      expect(res.body[0]).toHaveProperty(
        "userId",
        userFavoriteInDb.userId.toString()
      );
    });
  });

  describe("Post", () => {
    let token: string = "";
    let userInDb: UserDoc;
    let newUserFavorite: any;
    let userFavoriteInDb: any;
    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();

      const userAnimeStatusTempCopy = _.cloneDeep(userFavoriteTemp);
      newUserFavorite = userAnimeStatusTempCopy;

      const userAnimeStatusTempCopy2 = _.cloneDeep(userFavoriteTemp);
      userFavoriteInDb = new userFavorite(
        _.set(userAnimeStatusTempCopy2, "userId", userInDb._id)
      );
    });

    const exec = function () {
      return request(app)
        .post("/api/favorite")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send(newUserFavorite);
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if provided userId invalid ", async () => {
      newUserFavorite.userId = 123 as unknown as Types.ObjectId; //idk how this works but it forces the type of userId to string

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if duplicated favorite", async () => {
      await new userFavorite(userFavoriteInDb).save();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("duplicated favorite");
    });

    it("should save the anime", async () => {
      const res = await exec();

      const savedAnimeList = await userFavorite.findById(res.body._id);
      expect(res.status).toBe(200);
      expect(savedAnimeList).not.toBeNull();
    });

    // it("should return 400 if anime is invalid ", async () => {
    //   newUserFavorite.anime.genre = [123] as unknown as string; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return 400 if favorite is invalid ", async () => {
    //   newUserFavorite.favorite = 123; //idk how this works but it forces the type of userId to string

    //   const res = await exec();
    //   expect(res.status).toBe(400);
    // });

    // it("should return the saved anime", async () => {
    //     const res = await exec();

    //     const savedAnimeList = await userAnimeList.findById(res.body._id);
    //     const diff = new Date().getTime() - savedAnimeList!.created_at.getTime();

    //     expect(diff).toBeLessThan(10 * 1000);
    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty("userId", newAnimeList.userId.toString());
    //     expect(res.body).toHaveProperty(
    //       "watchListIds",
    //       newAnimeList.watchListIds
    //     );

    //     expect(res.body).toHaveProperty("anime", newAnimeList.anime);
    //     expect(res.body).toHaveProperty("status", newAnimeList.status);
    //     expect(res.body).toHaveProperty(
    //       "currentEpisode",
    //       newAnimeList.currentEpisode
    //     );
    //     expect(res.body).toHaveProperty("expectedFinishDate", null);
    //     expect(res.body).toHaveProperty("favorite", newAnimeList.favorite);
    //   });
  });
  describe("put /:id", () => {
    let token = "";
    let userInDb: UserDoc;
    let id: string;
    let newUserFavoritePutReq: any;

    let userFavoriteInDb: userFavoriteDoc;
    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();
      id = userInDb._id.toString();
      const userAnimeStatusTempCopy2 = _.cloneDeep(userFavoriteTemp);
      userFavoriteInDb = new userFavorite(
        _.set(userAnimeStatusTempCopy2, "userId", userInDb._id)
      );
      await userFavoriteInDb.save();
      id = userFavoriteInDb._id.toString();

      newUserFavoritePutReq = { favorite: false };
      newUserFavoritePutReq.updated_at = new Date();
    });
    const exec = function () {
      return request(app)
        .put(`/api/favorite/${id}`)
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send(newUserFavoritePutReq);
    };

    it("should return 401 if user no login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    //invalid userFavoriteId
    it("should return 400 if userFavoriteId invalid", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("userFavoriteId isn't a valid objectId");
    });

    //userFavoriteId unmatch
    it("should return 400 if userFavoriteId doesn't match", async () => {
      id = new mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid userFavoriteId");
    });

    //modify other userFavorite
    it("should return 401 if the user trying to modify other user's Favorite", async () => {
      const userAnimeStatusTempCopy = _.cloneDeep(userFavoriteTemp);
      let newUserFavoriteInDb = new userFavorite(userAnimeStatusTempCopy);
      newUserFavoriteInDb.userId = new mongoose.Types.ObjectId();
      await newUserFavoriteInDb.save();

      id = newUserFavoriteInDb._id.toString();

      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.text).toBe(
        "unauthorized you can't edit other people's favorite"
      );
    });

    it("should return updated favorite ", async () => {
      const res = await exec();
      console.log(res.text);
      const diff = new Date().getTime() - userFavoriteInDb.updated_at.getTime();
      expect(diff).toBeLessThan(10 * 1000);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "favorite",
        newUserFavoritePutReq.favorite
      );
    });

    // test favorite property
    // it("should return 400 if favorite is invalid  ", async () => {
    //     newAnimeList.favorite = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

    //     const res = await exec();
    //     expect(res.status).toBe(400);
    //   });

    // test updated_at
    // it("should return 400 if updated_at is invalid  ", async () => {
    //     newAnimeList.updated_at = "222d" as unknown as Date; //idk how this works but it forces the type of userId to string

    //     const res = await exec();
    //     expect(res.status).toBe(400);
    //   });

    //return data
  });

  describe("delete /:id", () => {
    let token = "";
    let userInDb: UserDoc;
    let id: string;

    let userFavoriteInDb: userFavoriteDoc;
    beforeEach(async () => {
      userInDb = await saveUser();
      token = await login();

      const userAnimeStatusTempCopy2 = _.cloneDeep(userFavoriteTemp);
      userFavoriteInDb = new userFavorite(
        _.set(userAnimeStatusTempCopy2, "userId", userInDb._id)
      );
      await userFavoriteInDb.save();

      id = userFavoriteInDb._id.toString();

      // userFavoriteInDb = new userFavorite(
      //   JSON.parse(JSON.stringify(favoriteTemplate))
      // );
      // userFavoriteInDb.userId = userInDb._id;
      // await userFavoriteInDb.save();
    });

    const exec = function () {
      return request(app)
        .delete(`/api/favorite/${id}`)
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`);
    };

    it("should return 400 if user no login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    //invalid favorite
    it("should return 400 if favoriteId invalid", async () => {
      id = "1";
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("favoriteId isn't a valid objectId");
    });

    it("should return 400 if favoriteId doesn't match", async () => {
      id = new mongoose.Types.ObjectId().toString();
      const res = await exec();
      expect(res.status).toBe(400);
      expect(res.text).toBe("invalid favoriteId");
    });

    //modify other favoriteID
    it("should return 401 if the user trying to delete other user's favoriteId", async () => {
      const userAnimeStatusTempCopy = _.cloneDeep(userFavoriteTemp);
      let newUserFavoriteInDb = new userFavorite(userAnimeStatusTempCopy);
      newUserFavoriteInDb.userId = new mongoose.Types.ObjectId();
      await newUserFavoriteInDb.save();

      id = newUserFavoriteInDb._id.toString();

      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.text).toBe(
        "unauthorized you can't delete other people's favoriteId"
      );
    });

    //return data
    it("should delete the userFavorite ", async () => {
      const res = await exec();
      const deletedAnimeList = await userFavorite.findById(id);
      expect(res.status).toBe(200);
      expect(deletedAnimeList).toBeNull();
    });

    it("should return the deleted the userFavorite ", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("favorite", userFavoriteInDb.favorite);
    });
  });
});
