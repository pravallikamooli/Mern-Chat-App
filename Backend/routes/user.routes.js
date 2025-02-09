import express from 'express';

import { getUserForSidebar } from '../controllers/user.controller.js';
import protectRoute from '../Middleware/protectRoute.js';

const router=express.Router();

router.get("/",protectRoute,getUserForSidebar)

export default router