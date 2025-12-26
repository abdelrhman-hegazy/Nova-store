"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    id;
    status;
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }
    markPaid() {
        this.status = "paid";
    }
    markFailed() {
        this.status = "failed";
    }
}
exports.Order = Order;
