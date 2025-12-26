
export class Order {
    constructor(
        public id: string,
        public status: "pending" | "paid" | "failed") { }

    markPaid() {
        this.status = "paid"
    }
    markFailed() {
        this.status = "failed"
    }
}