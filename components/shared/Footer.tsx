import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
        <h1 className="text-2xl">Bhatsappp</h1>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
