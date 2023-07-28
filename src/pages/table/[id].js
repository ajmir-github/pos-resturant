import Cart from "@/Components/Cart";
import ItemsList from "@/Components/ItemsList";
import TopNav from "@/Components/Top";
import { classes, generateID } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Table() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const ITEM_CATEGORIES = [
    { name: "Starters", color: "btn-primary" },
    { name: "Steaks", color: "btn-secondary" },
    { name: "Pasta", color: "btn-info" },
    { name: "Salads", color: "btn-warning" },
    { name: "Beverages", color: "btn-success" },
    { name: "Cooktails", color: "btn-primary" },
    { name: "Soft Drinks", color: "btn-info" },
    { name: "Beers", color: "btn-primary" },
    { name: "Apperitives", color: "btn-primary" },
    { name: "White Wines", color: "btn-secondary" },
    { name: "Rose Wine", color: "btn-primary" },
    { name: "Red Wine", color: "btn-neutral" },
    { name: "Kids", color: "btn-accent" },
    { name: "Desserts", color: "btn-ghost" },
  ];

  return (
    <div className="flex flex-col items-stretch sm:min-h-screen">
      <Link className="flex items-center p-1 sm:p-2" href={"/sales"}>
        <div className="grow font-mono flex items-center">
          <span className="grow gap-2 sm:gap-4 flex ">
            <span className="flex sm:gap-2 flex-col sm:flex-row">
              <span>9:45PM</span>
              <span>21 FEB 2023</span>
            </span>
            <span className="flex sm:gap-2 flex-col sm:flex-row">
              <span>Table: {router.query.id}</span>
            </span>
          </span>
          <span>Ajmir Raziqi</span>
        </div>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-1 gap-1">
        <div className="md:col-span-2 flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-primary btn-disabled">
              Back
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-secondary hidden md:inline-flex">
              Change
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-primary hidden md:inline-flex">
              Descount
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-success">
              Print <span className="hidden lg:block">Orders</span>
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-error">
              Edit
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-warning btn-disabled">
              Save
            </div>
          </div>
          <input
            type="text"
            placeholder="Search Here"
            className="input input-bordered rounded-none w-full "
          />
          <div className="flex gap-1 flex-wrap">
            {ITEM_CATEGORIES.map((category, index) => (
              <div
                className={classes(
                  "btn rounded-none btn-sm md:btn-md lg:btn-lg",
                  category.color
                )}
                key={category.name + index}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-primary">
              Pay
            </div>

            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-success">
              Reciept
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-error">
              Split
            </div>
          </div>
          <div className="">
            <ul className="menu bg-base-100">
              <li className="menu-title">Title</li>
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
