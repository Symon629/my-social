"use server"

export async function createTopic(formData:FormData){
   // revalidate the home page
   const name = formData.get('name')
   const description = formData.get('description')
}

