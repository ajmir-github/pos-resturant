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
      <div className="text-center font-bold text-lg">
        Total: {EURO_SYMBOL} 96.3
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
    </div>
  );
}

function TableActions() {
  return (
    <div className="join">
      <button
        className="join-item btn-sm btn btn-primary grow"
        onClick={() => window.order_modal.showModal()}
      >
        Order
      </button>
      <button className="join-item btn-sm btn btn-info grow">Discount</button>
      <button className="join-item btn-sm btn btn-info grow">
        Print Check
      </button>
      <button className="join-item btn-sm btn btn-info grow">Invoice</button>
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

      <TableActions />
      <Cart />

      <dialog id="order_modal" className="modal">
        <div className="bg-base-100 w-full h-full flex flex-col p-2 gap-2">
          <div className="flex gap-2 justify-end">
            {/* Actions */}
            <div className="join">
              <button
                className="join-item btn-sm btn btn-error grow"
                onClick={() => window.order_modal.close()}
              >
                Cancel
              </button>

              <button className="join-item btn-sm btn btn-success grow">
                Save
              </button>
            </div>
          </div>
          {/* Categories */}

          <div className="join">
            <div className="collapse collapse-plus join-item">
              <input type="checkbox" />
              <div className="text-center collapse-title font-bold">Drinks</div>
              <div className="flex flex-col gap-1 collapse-content">
                <div className="btn btn-outline btn-info">Apperitives</div>
                <div className="btn btn-outline btn-info">Coffee</div>
                <div className="btn btn-outline btn-info">Cooktails</div>
                <div className="btn btn-outline btn-info">Soft Drinks</div>
                <div className="btn btn-outline btn-info">Red Wines</div>
                <div className="btn btn-outline btn-info">White Wines</div>
                <div className="btn btn-outline btn-info">Rose Wines</div>
              </div>
            </div>
            <div className="collapse  collapse-plus join-item">
              <input type="checkbox" />
              <div className="text-center collapse-title font-bold">Foods</div>
              <div className="flex flex-col gap-1 collapse-content">
                <div className="btn btn-outline btn-info">Starters</div>

                <div className="btn btn-outline btn-info">Pizza</div>

                <div className="btn btn-outline btn-info">Side Dishes</div>

                <div className="btn btn-outline btn-info">Pasta</div>

                <div className="btn btn-outline btn-info">Steaks</div>

                <div className="btn btn-outline btn-info">Salads</div>
              </div>
            </div>
            <div className="collapse  collapse-plus join-item">
              <input type="checkbox" />
              <div className="text-center collapse-title font-bold">
                Desserts
              </div>
              <div className="flex flex-col gap-1 collapse-content">
                <div className="btn btn-outline btn-info">Hot desserts</div>

                <div className="btn btn-outline btn-info">Cold desserts</div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
