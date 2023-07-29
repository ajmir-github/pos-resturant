import { TABLE_STATUS, classes, conditionalClasses } from "@/utils";
import Link from "next/link";
import { useMemo } from "react";
import TopNav from "./TopPanel";
import TopPanel from "./TopPanel";

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
    <div className="flex flex-col">
      <TopPanel backHref={"/"} userName={"Ajmir Raziqi"}>
        <span>Tables:{stats.tables}</span>
        <span>Customers:{stats.customers}</span>
      </TopPanel>
      <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
        {tables.map((table) => (
          <Link
            href={`/table/${table.id}`}
            className={classes(
              "btn h-20 sm:h-24  w-20 sm:w-24 text-2xl sm:text-4xl relative rounded-none",
              conditionalClasses(table.status, {
                [TABLE_STATUS.close]: "btn-ghost",
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
              <span className="text-xs  absolute bottom-1 left-2">Starter</span>
            )}
            <span className="text-xs  absolute top-1 left-2">
              {table.status}
            </span>
            <span className="text-xs  absolute bottom-1 right-2">
              {table.customers}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
