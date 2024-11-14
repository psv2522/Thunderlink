import GetStartedBtn from "@/components/getstartedbtn";
import NavBar from "@/components/navbar";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black">
      <NavBar />
      <div className="mx-auto w-11/12 px-4">
        <div className="flex min-h-screen flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="flex flex-col items-start justify-center">
            <h1 className="hypens-manual max-w-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text pt-32 text-6xl font-bold text-transparent dark:from-purple-400 dark:to-blue-400">
              Capture your online essence in one simple thunderlink
            </h1>
            <p className="mt-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              A solitary thunderlink that functions as a way to share your
              online presence to whoever you want!
            </p>
            <div className="mt-12">
              <GetStartedBtn />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center lg:mt-0 mr-28">
            <div className="mockup-phone border-primary">
              <div className="camera"></div>
              <div className="display">
                <div className="artboard artboard-demo phone-1">
                  <Image
                    src="/demo/profile1.png"
                    alt="Thunderlink Demo"
                    width={300}
                    height={800}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
