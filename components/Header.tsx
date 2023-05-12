import Image from "next/image";
import Link from "next/link";
import { logo } from "@/public/assets";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white px-4 py-4 sm:px-8 border-b border-b-[#e6ebf4]">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          className="w-28 object-contain cursor-pointer"
        />
      </Link>

      <Link href="/create-post">
        <button className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
          Create
        </button>
      </Link>
    </header>
  );
};

export default Header;
