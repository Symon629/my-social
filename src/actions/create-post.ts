"use server"
import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";
import type { Post } from "@prisma/client";




interface FormStateProps{
    errors:{
        title?:string[],
        content?:string[],
        _form?:string[]
    }
}

const createPostSchema=  z.object({
    title:z.string().min(3),
    content:z.string().min(10)
})



export async function createPost(formState:FormStateProps, formData:FormData):Promise<FormStateProps>{
    
    const result = createPostSchema.safeParse({
        title:formData.get('title'),
        content:formData.get('content')

    })
    if(!result.success){
        return{
            errors:result.error.flatten().fieldErrors
        }
    }

    // revalidate the topic show page

    return {
        errors:{}
    }
}