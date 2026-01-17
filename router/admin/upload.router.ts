import { Router } from "express";
import {multer} from "multer"
const router : Router = Router();
const upload = multer()
import * as controller from "../../controller/admin/upload.controler"
import * as uploadCloud from "../../middlewares/admin/uploadcloud"
router.post("/" ,upload.single("file"),uploadCloud.uploadFile, controller.index);
export const uploadRouter : Router = router;