import { Express } from "express";
import { dasboard } from "./dasborad.admin";
import { topic } from "./topic.admin";
import { song } from "./song.admin";
import { uploadRouter } from "./upload.router";
const adminRouter = (app:Express)=>{
    app.use("/admin/dasboard",dasboard)
    app.use("/admin/topics",topic)
    app.use("/admin/songs",song)
    app.use("/admin/upload",uploadRouter)
}
export default adminRouter;