import { main } from "../src/server";
import mongoose from "mongoose";
import request from "supertest";

describe.skip("Server", () => {
    let server: any;

    beforeAll(async () => {
        server = await main();
    });

    afterAll(async () => {
        await new Promise<void>((resolve) => server.close(resolve));
        await mongoose.connection.close();
    });

    test("should start the server", () => {
        expect(server).toBeDefined();
        expect(server.listening).toBeTruthy();
    });

    test("should respond to /api/test", async () => {
        const response = await request(server).get("/api/test");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("test endpoint working");
    });

});