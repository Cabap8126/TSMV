import { Router } from "express";
const router : Router = Router();
import * as controllerRouter from "../../controller/cilents/favarite"
router.get("/",controllerRouter.index)
export const favarionRouter : Router = router