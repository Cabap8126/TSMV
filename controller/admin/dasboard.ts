import { Request ,Response } from "express";
export const index = async (req : Request, res : Response)=>{
    res.render("admin/Page/dasboard/index",{
        titlePage : "Trang Admin"
    })
}