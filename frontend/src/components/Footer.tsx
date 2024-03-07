import Link from "next/link";

export default function Footer() {
  return (
    <footer className="my-2">
      A developer{" "}
      <Link href="https://github.com/open-format/rewardle">demo </Link> made
      with ❤️ by <Link href="https://www.openformat.tech"> OPENFORMAT</Link>
    </footer>
  );
}
