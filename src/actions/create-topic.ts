"use server"
import {z} from "zod";

const createTopicSchema = z.object({
   name:z.string().min(3).regex(/^[a-z-]+$/,{message:"Must be lower case letters or dashes without spaces."}),
   description:z.string().min(10),
});


// this type has to match whatver you supply in your useFormState.
// see topic-create-form.tsx the intial state.
interface CreateFormState{
   errors:{
      name?:string[],
      description?:string[]
   }
}

/// This retunrs a Promise of type CreateFormState otherwise typescript complains about it a lot. 

// see the return statements 
export async function createTopic(formState:CreateFormState ,formData:FormData):Promise<CreateFormState>{

   const result =  createTopicSchema.safeParse({
      name:formData.get('name'),
      description:formData.get('description')
   })
   if(!result.success){
      return{
         errors: result.error.flatten().fieldErrors
      }
   }


   return {
      errors:{}
   }
      // revalidate the home page

}

