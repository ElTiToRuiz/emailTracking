import request from "supertest";
import { app } from "../src/server";

describe("Email Tracking API", () => {
  it("should track an email open", async () => {
    const response = await request(app).get("/track-email?email=test@example.com");
    console.log("Response:", response.status, response.text);
    expect(response.status).toBe(200);
  });

  it("should return an image when tracking email", async () => {
    const response = await request(app).get("/track-email?email=test@example.com");
    console.log("Headers:", response.headers);
    expect(response.headers["content-type"]).toContain("image/png");
  });

  it("should retrieve opened emails", async () => {
    const response = await request(app).get("/opened-emails");
    console.log("Emails:", response.body);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
