import { auth } from "@/auth";
import { Button } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import * as actions from "@/actions"
import Profile from "@/components/page";


export default  async function Home() {
  const session = await auth();
  return (
    <div>
      <form action={actions.signIn}>
      <Button type="submit">Sign In</Button>
      </form>
      {session?.user ? <div>{JSON.stringify(session.user)}</div>  : <div>Signed out</div>}

      <form action={actions.signOut}>
      <Button type="submit">Sign Out</Button>
      </form>
      <Profile/>
    </div>
    
  );
}
