import { Router } from "express";
const router : Router = Router();
import * as controllerCilents from "../../controller/cilents/songs"
router.get("/:slugRouter",controllerCilents.list)
router.get("/detail/:slugsong",controllerCilents.detail)
router.patch("/like/:typeLike/:idsong",controllerCilents.like)
router.patch("/favarion/:typefavarion/:idsong",controllerCilents.favarion)
router.get("/listen/:idSong",controllerCilents.listen)
export const songRouter : Router = router;