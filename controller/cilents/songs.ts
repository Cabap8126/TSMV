import { Request, Response } from "express"
import Topic from "../../model/topic.model"
import Song from "../../model/song.model"
import Singer from "../../model/single.model"
import FavoriteSong from "../../model/favorite-song.model"
export const list = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({
        slug: req.params.slugRouter,
        status: "active",
        deleted: false
    })
    const songs = await Song.find(
        {
            topicId: topic.id,
            status: "active",
            deleted: false
        }
    ).select("avatar title slug singerId like");
    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("cilents/Page/topics/songs", {
        titlePage: topic.title,
        songs: songs
    })
}
export const detail = async (req: Request, res: Response) => {
    const slugSong: string = req.params.slugsong;
    const song = await Song.findOne({
        slug: slugSong,
        status: "active",
        deleted: false
    })
    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName")
    const topic = await Topic.findOne({
        _id : song.topicId,
        deleted : false
    }).select("title")

    const favarionSong = await FavoriteSong.findOne({
        songId : song.id
    })
    song["isFavarionSong"] = favarionSong ? true : false
    res.render("cilents/Page/topics/detail", {
        titlePage: "chi tiết bài hát",
        song : song,
        singer : singer,
        topic : topic
    })
}
export const like = async (req: Request , res : Response)=>{
    const idSong : string = req.params.idsong;
    const typeLike : string = req.params.typeLike;

    const song = await Song.findOne({
        _id : idSong,
        deleted : false,
        status : "active"
    })
    const newlike : number = typeLike == "like" ? song.like + 1 : song.like -1;
    await Song.updateOne({
        _id : idSong
    },{
        like : newlike
    })
    res.json({
        code : 200,
        message : " Thành Công",
        newlike : newlike
    })
}
export const favarion = async (req : Request ,res : Response)=>{
    const idSong : string = req.params.idsong;
    const typeSong : string = req.params.typefavarion;
    switch (typeSong){
        case "Favarion":
            const favarion = await FavoriteSong.findOne({
                songId : idSong
            })
            if(!favarion){
                const record = new FavoriteSong({
                    songId : idSong
                })
                await record.save();
            }
            break;
        case "disFavarion":
            await FavoriteSong.deleteOne(
                {songId : idSong}
            )
            break;
    }
    res.json({
        code : 200,
        message : "Thành Công"
    })
}
export const listen = async (req : Request , res : Response)=>{
    const idsong = req.params.idSong;
    const song = await Song.findOne({
        _id : idsong,
        deleted : false,
        status : "active"
    })
    if(song){
        await Song.updateOne(
            {_id : idsong},{
                listen : song.listen + 1
            }
        )
    }
    res.json({
        code : 200,
        message : "Thành Công",
        listen : song.listen
    })
}