"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/shared/config"));
const app_1 = __importDefault(require("./app"));
async function main() {
    await mongoose_1.default.connect(config_1.default.MONGO_URI);
    app_1.default.listen(config_1.default.port);
}
main().then(() => console.log(`Running Server on Port ${config_1.default.port}...`))
    .catch(error => console.log(error));
