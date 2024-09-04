import { WatchList } from "../../models/watchList";
import request from "supertest";
import { app } from "../../index";

describe("/api/watchList", () => {
  let token: string;
  afterEach(async () => {
    await WatchList.deleteMany({});
  });
  describe("GET /", () => {
    const exec = function () {
      return request(app).get("/api/watchList").set("x-auth-token", token);
    };
    it("should return 401 if the user didn't login", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
  });
});
