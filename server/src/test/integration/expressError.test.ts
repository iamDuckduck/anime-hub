import request from "supertest";
import app from "../../index";

// app.get("/test", async (req, res) => {
//   throw new Error("Test error");
// });

describe("Testing express-async-errors", () => {
  it("should handle asynchronous errors", async () => {
    const res = await request(app).get("/api/tests");
    expect(res.status).toBe(500);
  });
});
