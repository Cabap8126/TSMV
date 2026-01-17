import { Request ,Response } from "express";
import FavoriteSong from "../../model/favorite-song.model";
import Song from "../../model/song.model";
import Singer from "../../model/single.model";
export const index = async (req : Request , res : Response)=>{
    const favarite = await FavoriteSong.find(
        {
            deleted : false
        }
    )
    for(const song of favarite){
        const infoSong = await Song.findOne({
            _id : song.songId
        })
        const infoSinger = await Singer.findOne({
            _id : infoSong.singerId
        })
        song["infoSong"] = infoSong;
        song["infoSinger"] = infoSinger
    }
    res.render("cilents/Page/topics/favarite",{
        titlePage : "Nhac Yeu Thich",
        favarite : favarite
    })
}