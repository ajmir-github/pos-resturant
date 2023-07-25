import TopNav from "@/Components/Top";
import { EURO_SYMBOL, classes, conditionalClasses } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ITEM_CATEGORY = {
  foods: "Foods",
  drinks: "Drinks",
  desserts: "Desserts",
};

const ITEM_CATEGORIES = ["Foods", "Drinks", "Desserts"];
const ITEM_SUB_CATEGORIES = {
  [ITEM_CATEGORY.drinks]: [
    "Apperitives",
    "Coffee",
    "Cooktails",
    "Soft Drinks",
    "Red Wines",
    "White Wines",
    "Rose Wines",
  ],
  [ITEM_CATEGORY.foods]: [
    "Starters",
    "Pizza",
    "Side Dishes",
    "Pasta",
    "Steaks",
    "Salads",
  ],
  [ITEM_CATEGORY.desserts]: ["Hot desserts", "Cold desserts"],
};

const VARIARION_TYPE = {
  increment: "INCREMENT",
  decrement: "DECREMENT",
  non: "NON",
};

function Cart() {
  const items = [
    {
      id: 1,
      type: ITEM_CATEGORY.foods,
      name: "Pizza Margarita",
      price: 12.5,
      isStarter: false,
      variations: [
        { name: "Gluten Free", type: VARIARION_TYPE.non },
        {
          name: "With mushrooms",
          type: VARIARION_TYPE.increment,
          amount: 0.5,
        },
      ],
    },
    {
      id: 2,
      type: ITEM_CATEGORY.drinks,
      name: "Mojito",
      price: 4.5,
      isStarter: false,
      variations: [
        {
          name: "Strawberry",
          type: VARIARION_TYPE.decrement,
          amount: 0.5,
        },
      ],
    },
    {
      id: 3,
      type: ITEM_CATEGORY.desserts,
      name: "Lava Cake",
      price: 4.5,
      isStarter: false,
      variations: [],
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 sm:gap-2">
        {items.map((item, index) => (
          <button
            className={classes(
              "btn h-auto btn-ghost flex text-sm",
              conditionalClasses(item.type, {
                [ITEM_CATEGORY.foods]: "border-l-2 border-l-primary",
                [ITEM_CATEGORY.drinks]: "border-l-2 border-l-error",
                [ITEM_CATEGORY.desserts]: "border-l-2 border-l-info",
              })
            )}
            key={item.id}
          >
            <span className="">{index + 1}</span>
            <span className="grow flex flex-col lg:flex-row items-start lg:items-center md:gap-2">
              <div>{item.name}</div>
              {item.variations.map((variation) => (
                <div className="ml-2 text-xs text-secondary-focus">
                  {variation.name}
                  {variation.type !== VARIARION_TYPE.non && (
                    <>
                      {" ("}
                      {variation.type === VARIARION_TYPE.increment ? "+" : "-"}
                      {EURO_SYMBOL}
                      {variation.amount}
                      {")"}
                    </>
                  )}
                </div>
              ))}
            </span>
            <span>
              {EURO_SYMBOL} {item.price}
            </span>
          </button>
        ))}
      </div>
      <div className="text-center font-bold text-lg">
        Total: {EURO_SYMBOL} 96.3
      </div>
      <button className="join-item btn-sm btn btn-success grow" disabled>
        Save
      </button>
    </div>
  );
}

function TableActions() {
  return (
    <div className="join">
      <button className="join-item btn-sm btn btn-primary grow">
        Discount
      </button>
      <button className="join-item btn-sm btn btn-warning grow">
        Print Check
      </button>
      <button className="join-item btn-sm btn btn-error grow">Invoice</button>
    </div>
  );
}

function ItemsFilter({ filter, setFilter }) {
  return (
    <div className="flex gap-2 flex-col">
      {/* Categories */}
      <div className="tabs font-bold">
        {ITEM_CATEGORIES.map((category) => (
          <button
            onClick={() => setFilter({ ...filter, category })}
            className={classes(
              "tab grow tab-bordered",
              filter.category === category && "tab-active"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      {/* SUB-Categories */}

      <div className="tabs tabs-boxed">
        {ITEM_SUB_CATEGORIES[filter.category].map((subCategory) => (
          <button
            onClick={() => setFilter({ ...filter, subCategory })}
            className={classes(
              "tab",
              filter.subCategory === subCategory && "tab-active"
            )}
          >
            {subCategory}
          </button>
        ))}
      </div>
    </div>
  );
}

function PlaceOrder() {
  const [filter, setFilter] = useState({
    category: ITEM_CATEGORY.drinks,
    subCategory: ITEM_SUB_CATEGORIES[ITEM_CATEGORY.drinks][0],
  });

  const items = [
    {
      id: 1,
      category: ITEM_CATEGORY.foods,
      subCategory: "Pasta",
      name: "Ragatoni Arrabiata",
      price: 10,
      veg: true,
    },
    {
      id: 2,
      category: ITEM_CATEGORY.foods,
      subCategory: "Pasta",
      name: "Taggatelle Pollo",
      price: 11,
    },
    {
      id: 3,
      category: ITEM_CATEGORY.foods,
      subCategory: "Pasta",
      name: "Languine Seafood",
      price: 15.5,
    },
    {
      id: 4,
      category: ITEM_CATEGORY.foods,
      subCategory: "Pizza",
      name: "Pizza Margaritta",
      price: 10.5,
      veg: true,
    },
    {
      id: 5,
      category: ITEM_CATEGORY.foods,
      subCategory: "Pizza",
      name: "Pizza Hawian",
      price: 12.5,
      veg: true,
    },
    {
      id: 6,
      category: ITEM_CATEGORY.drinks,
      subCategory: "Cooktails",
      name: "Pink Spritis",
      price: 5.5,
    },
    {
      id: 7,
      category: ITEM_CATEGORY.drinks,
      subCategory: "Soft Drinks",
      name: "Cola Zero",
      price: 2.5,
    },
  ];

  const filterFunc = (item) =>
    item.category === filter.category &&
    item.subCategory === filter.subCategory;

  return (
    <div className="flex gap-2 flex-col">
      <ItemsFilter filter={filter} setFilter={setFilter} />
      <div className="grid gap-2">
        {items.filter(filterFunc).map((item) => (
          <div className="join w-full" key={item.id}>
            <button
              className={classes(
                "join-item btn btn-outline grow flex",
                item.veg && "border-success"
              )}
            >
              <span className="grow text-left"> {item.name}</span>
              <span>
                {EURO_SYMBOL} {item.price}
              </span>
            </button>
            <button className="join-item btn btn-info">
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
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Table() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      <div className="flex flex-col gap-2 sm:gap-4">
        <TopNav backHref={"/sales"} className="flex gap-2 px-2 justify-end">
          Table: {+router.query.id + 1}
        </TopNav>

        <TableActions />
        <Cart />
      </div>

      <div className="flex flex-col gap-2">
        <PlaceOrder />
      </div>
    </div>
  );
}
