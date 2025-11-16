"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFavourite = void 0;
const getAllFavourite_services_1 = require("../services/getAllFavourite.services");
const utils_1 = require("../../../shared/utils");
exports.getAllFavourite = (0, utils_1.catchAsync)(async (req, res) => {
    const userId = req.user.id;
    const favouriteProducts = await getAllFavourite_services_1.getAllFavouriteServices.getAllFavouriteServices(userId);
    res.status(200).json({ message: favouriteProducts, status: 200 });
});
