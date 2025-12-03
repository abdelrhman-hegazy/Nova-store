import express from "express";
import { updateProfile } from "../controller/updatePofile.controller";
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier";
import { updateProfileSchema, validate } from "../../../shared/middleware";
import { getProfile } from "../controller/getProfile.controller";

const router = express.Router();

router.put('/update', validate(updateProfileSchema), identifyCustomer, updateProfile);
router.get('/get', identifyCustomer, getProfile);

export const profileRouter = router;