import TopNav from "@/Components/Top";
import { EURO_SYMBOL, classes, conditionalClasses } from "@/utils";
import { useRouter } from "next/router";

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
      <div className="text-primary flex justify-center gap-2">
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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        Cart
      </div>
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

      <div className="flex px-4 justify-center">
        <span className="">Total</span>
        <span className="ml-2 font-bold">{EURO_SYMBOL} 96.3</span>
      </div>
    </div>
  );
}

export default function Table() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4">
      <TopNav backHref={"/sales"} className="flex gap-2 px-2 justify-end">
        Table: {+router.query.id + 1}
      </TopNav>

      <Cart />
    </div>
  );
}
