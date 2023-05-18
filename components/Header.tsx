import Image from "next/image";
import Link from "next/link";
import { logo } from "@/public/assets";

const Header = () => {
  return (
    <header className="w-fullbg-white px-4 py-4 sm:px-8 border-b border-b-[#e6ebf4]">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          className="w-28 object-contain cursor-pointer"
        />
      </Link>
    </header>
  );
};

export default Header;
