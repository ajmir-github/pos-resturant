import Link from "next/link";

export default function TopPanel({ backHref, children, userName }) {
  return (
    <Link
      className="flex items-center p-4 font-mono text-xs sm:text-base"
      href={backHref}
    >
      <div className="grow flex">
        <span className="grow flex gap-2">
          <span className="flex gap-2">{children}</span>
        </span>
        <span>{userName}</span>
      </div>
    </Link>
  );
}
