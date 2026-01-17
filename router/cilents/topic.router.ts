import { Router } from "express";
const router : Router = Router();
import * as controllerCilents from "../../controller/cilents/index"
router.get("/",controllerCilents.topics)
export const topicRouter : Router = router;