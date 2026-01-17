import { Router } from "express";
const router : Router = Router();
import * as controllerSearch from "../../controller/cilents/search"
router.get("/:typeSearch",controllerSearch.index)
export const searchRouter : Router = router