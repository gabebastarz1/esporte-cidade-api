import { describe, it, skip, beforeEach } from "node:test";
import app from "../app";
import request from "supertest";

// Esse loop irá rodar antes de cada teste para setar o estado inicial do banco de dados de teste.
beforeEach(() => { })

describe("Testing the Material router", () => {
    describe("GET request", () => {

        it("should throw a error when requesting an invalid ID", () => {

            request(app)
                .get("/-1")
                .expect("Content-Type", /json/)
                .expect(400)
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