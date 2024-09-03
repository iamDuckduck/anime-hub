import { Favorite } from "../../models/favorites";
import request from "supertest";
import { app } from "../../index";

describe("/api/favorites", () => {
  let token: string;
  afterEach(async () => {
    await Favorite.deleteMany({});
  });
  describe("GET /", () => {
    it("should return 401 if the user didn't login", async () => {
      token = "";
      const res = await request(app)
        .get("/api/favorites")
        .set("x-auth-token", token);
      expect(res.status).toBe(401);
    });
  });
});
