import Link from "next/link";

const Masthead = () => {
  return (
    <div className="relative px-4 sm:px-8 w-full flex flex-col justify-center h-[60vh]">
      <div className="z-50 text-white">
        <h1 className="font-bold text-2xl sm:text-3xl">
          The Community Showcase
        </h1>
        <p className="mt-2 text-base max-w-lg">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI.
        </p>

        <Link href="/create-post">
          <button className="mt-2 px-4 py-2 bg-black/50 hover:bg-black/90 rounded-md">
            Share your thoughts
          </button>
        </Link>
      </div>

      <video
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        onContextMenu={(event) => event.preventDefault()}
        autoPlay
        muted
        loop
      >
        <source src="/assets/hero-banner.mp4" />
      </video>
    </div>
  );
};

export default Masthead;
