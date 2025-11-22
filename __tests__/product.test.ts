import request from "supertest";
import { main } from "../src/server"
import { AddProductService } from "../src/app/modules/product/services/addProduct.services"
describe("Product Routes ", () => {
    let server: any
    beforeAll(async () => {
        server = await main();
    })
    afterAll(async () => {
        if (server) {
            server.close
        }
    })
    describe("get product by id", () => {
        test("get product id", async () => {
            const productId = "6917d69fba52743fe2c2a64f"
            const response = await request(server).get(`/api/v1/products/${productId}`);
            expect(response.status).toBe(200);
        })
        test("not found product", async () => {
            const productId = "6917d69fba52743fe2c2a648"
            const response = await request(server).get(`/api/v1/products/${productId}`);
            expect(response.status).toBe(404);
        })
        test("not valid quary id", async () => {
            const productId = "6917d69fba52743fe2c"
            const response = await request(server).get(`/api/v1/products/${productId}`);
            console.log(response.status);
            expect(response.status).toBe(400);
        })
    })
    describe("get all products", () => {
        test("get all products", async () => {
            const response = await request(server).get(`/api/v1/products`);
            expect(response.status).toBe(200);
        })
    })
    describe("create product", () => {
        const payload = {
            name: "test",
            price: 10,
            details: "test",
            images: ["https://example.com/image.jpg"],
            stock: 10,
            categoryId: "691340be30b398aa5ed1dab0",
            discount: 10
        }
        test.skip("create product", async () => {
            expect(AddProductService.addProduct(payload as any, ["https://example.com/image.jpg"], { _id: "69125d5e83c893a0cf91f52c" })).toBeDefined()
        })


        test("create product without auth", async () => {
            const response = await request(server).post(`/api/v1/products/create`).send(payload);
            expect(response.status).toBe(401);
        })

    })
});

