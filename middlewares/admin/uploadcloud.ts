import { NextFunction, Request , Response } from "express";
import { uploadCloudinary } from "../../helpers/uploadCloud";

export const upload = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const link = await uploadCloudinary(req["file"].buffer)
        req.body[req["file"].fieldname] = link;
    }catch(error){
        console.log(error)
    }
    next();
}
export const uploadFile = async (req : Request , res : Response , next : NextFunction)=>{
    for(const key in req["files"]){
        req.body[key] = []; 
        const array = req["files"][key]
        for(const item of array){
            try{
                const result = await uploadCloudinary(item.buffer);
                req.body[key].push(result)
            }catch(error){
                console.log(error)
            }
        }
    }
    next()
}