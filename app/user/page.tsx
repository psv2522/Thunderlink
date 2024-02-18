import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NavBar from "@/components/navbar";

export default async function User() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <NavBar />
      {session ? (
        <div>
          <h2>Hi logged in userid</h2>
        </div>
      ) : (
        <div>
          <h2>Please log in to make your page</h2>
        </div>
      )}
    </div>
  );
}
