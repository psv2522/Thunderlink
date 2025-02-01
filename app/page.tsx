import GetStartedBtn from "@/components/getstartedbtn";
import NavBar from "@/components/navbar";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black">
      <NavBar />
      <div className="mx-auto w-11/12 px-4">
        <div className="flex min-h-screen flex-col items-center justify-between gap-8 pt-20 lg:flex-row lg:pt-0">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="hypens-manual max-w-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text pt-16 text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl dark:from-purple-400 dark:to-blue-400">
              Capture your online essence in one simple thunderlink
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl lg:mt-8 dark:text-gray-300">
              A solitary thunderlink that functions as a way to share your
              online presence to whoever you want!
            </p>
            <div className="mt-8 lg:mt-12">
              <GetStartedBtn />
            </div>
          </div>

          <div className="flex items-center justify-center pb-12 lg:mr-28 lg:pb-0">
            <div className="mockup-phone scale-90 border-primary sm:scale-100">
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
