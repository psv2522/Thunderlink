import GetStartedBtn from "@/components/getstartedbtn";
import NavBar from "@/components/navbar";

export default async function Home() {
  return (
    <div className="max-h-screen">
      <NavBar />
      <div className="mx-auto w-11/12 flex-col">
        <div className="hypens-manual w-8/12 justify-start pt-32 text-6xl">
          Capture your online essence in one simple thunder&shy;link
        </div>
        <div className="w-8/12 justify-start pt-10 text-xl">
          A solitary thunderlink that functions as a way to share your online presence to whoever you want!
        </div>
        <div className="w-8/12 justify-start pt-10">
          <GetStartedBtn />
        </div>
      </div>
    </div>
  );
}
