import GetStartedBtn from "@/components/getstartedbtn";
import NavBar from "@/components/navbar";
import Image from 'next/image';

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black">
      <NavBar />
      <div className="mx-auto w-11/12 px-4">
        <div className="flex min-h-screen flex-row items-center justify-between gap-8">
          {/* Left content */}
          <div className="flex flex-col items-start justify-center">
            <h1 className="hypens-manual max-w-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text pt-32 text-6xl font-bold text-transparent dark:from-purple-400 dark:to-blue-400">
              Capture your online essence in one simple thunder&shy;link
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              A solitary thunderlink that functions as a way to share your online presence to whoever you want!
            </p>
            <div className="mt-12">
              <GetStartedBtn />
            </div>
          </div>
          
          {/* Right side image */}
          <div className="hidden lg:flex h-[600px] w-[600px] items-center justify-center">
            <div className="relative w-full h-full rounded-lg bg-gray-800/50 backdrop-blur-sm overflow-hidden">
              <Image
                src="/demo/profile1.png"
                alt="Thunderlink Demo"
                width={600}
                height={600}
                className="min-h-[600px] w-full object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
