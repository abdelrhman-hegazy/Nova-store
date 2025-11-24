import { main } from "../src/server"
import { AddToCartService } from "../src/app/modules/cart/services/addToCart.services"
import request from "supertest"
describe("Add to cart", () => {
    let server: any
    beforeAll(async () => {
        server = await main()
    })
    afterAll(async () => {
        await server.close()
    })
    it.skip("Check add to cart", async () => {
        const userId = "69125d5e83c893a0cf91f52c"
        const productId = "691cbd3bb2d1a585c049157f"
        const quantity = 2
        const cart = await request(server).post(`/api/v1/cart/add-to-cart`).send({ userId, productId, quantity })
        expect(cart.status).toBe(200)
    })
    it("Check Count Price", async () => {
        const productFinalPrice = 10
        const quantity = 2
        let totalPriceOld = 10
        // priceQuantity = productFinalPrice * quantity 10 * 2 = 20
        // totalPrice = priceQuantity + totalPriceOld 20 + 10 = 30
        const { priceQuantity, totalPrice } = await AddToCartService.countPrice(productFinalPrice, quantity, totalPriceOld)
        expect(priceQuantity).toBe(20)
        expect(totalPrice).toBe(30)
    })

})