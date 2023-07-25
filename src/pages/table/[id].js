import TopNav from "@/Components/Top";
import { EURO_SYMBOL, classes, conditionalClasses } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

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

const VARIARION_TO_PRICE = {
  add: "ADD",
  substruct: "SUBTRACT",
  non: "NON",
};

const VARIARION_TYPE = {
  checkbox: "checkbox",
  select: "select",
};

const ITEMS = [
  {
    id: 1,
    category: ITEM_CATEGORY.foods,
    subCategory: "Pasta",
    name: "Ragatoni Arrabiata",
    price: 10,
    veg: true,
    variations: [
      {
        name: "Gluten Free",
        type: VARIARION_TYPE.checkbox,
        toPrice: VARIARION_TO_PRICE.add,
        amount: 1,
        default: false,
      },
      {
        name: "Meat to be coocked?",
        type: VARIARION_TYPE.select,
        options: ["R", "MR", "M", "MW", "WD"],
        toPrice: VARIARION_TO_PRICE.non,
      },
    ],
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
    variations: [
      {
        name: "With mushrooms",
        type: VARIARION_TYPE.checkbox,
        toPrice: VARIARION_TO_PRICE.add,
        amount: 0.5,
      },
    ],
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

function Cart({ cartItems }) {
  const total = useMemo(
    () => cartItems.reduce((art, item) => art + item.price, 0),
    [cartItems]
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 sm:gap-2">
        {cartItems.map((item, index) => (
          <button
            key={"CartItem:" + index}
            className={classes(
              "btn h-auto btn-ghost flex text-sm",
              conditionalClasses(item.category, {
                [ITEM_CATEGORY.foods]: "border-l-2 border-l-primary",
                [ITEM_CATEGORY.drinks]: "border-l-2 border-l-error",
                [ITEM_CATEGORY.desserts]: "border-l-2 border-l-info",
              })
            )}
          >
            <span className="">{index + 1}</span>
            <span className="grow flex flex-col lg:flex-row items-start lg:items-center md:gap-2">
              <div>{item.name}</div>
            </span>
            <span>
              {EURO_SYMBOL} {item.price}
            </span>
          </button>
        ))}
      </div>
      <div className="text-center font-bold text-lg">
        Total: {EURO_SYMBOL} {total}
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
        {ITEM_CATEGORIES.map((category, index) => (
          <button
            key={"Categories:" + index}
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
        {ITEM_SUB_CATEGORIES[filter.category].map((subCategory, index) => (
          <button
            key={"SubCategories:" + index}
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

function PlaceOrder({ addToCart }) {
  // filter the desired item and select it with the write types of varations
  const [filter, setFilter] = useState({
    category: ITEM_CATEGORY.drinks,
    subCategory: "Soft Drinks",
  });

  const filterFunc = (item) =>
    item.category === filter.category &&
    item.subCategory === filter.subCategory;

  return (
    <div className="flex gap-2 flex-col">
      <ItemsFilter filter={filter} setFilter={setFilter} />
      <div className="grid gap-2">
        {ITEMS.filter(filterFunc).map((item, index) => (
          <>
            <div className="join w-full" key={"ITEMS:" + index}>
              <button
                onClick={() => addToCart(item)}
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
              <button
                className="join-item btn btn-info"
                onClick={() => window["ITEM_MODAL:" + index].showModal()}
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
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            <dialog id={"ITEM_MODAL:" + index} className="modal">
              <div method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">More on {item.name}</h3>
                <div className="py-4">
                  {/* as a starter */}
                  {item.category === ITEM_CATEGORY.foods && (
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">As a starter</span>
                        <input
                          type="checkbox"
                          defaultValue={false}
                          className="checkbox"
                        />
                      </label>
                    </div>
                  )}
                  {/* Other item related variations */}
                  {item.variations &&
                    item.variations.map((variation) => {
                      switch (variation.type) {
                        case VARIARION_TYPE.checkbox:
                          return (
                            <div className="form-control">
                              <label className="label cursor-pointer">
                                <span className="label-text">
                                  {variation.name}
                                </span>
                                <input
                                  type="checkbox"
                                  defaultValue={variation.default}
                                  className="checkbox"
                                />
                              </label>
                            </div>
                          );

                        case VARIARION_TYPE.select:
                          return (
                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">
                                  {variation.name}
                                </span>
                              </label>
                              <select className="select select-bordered">
                                <option disabled selected>
                                  Pick one
                                </option>
                                {variation.options.map((option) => (
                                  <option>{option}</option>
                                ))}
                              </select>
                            </div>
                          );
                        default:
                          return "IDK";
                      }
                    })}

                  {/* Change the price */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Set a new price</span>
                    </label>
                    <input
                      type="number"
                      defaultValue={item.price}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <button
                    className="btn"
                    onClick={() => window["ITEM_MODAL:" + index].close()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </dialog>
          </>
        ))}
      </div>
    </div>
  );
}

export default function Table() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      category: ITEM_CATEGORY.foods,
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
      category: ITEM_CATEGORY.drinks,
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
      category: ITEM_CATEGORY.desserts,
      name: "Lava Cake",
      price: 4.5,
      isStarter: false,
      variations: [],
    },
  ]);

  const addToCart = (item) => setCartItems([...cartItems, item]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      <div className="flex flex-col gap-2 sm:gap-4">
        <TopNav backHref={"/sales"} className="flex gap-2 px-2 justify-end">
          Table: {+router.query.id + 1}
        </TopNav>

        <TableActions />
        <Cart cartItems={cartItems} />
      </div>

      <div className="flex flex-col gap-2">
        <PlaceOrder addToCart={addToCart} />
      </div>
    </div>
  );
}
