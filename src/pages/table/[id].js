import TopNav from "@/Components/Top";
import { useRouter } from "next/router";

const ITEM_TYPE = {
  food: "FOOD",
  drink: "DRINK",
  dessert: "DESSERT",
};

function Cart() {
  const items = [
    {
      type: ITEM_TYPE.food,
      name: "Pizza Margarita",
      variations: [
        { name: "Gluten Free", toPrice: 0 },
        { name: "With mushrooms", toPrice: 0.5 },
      ],
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
        <button className="btn  h-auto btn-ghost flex text-sm">
          <span>1</span>
          <span className="grow flex flex-col md:flex-row items-start md:items-center md:gap-2">
            <div>Pizza Margaratia</div>
            <div className="ml-2 text-xs text-secondary-focus">Gluten free</div>
            <div className="ml-2 text-xs text-secondary-focus">
              With mushrooms
            </div>
          </span>
          <span>$22.2</span>
        </button>
        <button className="btn  h-auto btn-ghost flex text-sm">
          <span>2</span>
          <span className="grow flex flex-col md:flex-row items-start md:items-center md:gap-2">
            <div>Pepper steak</div>
          </span>
          <span>$45.5</span>
        </button>
        <button className="btn  h-auto btn-ghost flex text-sm">
          <span>3</span>
          <span className="grow flex flex-col md:flex-row items-start md:items-center md:gap-2">
            <div>Tagatilli Pollo</div>
            <div className="ml-2 text-xs text-secondary-focus">
              Without garlic
            </div>
          </span>
          <span>$12.1</span>
        </button>
        <button className="btn  h-auto btn-ghost flex text-sm">
          <span>4</span>
          <span className="grow flex flex-col md:flex-row items-start md:items-center md:gap-2">
            <div>Mojito</div>
            <div className="ml-2 text-xs text-secondary-focus">Strawberry</div>
          </span>
          <span>$6.5</span>
        </button>
      </div>

      <div className="flex px-4 justify-center">
        <span className="">Total</span>
        <span className="ml-2 font-bold">$56.3</span>
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
