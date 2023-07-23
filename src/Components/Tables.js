import { TABLE_STATUS, classes, conditionalClasses } from "@/utils";
import Link from "next/link";
import { useMemo } from "react";
import TopNav from "./Top";

export default function Tables({ tables, selectTable }) {
  const stats = useMemo(
    () => ({
      tables: tables.reduce(
        (total, cur) => total + (cur.status === TABLE_STATUS.close ? 0 : 1),
        0
      ),
      customers: tables.reduce((total, cur) => total + cur.customers, 0),
    }),
    [tables]
  );

  return (
    <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4">
      <TopNav backHref={"/"} className="flex gap-2 px-2 justify-end">
        <span>
          <spans className="stat-title text-sm">Tables</spans>{" "}
          <spans className="stat-value text-lg">{stats.tables}</spans>
        </span>
        <span>
          <span className="stat-title text-sm">Customers</span>{" "}
          <span className="stat-value text-lg"> {stats.customers}</span>
        </span>
      </TopNav>
      <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
        {tables.map((table) => (
          <Link
            href={`/table/${table.id}`}
            className={classes(
              "btn h-16 sm:h-18 md:h-20 w-16 sm:w-18 md:w-20 text-xl sm:text-2xl md:text-3xl relative",
              conditionalClasses(table.status, {
                [TABLE_STATUS.close]: "btn-outline",
                [TABLE_STATUS.open]: "btn-primary",
                [TABLE_STATUS.closing]: "btn-warning",
                [TABLE_STATUS.break]: "btn-accent",
              }),
              table.hasStarter && " border-b-error border-b-4"
            )}
            key={table.id}
            onClick={() => selectTable(table.id)}
          >
            {table.tableNumber}
            {table.hasStarter && (
              <span className="text-[8px] absolute top-0 left-2">Starter</span>
            )}
            <span className="text-[8px] absolute bottom-0 left-2">
              {table.status}
            </span>
            <span className="text-[8px] absolute bottom-0 right-2">
              {table.customers}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
