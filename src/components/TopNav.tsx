import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/edit", label: "Edit" },
  { href: "/preview", label: "Preview" },
  { href: "/export", label: "Export" },
];

export default function TopNav() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6">
        <div className="flex-1">
          <Link className="btn btn-ghost text-lg font-semibold" href="/">
            Resume Builder
          </Link>
        </div>
        <div className="flex-none gap-2">
          {navItems.map((item) => (
            <Link key={item.href} className="btn btn-ghost" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
