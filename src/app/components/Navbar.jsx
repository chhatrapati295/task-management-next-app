import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <Link href="/" className="logoWrapper">
        <Image src="/assets/logo.png" width="60" height="60" alt="logo img" />
        <h2>TaskEasy</h2>
      </Link>
    </div>
  );
};

export default Navbar;
