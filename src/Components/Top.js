import { classes } from "@/utils";
import Link from "next/link";

export default function TopNav({ backHref, children, className }) {
  return (
    <div className="flex items-center">
      <Link href={backHref} className="btn btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span className="hidden md:block">Back</span>
      </Link>
      <div className={classes("grow", className)}>{children}</div>
    </div>
  );
}
