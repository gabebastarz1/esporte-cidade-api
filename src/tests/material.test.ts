
import app from "../app";
import { describe, it, skip } from "node:test";
import request from "supertest";
import assert from "node:assert";

describe("Testing the Material router", () => {
    describe("GET request", () => {

        it("should throw a error when requesting an invalid ID", () => {
            
            request(app)
                .get("/")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                })
        })
    })
    describe("POST request", () => {

        it("should create a new material with correct data", () => {

            skip();
        })
    })
});