"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const services_1 = require("../../../shared/services");
const createPaymentUseCase_1 = require("../../payment/application/use-cases/createPaymentUseCase");
const PaymentFactory_1 = require("../../payment/infrastructure/payment/PaymentFactory");
async function createPayment(req, res, next) {
    try {
        const { provider } = req.body;
        const userId = req.user.id;
        await services_1.sharedServices.existUserById(userId);
        await services_1.sharedServices.existCartByUserId(userId);
        const gateway = (0, PaymentFactory_1.paymentFactory)(provider);
        const useCase = new createPaymentUseCase_1.CreatePaymentUseCase(gateway);
        const result = await useCase.execute(userId);
        res.status(200).json({ success: true, result });
    }
    catch (error) {
        next(new AppError_1.default(error.message, 500, 'ERROR_CREATING_PAYMENT'));
    }
}
