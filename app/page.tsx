import LogoutButton from '@/components/logout';
import NavBar from '@/components/navbar'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <NavBar/>
      {session ? (
        <div>
          <h2>Hi logged in userid</h2>
          <LogoutButton/>
        </div>
      ) : (
          <div>
            <h2>Please log in to make your page</h2>
          </div>
      )}
    </div>
  )
}
