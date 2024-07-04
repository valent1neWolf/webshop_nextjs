import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between h-16 bg-white text-black "
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className=" min-w-max flex ">
        <Link href="https://github.com/valent1neWolf">
          <img src="/github.svg" className="min-h-8 px-4" />
        </Link>
        <Link href="https://www.linkedin.com/in/b%C3%A1lint-farkas-73b709309/">
          <img src="/linkedin.svg" className="min-h-8 " />
        </Link>
      </div>
      {/* <p>© 2024 All rights reserved</p> */}
      <p className="italic">Data is currently not stored in a DB</p>
      <div>
        <img src="/images/portus.png" className="h-8" />
      </div>
    </footer>
  );
}
