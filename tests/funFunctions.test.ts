import supertest from "supertest"; 
import app from "../src/index";

const server = supertest(app);

describe('testes', () => {
    it('when inserting a fruit', async () => {
        const result = await server.post("/fruits");
        expect (result.status).toBe(201);
    });
    it('when inserting a fruit that is already registered', async () => {
        const result = await server.post("/fruits");
        expect (result.status).toBe(209);
    });
    it('when inserting a fruit with data missing', async () => {
        const result = await server.post("/fruits");
        expect (result.status).toBe(422);
    });
    it("when trying to get a fruit that doesn't exists", async () => {
        const result = await server.get("/fruits");
        expect (result.status).toBe(404);
    });
    it("when id param is not valid", async () => {
        const result = await server.get("/fruits");
        expect (result.status).toBe(400);
    });
    it("a fruit", async () => {
        const result = await server.get("/fruits/:id");
        expect (result.body).toEqual(
            expect.objectContaining({
                name: expect.any(String)
            })
        );
    });
    it("all fruits", async () => {
        const result = await server.get("/fruits");
        expect (result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String)
                }) 
            ])
        );
    });
});
