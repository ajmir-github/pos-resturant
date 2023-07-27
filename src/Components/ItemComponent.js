import {
  EURO_SYMBOL,
  ITEM_CATEGORY,
  classes,
  conditionalClasses,
} from "@/utils";

export function ItemComponent({ item, onItemButton, onMoreButton }) {
  const count = item.count || 1;
  const multiple = count > 1;
  return (
    <div
      className={classes(
        "join w-full border-[2px]  border-opacity-40",
        conditionalClasses(item.category, {
          [ITEM_CATEGORY.foods]: "border-yellow-500",
          [ITEM_CATEGORY.drinks]: "border-blue-500",
          [ITEM_CATEGORY.desserts]: "border-green-500",
          default: "border-transparent",
        })
      )}
    >
      <button
        onClick={onItemButton}
        className={classes("join-item btn  grow flex btn-sm")}
      >
        <span className="grow text-left">
          {multiple && count + "x"} {item.name}
        </span>

        {multiple ? (
          <span className="flex  items-center gap-4">
            <span>
              Per: {EURO_SYMBOL} {item.price}
            </span>
            <span>
              {EURO_SYMBOL} {item.price * count}
            </span>
          </span>
        ) : (
          <span className="flex gap-2 items-center">
            {EURO_SYMBOL} {item.price * count}
          </span>
        )}
      </button>
      <button className="join-item btn  btn-sm" onClick={onMoreButton}>
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
  );
}
