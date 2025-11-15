import { DeleteProductService } from "../services/deleteProduct.services";
import { Request, Response } from "express";

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedProduct = await DeleteProductService.deleteProduct(id);
    return res.status(200).json({ success: true, message: deletedProduct });
}
