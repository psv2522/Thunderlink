import LinkButton from "@/components/linkbutton";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function User() {
  return (
    <div>
      <NavBar />
      <div className="flex h-screen">
        <div className="mx-auto mt-8 flex w-6/12 flex-col justify-between gap-12">
          <div className="text-center">
            <Image
              src="/profilepic.jpg"
              width={100}
              height={100}
              alt="Profile picture"
              className="mx-auto rounded-full"
            />
            <p className="m-4">@username</p>
            <p className="m-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              provident iusto eius voluptatem repudiandae inventore nesciunt
              quia saepe voluptas vitae alias modi minima deserunt doloribus
              consequatur autem tempore, explicabo ut?
            </p>
            <div className="mb-16">
              <LinkButton username="@psv2522" url="" />
              <LinkButton username="@psv2522" url="" />
              <LinkButton username="@psv2522" url="" />
            </div>
          </div>
          <div className="mb-12 flex justify-center">
            <Button>Get your own zaplink now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
