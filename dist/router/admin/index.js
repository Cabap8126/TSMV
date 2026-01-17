"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dasborad_admin_1 = require("./dasborad.admin");
const topic_admin_1 = require("./topic.admin");
const song_admin_1 = require("./song.admin");
const upload_router_1 = require("./upload.router");
const adminRouter = (app) => {
    app.use("/admin/dasboard", dasborad_admin_1.dasboard);
    app.use("/admin/topics", topic_admin_1.topic);
    app.use("/admin/songs", song_admin_1.song);
    app.use("/admin/upload", upload_router_1.uploadRouter);
};
exports.default = adminRouter;
