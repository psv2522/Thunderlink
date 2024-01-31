import GetStartedBtn from '@/components/getstartedbtn'
import NavBar from '@/components/navbar'


export default async function Home() {
  return (
    <div className='max-h-screen'>
      <NavBar/>
      <div className='w-11/12 mx-auto'>
        <div className='w-8/12 pt-32 text-6xl'>
          Your online essence captured in one single straightforward bio link.
        </div>
        <div className='w-8/12 pt-10 text-xl'>
          A solitary link that facilitates the sharing of all your portfolio and your socials like Instagram, Twitter, LinkedIn, and other social media platforms.
        </div>
        <div className='w-8/12 pt-10'>
          <GetStartedBtn/>
        </div>
      </div>
    </div>
  )
}
