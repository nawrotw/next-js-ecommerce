import { auth } from "@/auth";
import AuthButton from "@/components/auth/AuthButton.server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {

  const session = await auth();

  return (<div className="p-1">
      <h1>Home</h1>
      <Button className='my-4'>
        <Link href='/admin'>Admin Dashboard</Link>
      </Button><br/>
      <AuthButton/>
      <pre>Logged User: {JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
