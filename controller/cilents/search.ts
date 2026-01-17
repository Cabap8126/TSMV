import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/single.model";
import { convertSlug } from "../../helpers/convertSlug";
export const index = async (req: Request, res: Response) => {
    const type = req.params.typeSearch
    const keyword: string = `${req.query.keyword}`;
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        //Tao khoang trang va them dau ngan cach -
        const stringSlug = convertSlug(keyword);
        const stringSlugRegExp = new RegExp(stringSlug, "i");

        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegExp }
            ]

        })
        for (const item of songs) {
            const infoSinger = await Singer.findOne({
                _id: item.singerId
            })
            newSongs.push({
                _id : item.id,
                title : item.title,
                avatar : item.avatar,
                like : item.like,
                slug : item.slug,
                infoUser : {
                    fullName : infoSinger.fullName
                }
            })
        }
    }


    switch (type) {
        case "result":
            res.render("cilents/Page/topics/search", {
                titlePage: `Ket qua : ${keyword}`,
                keyword: keyword,
                songs: newSongs
            })
            break;
        case "suggest":
            res.json({
                code : 200,
                message : "Thành Công",
                newSongs : newSongs
            })
            break;
        default :
            break;
    }
}