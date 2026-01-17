import { Router } from "express";
const router : Router = Router()
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadcloud"
import * as controller from "../../controller/admin/song"
const upload = multer();
router.get("/",controller.index)
router.get("/create",controller.create)
router.post("/create",
            upload.fields([
                {name : "avatar",maxCount : 1},
                {name : "audio",maxCount : 1}
            ]),
            uploadCloud.uploadFile,
            controller.createPost
    )
router.get("/edit/:id",controller.edit)
router.patch("/eidt/:id",controller.editPatch)
export const  song : Router = router