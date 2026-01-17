import { Request, Response } from "express"
import Topic from "../../model/topic.model"
export const topics = async (req : Request,res : Response)=>{
    const topics = await Topic.find({
        deleted : false
    })
    res.render("cilents/Page/topics/index",{
        titlePage : "Trang danh sách bài hát",
        topics : topics
    })
}