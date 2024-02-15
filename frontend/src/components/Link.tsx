import Link from "next/link";
import { useRouter } from "next/router";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}
export default function RouterLink({ href, children }: LinkProps) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? "font-bold text-primary" : "nav-item font-bold"}
    >
      {children}
    </Link>
  );
}
