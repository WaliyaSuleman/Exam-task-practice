"use server"

import prisma from "@/lib/db";
import { loremSchema } from "@/schemas/loremSchema"
import { z } from "zod"

export const createLorem = async(values:z.infer<typeof loremSchema>)=>{


    const validatedValues = loremSchema.safeParse(values);
    if(!validatedValues.success){
        return ({err:"invalid values"})
    }
    const lorem = await prisma.lorem.create({
        data: {
          name: validatedValues?.data.name,
          isCompleted: false
        },
      })
}