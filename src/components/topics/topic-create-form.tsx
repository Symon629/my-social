import { Popover, PopoverContent, PopoverTrigger,Button,Input,Textarea } from "@nextui-org/react";
import * as actions from "@/actions"

export default function TopicCreateForm(){

    return <div>
      <Popover placement="left">
        <PopoverTrigger>
            <Button color="primary">Create a topic</Button>
        </PopoverTrigger>
        <PopoverContent>
            <form action={actions.createTopic}>
                <div className="flexflex-col gap-4 p-4 w-80">
                    <h3>Create a topic</h3>
                    <Input name="name" label="Name" labelPlacement="outside" placeholder="Name"/>
                    <Textarea name="description" label="Description" labelPlacement="outside" placeholder="Describe your topic"/>
                    <Button type="submit">
                        Submit
                    </Button>

                </div>
            </form>
        </PopoverContent>

      </Popover>

    </div>

}