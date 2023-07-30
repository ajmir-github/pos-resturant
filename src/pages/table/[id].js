import ItemsList from "@/Components/ItemsList";
import TopPanel from "@/Components/TopPanel";
import TopNav from "@/Components/TopPanel";
import { EURO_SYMBOL, classes, generateID } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ITEM_TYPE = {
  food: "Food",
  drink: "Drink",
  dessert: "dessert",
};
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
    type: ITEM_TYPE.dessert,
    category: "Desserts",
    color: "btn-secondary",
    price: 7.5,
  },
  {
    name: "Cheese Cake",
    type: ITEM_TYPE.dessert,

    category: "Desserts",
    color: "btn-warning",
    price: 6.5,
  },
  {
    name: "Freshstrawberries",
    type: ITEM_TYPE.dessert,

    category: "Desserts",
    color: "btn-secondary",
    price: 5,
  },
  {
    name: "Cola",
    type: ITEM_TYPE.drink,

    category: "Soft Drinks",
    color: "btn-secondary",
    price: 2.5,
  },
  {
    name: "Cola Zero",
    type: ITEM_TYPE.drink,
    category: "Soft Drinks",
    color: "btn-error",
    price: 2.5,
  },
  {
    name: "Speggitte Carbonara",
    type: ITEM_TYPE.food,
    category: "Pasta",
    color: "btn-error",
    price: 12.5,
  },
  {
    name: "Halumi",
    type: ITEM_TYPE.food,
    category: "Starters",
    starter: true,
    color: "btn-error",
    price: 12.5,
  },
];

const ITEM_GROUPS = [
  {
    id: "CART_GROUP_1",
    name: "Starters",
    filterFunc: (item) => item.type === ITEM_TYPE.food && item.starter,
  },
  {
    id: "CART_GROUP_2",
    name: "Mains",
    filterFunc: (item) => item.type === ITEM_TYPE.food && !item.starter,
  },
  {
    id: "CART_GROUP_3",
    name: "Desserts",
    filterFunc: (item) => item.type === ITEM_TYPE.dessert,
  },
  {
    id: "CART_GROUP_4",
    name: "Drinks",
    filterFunc: (item) => item.type === ITEM_TYPE.drink,
  },
];
function Feed({ addItemToCart }) {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");

  const searchMode = !!search;
  const filterFunc = (item) => {
    if (search) {
      const pattern = new RegExp(search, "ig");
      return pattern.test(item.name);
    }
    return item.category === category;
  };

  return (
    <div className=" flex flex-col gap-1">
      <input
        type="text"
        placeholder="Search Here"
        className="input input-bordered rounded-none w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-1 flex-wrap">
        {searchMode ? (
          <button
            className="btn rounded-none btn-sm md:btn-md btn-secondary btn-outline"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        ) : (
          <button
            className="btn rounded-none btn-sm md:btn-md btn-secondary btn-outline"
            disabled={category === null}
            onClick={() => setCategory(null)}
          >
            Back
          </button>
        )}
        {category || searchMode
          ? ITEMS.filter(filterFunc).map((item, index) => (
              <button
                onClick={() => addItemToCart(item)}
                className={classes(
                  "btn rounded-none btn-sm md:btn-md",
                  item.color
                )}
                key={item.name + index}
              >
                {item.name}
              </button>
            ))
          : ITEM_CATEGORIES.map((category, index) => (
              <button
                onClick={() => setCategory(category.name)}
                className={classes(
                  "btn rounded-none btn-sm md:btn-md",
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

function Cart({ cartItems, activeItem, setSelectedItem }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="bg-base-100 flex flex-col">
        <ul className="menu  font-bold  p-0 [&_li>*]:rounded-none [&_summary>*]:rounded-none">
          <li className="menu-title">Cart</li>
          {ITEM_GROUPS.map((group) => (
            <li className="" key={group.id}>
              <details open className="">
                <summary className="rounded-none">{group.name}</summary>
                <ul>
                  {cartItems.filter(group.filterFunc).map((item) => {
                    const isSelected = activeItem(item);
                    return (
                      <li key={item.id}>
                        <button
                          className={classes(
                            "flex",
                            isSelected && "border-x-2 border-primary"
                            // isSelected && "border-l-2"
                          )}
                          onClick={() => setSelectedItem(item, isSelected)}
                        >
                          <span className="grow">{item.name}</span>
                          <span>
                            {EURO_SYMBOL}
                            {item.price}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          ))}
        </ul>
        <div className="font-bold text-center p-2 bg-orange-500 text-white">
          Total: {EURO_SYMBOL}120.4
        </div>
      </div>
    </div>
  );
}

export default function Table() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const addItemToCart = (item) => {
    // clone and add new id to it
    const newItem = JSON.parse(JSON.stringify(item));
    newItem.id = generateID();
    setCartItems([...cartItems, newItem]);
  };

  const selectItem = (item, isSelected) => {
    if (!isSelected) return setSelectedItem(item);
    setSelectedItem(null);
  };

  const activeItem = (item) => {
    if (!selectedItem) return false;
    return selectedItem.id === item.id;
  };

  return (
    <div className="flex flex-col items-stretch sm:min-h-screen gap-1">
      <TopPanel backHref={"/sales"} userName={"Ajmir Raziqi"}>
        <span>Table: {router.query.id}</span>
        <span>Customers: 4</span>
      </TopPanel>

      <div className="flex gap-1 px-1">
        <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-warning btn-disabled">
          Save
        </div>
        <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-error">
          Edit
        </div>
        <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-info">
          More
        </div>
        <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-primary">
          Pay
        </div>

        <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-success">
          Reciept
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-1 gap-1">
        <div className="md:col-span-2 flex flex-col gap-1">
          {selectedItem ? (
            <div>{selectedItem.name}</div>
          ) : (
            <Feed addItemToCart={addItemToCart} />
          )}
        </div>
        <Cart
          cartItems={cartItems}
          activeItem={activeItem}
          setSelectedItem={selectItem}
        />
      </div>
    </div>
  );
}
