"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const single_model_1 = __importDefault(require("../../model/single.model"));
const convertSlug_1 = require("../../helpers/convertSlug");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.typeSearch;
    const keyword = `${req.query.keyword}`;
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        const stringSlug = (0, convertSlug_1.convertSlug)(keyword);
        const stringSlugRegExp = new RegExp(stringSlug, "i");
        const songs = yield song_model_1.default.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegExp }
            ]
        });
        for (const item of songs) {
            const infoSinger = yield single_model_1.default.findOne({
                _id: item.singerId
            });
            newSongs.push({
                _id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoUser: {
                    fullName: infoSinger.fullName
                }
            });
        }
    }
    switch (type) {
        case "result":
            res.render("cilents/Page/topics/search", {
                titlePage: `Ket qua : ${keyword}`,
                keyword: keyword,
                songs: newSongs
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Thành Công",
                newSongs: newSongs
            });
            break;
        default:
            break;
    }
});
exports.index = index;
