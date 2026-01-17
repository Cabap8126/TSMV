import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/single.model";
export const index = async (req: Request, res: Response) => {
    const song = await Song.find({
        deleted: false
    })
    res.render("admin/Page/song/index.pug", {
        titlePage: "Trang Admin",
        songs: song
    })
}
export const create = async (req: Request, res: Response) => {
    const topic = await Topic.find({
        deleted: false,
        status: "active"
    }).select("title")
    const singer = await Singer.find({
        deleted: false,
        status: "active",
    }).select("fullName")
    res.render("admin/Page/song/create", {
        titlePage: " Thêm Mới Bài Hát",
        topic: topic,
        singer: singer
    })
}
export const createPost = async (req: Request, res: Response) => {
    let avatar = "";
    let audio = "";
    if(req.body.avatar){
        avatar = req.body.avatar[0]
    }
    if(req.body.audio){
        audio = req.body.audio[0]
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio : audio,
        lyrics : req.body.lyrics
    }
    const song = new Song(dataSong)
    await song.save();
    res.redirect(`/admin/songs`);
}
export const edit = async (req : Request, res : Response)=>{
    const id = req.params.id
    const song = await Song.findOne({
        _id : id,
        deleted : false
    })
    const topics = await Topic.find({
        deleted : false
    }).select("title")
    const singer = await Singer.find({
        deleted : false
    }).select("fullName")
    res.render("admin/Page/song/edit",{
        titlePage : "Trang chỉnh sửa",
        song : song,
        topic : topics,
        singer : singer
    })
}
export const editPatch = async (req : Request , res : Response)=>{
    let avatar = "";
    let audio = "";
    const id = req.params.id
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics : req.body.lyrics
    }    
    if(req.body.avatar){
        dataSong["avatar"] = req.body.avatar[0]
    }
    if(req.body.audio){
        dataSong["audio"] = req.body.audio[0]
    }
    await Song.updateOne({_id : id},dataSong)
    res.send("Oke")
}