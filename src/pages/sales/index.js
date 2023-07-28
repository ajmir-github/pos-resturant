import Tables from "@/Components/Tables";
import TablesStats from "@/Components/TablesStats";
import { TABLE_STATUS } from "@/utils";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [tables, setTables] = useState([]);

  const starters = [2, 6, 22, 55, 33];
  const open = [8, 44, 20, 12];
  const closing = [34, 9, 3, 11];

  useEffect(() => {
    let dataArr = [];
    for (let index = 1; index <= 60; index++)
      dataArr.push({
        id: "TABLE_ID:" + index,
        tableNumber: index,
        status: starters.includes(index)
          ? TABLE_STATUS.open
          : open.includes(index)
          ? TABLE_STATUS.open
          : closing.includes(index)
          ? TABLE_STATUS.closing
          : TABLE_STATUS.close,
        hasStarter: starters.includes(index),
        customers: 2,
      });
    setTables(dataArr);
  }, []);

  const selectTable = (id) => console.log("SELECT TABLE ID: ", id);
  return (
    <main className="">
      <Tables tables={tables} selectTable={selectTable} />
    </main>
  );
}
