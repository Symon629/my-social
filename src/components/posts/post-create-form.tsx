"use client"
import { useFormState } from "react-dom"
import { Input, Button,Textarea, Popover, PopoverContent,PopoverTrigger} from "@nextui-org/react"
import * as actions from "@/actions"
import FormButton from "../common/form-button"

export default function PostCreateForm(){
    const [formState,action] = useFormState(actions.createPost,{errors:{    
    }})
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">
                    Create a Post
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">
                            Create a Post
                        </h3>
                       <Input
                       name="title"
                       label="Title"
                       labelPlacement="outside"
                       placeholder="Title"
                       /> 
                       <Input
                       name="content"
                       label="Content"
                       labelPlacement="outside"
                       placeholder="Content"
                       />
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}