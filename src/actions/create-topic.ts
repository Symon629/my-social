"use server"
import {z} from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/path";
import { redirect } from "next/navigation";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { resolve } from "path";


const createTopicSchema = z.object({
   name:z.string().min(3).regex(/^[a-z-]+$/,{message:"Must be lower case letters or dashes without spaces."}),
   description:z.string().min(10),
});


// this type has to match whatver you supply in your useFormState.
// see topic-create-form.tsx the intial state.
interface CreateFormState{
   errors:{
      name?:string[],
      description?:string[],
      _form?:string[]
   }
}

/// This retunrs a Promise of type CreateFormState otherwise typescript complains about it a lot. 

// see the return statements 
export async function createTopic(formState:CreateFormState ,formData:FormData):Promise<CreateFormState>{
   // we are artifically delaying the reponse here
// await new Promise(resolve => setTimeout(resolve,2500));

   const result =  createTopicSchema.safeParse({
      name:formData.get('name'),
      description:formData.get('description')
   })
   if(!result.success){
      return{
         errors: result.error.flatten().fieldErrors
      }
   }
   const session = await auth()
   if(!session || !session?.user){
      return {
         errors:{
            _form: ["You must be signed to post a topic"]
         }
      }
   }

   let topic:Topic;
   try{
      topic = await db.topic.create({
         data:{
            slug:result.data.name,
            description:result.data.description
         }
      });
   }catch(err:unknown){
      if(err instanceof Error){
         return {
            errors:{
               _form:[err.message]
            }
         }
      }else{
         return {
            errors:{
               _form:["Something wen wrong"]
            }
         }
      }
   }
   revalidatePath("/")
   redirect(paths.topicShow(topic?.slug))
   

}

