import TopNav from "@/Components/Top";
import { EURO_SYMBOL, classes, conditionalClasses } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ITEM_TYPE = {
  food: "FOOD",
  drink: "DRINK",
  dessert: "DESSERT",
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
      type: ITEM_TYPE.food,
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
      type: ITEM_TYPE.drink,
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
      type: ITEM_TYPE.dessert,
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
                [ITEM_TYPE.food]: "border-l-2 border-l-primary",
                [ITEM_TYPE.drink]: "border-l-2 border-l-error",
                [ITEM_TYPE.dessert]: "border-l-2 border-l-info",
              })
            )}
            key={item.id}
          >
            <span className="">{index + 1}</span>
            <span className="grow flex flex-col md:flex-row items-start md:items-center md:gap-2">
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
    </div>
  );
}

function TableActions() {
  return (
    <div className="join">
      <button className="join-item btn-sm btn btn-primary grow">Send</button>
      <button className="join-item btn-sm btn btn-info grow">Discount</button>
      <button className="join-item btn-sm btn btn-info grow">
        Print Check
      </button>
      <button className="join-item btn-sm btn btn-info grow">Invoice</button>
    </div>
  );
}

function ItemsFilter({ categories, setCategory }) {
  const [filterCategory, setFilterCategory] = useState(0);
  const [filterSubCategory, setFilterSubCategory] = useState(0);

  useEffect(() => {
    const { name, subCategories } = categories[filterCategory];
    setCategory(name, subCategories[filterSubCategory]);
  }, [filterCategory, filterSubCategory]);

  return (
    <div className="flex gap-2 flex-col">
      {/* Categories */}
      <div className="tabs font-bold">
        {categories.map((category, index) => (
          <button
            onClick={() => setFilterCategory(index)}
            className={classes(
              "tab grow tab-bordered",
              filterCategory === index && "tab-active"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      {/* SUB-Categories */}

      <div className="tabs tabs-boxed">
        {categories[filterCategory].subCategories.map((subCategory, index) => (
          <button
            onClick={() => setFilterSubCategory(index)}
            className={classes(
              "tab",
              filterSubCategory === index && "tab-active"
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
  const categories = [
    {
      name: "Drinks",
      subCategories: [
        "Apperitives",
        "Coffee",
        "Cooktails",
        "Soft Drinks",
        "Red Wines",
        "White Wines",
        "Rose Wines",
      ],
    },
    {
      name: "Foods",
      subCategories: [
        "Starters",
        "Pizza",
        "Side Dishes",
        "Pasta",
        "Steaks",
        "Salads",
      ],
    },
    {
      name: "Desserts",
      subCategories: ["Hot desserts", "Cold desserts"],
    },
  ];
  const setCategory = (category, subCategory) => {
    console.log({ category, subCategory });
  };
  return (
    <div className="flex gap-2 flex-col">
      <ItemsFilter categories={categories} setCategory={setCategory} />
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
