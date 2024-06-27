"use server"

import prisma from "@/lib/db"


export const deleteLorem = async(loremId:String)=>{

    return await prisma.lorem.delete(
        {where:{id:loremId}}
    )

}