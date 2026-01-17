import { Express } from "express"
import {topicRouter} from "./topic.router"
import {songRouter} from "./songs"
import { favarionRouter } from "./favarite-router"
import { searchRouter } from "./search.router"
const cilentsRouter = (app : Express)=>{
    app.use("/",topicRouter);
    app.use("/songs",songRouter)
    app.use("/favorite-songs",favarionRouter)
    app.use("/search",searchRouter)
}
export default cilentsRouter;