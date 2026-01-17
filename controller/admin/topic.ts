import { Request ,Response } from "express";
import Topic from "../../model/topic.model";
export const index = async (req : Request, res : Response)=>{
    const topic = await Topic.find({
        deleted : false
    })
    res.render("admin/Page/topic/index.pug",{
        titlePage : "Trang Quản Lí",
        topics : topic
    })
}