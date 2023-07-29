import ItemsList from "@/Components/ItemsList";
import TopPanel from "@/Components/TopPanel";
import TopNav from "@/Components/TopPanel";
import { EURO_SYMBOL, classes, generateID } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Feed() {
  const [category, setCategory] = useState(null);
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

  const ITEMS = [
    {
      name: "Lava Cake",
      category: "Desserts",
      color: "btn-secondary",
      price: 7.5,
    },
    {
      name: "Cheese Cake",
      category: "Desserts",
      color: "btn-warning",
      price: 6.5,
    },
    {
      name: "Freshstrawberries",
      category: "Desserts",
      color: "btn-secondary",
      price: 5,
    },
    {
      name: "Cola",
      category: "Soft Drinks",
      color: "btn-secondary",
      price: 2.5,
    },
    {
      name: "Cola Zero",
      category: "Soft Drinks",
      color: "btn-error",
      price: 2.5,
    },
  ];
  return (
    <div className="md:col-span-2 flex flex-col gap-1">
      <div className="flex gap-1">
        <button
          className="btn rounded-none grow w-auto btn-outline btn-xs md:btn-sm btn-primary"
          disabled={category === null}
          onClick={() => setCategory(null)}
        >
          Back
        </button>
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
        {category
          ? ITEMS.filter((i) => i.category === category).map((item, index) => (
              <div className="join">
                <div
                  className={classes(
                    "join-item btn rounded-none btn-sm md:btn-md lg:btn-lg",
                    item.color
                  )}
                  key={item.name + index}
                >
                  {item.name}
                </div>
                <button
                  className={classes(
                    "join-item btn rounded-none btn-outline btn-sm md:btn-md lg:btn-lg",
                    item.color
                  )}
                >
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
                      d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />
                  </svg>
                </button>
              </div>
            ))
          : ITEM_CATEGORIES.map((category, index) => (
              <button
                onClick={() => setCategory(category.name)}
                className={classes(
                  "btn rounded-none btn-sm md:btn-md lg:btn-lg",
                  category.color
                )}
                key={category.name + index}
              >
                {category.name}
              </button>
            ))}
      </div>
    </div>
  );
}

function Cart(params) {
  return (
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
  );
}

export default function Table() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="flex flex-col items-stretch sm:min-h-screen">
      <TopPanel backHref={"/sales"} userName={"Ajmir Raziqi"}>
        <span>Table: {router.query.id}</span>
        <span>Customers: 4</span>
      </TopPanel>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-1 gap-1">
        <Feed />
        <Cart />
      </div>
    </div>
  );
}
