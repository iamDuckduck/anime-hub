import { User } from "../../../models/users";
import app from "../../../index";
import bcrypt from "bcrypt";
import request from "supertest";
import { Anime } from "../../../models/anime";
import _ from "lodash";
import { tempAnime } from "../../testData/animeTemp";

describe("anime db test", () => {
  let email: string = "123451@gmail.com";
  let password: string = "12345";
  let token: string;
  let anime = {};

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
    await user.save();
  };

  const getAnime = () => {
    return tempAnime;
  };

  beforeEach(async () => {
    await saveUser();
    token = await login();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Anime.deleteMany({});
  });

  describe("Get", () => {
    const exec = function () {
      return request(app)
        .get("/api/anime/")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`); // Pass the JWT token
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return anime if the user did login", async () => {
      anime = await getAnime();
      new Anime(anime).save();
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty("mal_id", 54309);
    });
  });

  describe("Post", () => {
    const exec = async function () {
      return request(app)
        .post("/api/anime/")
        .set("Content-Type", "application/json")
        .set("authorization", `Bearer ${token}`)
        .send(anime); // Pass the JWT token
    };

    it("should return 401 if the user did not login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if anime is not valid", async () => {
      anime = {};
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if duplicated", async () => {
      anime = await getAnime();
      new Anime(anime).save();
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return anime if req is valid", async () => {
      anime = await getAnime();
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("mal_id", 54309);
    });
  });
});
