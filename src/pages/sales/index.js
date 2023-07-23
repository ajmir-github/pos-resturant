import Tables from "@/Components/Tables";
import TablesStats from "@/Components/TablesStats";
import { TABLE_STATUS } from "@/utils";
import { useMemo, useState } from "react";

export default function Home() {
  const [tables, setTables] = useState([
    {
      id: 0,
      tableNumber: 1,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 1,
      tableNumber: 2,
      status: TABLE_STATUS.open,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 2,
      tableNumber: 3,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 3,
      tableNumber: 4,
      status: TABLE_STATUS.open,
      hasStarter: true,
      customers: 2,
    },
    {
      id: 4,
      tableNumber: 5,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 5,
      tableNumber: 6,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 6,
      tableNumber: 7,
      status: TABLE_STATUS.break,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 7,
      tableNumber: 8,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 5,
    },
    {
      id: 8,
      tableNumber: 9,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 9,
      tableNumber: 10,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 10,
      tableNumber: 11,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 1,
    },
    {
      id: 11,
      tableNumber: 12,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 12,
      tableNumber: 13,
      status: TABLE_STATUS.open,
      hasStarter: true,
      customers: 2,
    },
    {
      id: 13,
      tableNumber: 14,
      status: TABLE_STATUS.close,
      hasStarter: false,
      customers: 4,
    },
    {
      id: 14,
      tableNumber: 15,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 15,
      tableNumber: 16,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 16,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 17,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 18,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 19,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 20,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 21,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 22,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 23,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 24,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 25,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 26,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
    {
      id: 27,
      tableNumber: 17,
      status: TABLE_STATUS.closing,
      hasStarter: false,
      customers: 2,
    },
  ]);

  const selectTable = (id) => console.log("SELECT TABLE ID: ", id);
  return (
    <main className="">
      <Tables tables={tables} selectTable={selectTable} />
    </main>
  );
}
