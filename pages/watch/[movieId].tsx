import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);
  console.log(data, "data");
  console.log(movieId, "movieId");

  return (
    <div
      className="
      h-screen
      w-screen
      bg-black
    "
    >
      <nav
        className="
        fixed
        w-full
        p-4
        z-10
        flex
        flex-row
        items-center
        gap-8
        bg-black
        bg-opacity-70
      "
      >
        <AiOutlineArrowLeft
          className="text-white"
          size={40}
          onClick={() => router.push("/")}
        />
        <p className="text-white text-1xl md:text-3xl font-bold cursor-pointer">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="w-full h-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
