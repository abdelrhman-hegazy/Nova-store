"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavourite = void 0;
const toggleFavourite_services_1 = require("../services/toggleFavourite.services");
const utils_1 = require("../../../shared/utils");
exports.toggleFavourite = (0, utils_1.catchAsync)(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;
    const favorite = await toggleFavourite_services_1.FavouriteServices.toggleFavouriteServices(userId, productId);
    res.status(200).json({ message: favorite, status: 200 });
});
