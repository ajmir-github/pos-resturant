import { classes } from "@/utils";
import Link from "next/link";

export default function TopNav({ backHref, children, className }) {
  return (
    <Link className="flex items-center" href={backHref}>
      <div className={classes("grow", className)}>{children}</div>
    </Link>
  );
}
