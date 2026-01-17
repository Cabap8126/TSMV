"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_router_1 = require("./topic.router");
const songs_1 = require("./songs");
const favarite_router_1 = require("./favarite-router");
const search_router_1 = require("./search.router");
const cilentsRouter = (app) => {
    app.use("/", topic_router_1.topicRouter);
    app.use("/songs", songs_1.songRouter);
    app.use("/favorite-songs", favarite_router_1.favarionRouter);
    app.use("/search", search_router_1.searchRouter);
};
exports.default = cilentsRouter;
