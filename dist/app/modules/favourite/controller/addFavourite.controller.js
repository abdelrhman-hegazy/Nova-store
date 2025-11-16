"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFavourite = void 0;
const toggleFavourite_services_1 = require("../services/toggleFavourite.services");
const addFavourite = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;
        const favorite = await toggleFavourite_services_1.AddFavouriteServices.addFavourite(userId, productId);
        res.status(200).json({ message: "Favorite added successfully", favorite });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add favorite", error });
    }
};
exports.addFavourite = addFavourite;
