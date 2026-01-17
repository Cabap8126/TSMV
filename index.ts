import express,  { Express } from "express";
import * as database from "./config/database"
import dotenv from "dotenv"
import cilentsRouter from "./router/cilents";
import adminRouter from "./router/admin";
import bodyParser from "body-parser"
import methodOverride from "method-override"
dotenv.config()
database.connect()
const app : Express = express();
const port : number | string= process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"))
app.use(express.static(`${__dirname}public`))
app.set("views",`${__dirname}/views`);
app.set("view engine","pug")
//adminRouter
adminRouter(app)
// cilentsRouter
cilentsRouter(app);

// app.get("/topic",(req : Request, res : Response)=>{
//     res.send("oke")
// })
app.listen(port , ()=>{
    console.log(`app listen on port ${port}`)
})