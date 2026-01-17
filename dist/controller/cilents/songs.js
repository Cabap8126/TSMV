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
exports.listen = exports.favarion = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const song_model_1 = __importDefault(require("../../model/song.model"));
const single_model_1 = __importDefault(require("../../model/single.model"));
const favorite_song_model_1 = __importDefault(require("../../model/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugRouter,
        status: "active",
        deleted: false
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("avatar title slug singerId like");
    for (const song of songs) {
        const infoSinger = yield single_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("cilents/Page/topics/songs", {
        titlePage: topic.title,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugsong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        status: "active",
        deleted: false
    });
    const singer = yield single_model_1.default.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false
    }).select("title");
    const favarionSong = yield favorite_song_model_1.default.findOne({
        songId: song.id
    });
    song["isFavarionSong"] = favarionSong ? true : false;
    res.render("cilents/Page/topics/detail", {
        titlePage: "chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idsong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false,
        status: "active"
    });
    const newlike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        like: newlike
    });
    res.json({
        code: 200,
        message: " Thành Công",
        newlike: newlike
    });
});
exports.like = like;
const favarion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idsong;
    const typeSong = req.params.typefavarion;
    switch (typeSong) {
        case "Favarion":
            const favarion = yield favorite_song_model_1.default.findOne({
                songId: idSong
            });
            if (!favarion) {
                const record = new favorite_song_model_1.default({
                    songId: idSong
                });
                yield record.save();
            }
            break;
        case "disFavarion":
            yield favorite_song_model_1.default.deleteOne({ songId: idSong });
            break;
    }
    res.json({
        code: 200,
        message: "Thành Công"
    });
});
exports.favarion = favarion;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idsong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idsong,
        deleted: false,
        status: "active"
    });
    if (song) {
        yield song_model_1.default.updateOne({ _id: idsong }, {
            listen: song.listen + 1
        });
    }
    res.json({
        code: 200,
        message: "Thành Công",
        listen: song.listen
    });
});
exports.listen = listen;
