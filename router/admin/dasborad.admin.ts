import { Router } from "express";
const router : Router = Router()
import * as controller from "../../controller/admin/dasboard"
router.get("/",controller.index)
export const  dasboard : Router = router
