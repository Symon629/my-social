"use client";
import { Popover, PopoverContent, PopoverTrigger,Button,Input,Textarea } from "@nextui-org/react";
import * as actions from "@/actions"
import { useFormState } from "react-dom";

export default function TopicCreateForm(){

// Rememeber useFromState will give you back two things 
// One is the formState which will have a message 
// the other thing is the server action 

// it takes in the server action and the intial formstate
const [formState,action] =  useFormState(actions.createTopic, {errors:{}})

    return <div>
      <Popover placement="left">
        <PopoverTrigger>
            <Button color="primary">Create a topic</Button>
        </PopoverTrigger>
        <PopoverContent>
            <form action={action}>
                <div className="flexflex-col gap-4 p-4 w-80">
                    <h3>Create a topic</h3>
                    <Input name="name" label="Name" labelPlacement="outside" placeholder="Name"
                    isInvalid={!!formState.errors.name}
                    errorMessage={formState.errors.name?.join(",")}
                    />
                    
                    <Textarea name="description" label="Description" labelPlacement="outside" placeholder="Describe your topic"
                    isInvalid={!!formState.errors.description}
                    errorMessage={formState.errors.description?.join(", ")}
                    />
                    <Button type="submit">
                        Submit
                    </Button>

                </div>
            </form>
        </PopoverContent>

      </Popover>

    </div>

}