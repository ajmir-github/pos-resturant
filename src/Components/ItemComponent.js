import {
  EURO_SYMBOL,
  ITEM_CATEGORY,
  VARIARION_COMPONENT,
  classes,
  conditionalClasses,
} from "@/utils";

export function ItemComponent({ item, onItemButton, onMoreButton, onDelete }) {
  const count = item.count || 1;
  const multiple = count > 1;
  return (
    <div className={"join w-full"}>
      <button
        onClick={onItemButton}
        className={"join-item btn h-auto items-center grow flex btn-sm p-2"}
      >
        <span className={"grow text-left p-1"}>
          <div>
            {multiple && count + "x"} {item.name}
          </div>
          <div className="flex flex-col text-sm ml-2">
            {item.modifications &&
              item.modifications.map((mod, index) => (
                <span key={index} className="text-secondary text-xs">
                  {mod.name}
                  {mod.component === VARIARION_COMPONENT.select &&
                    " : " + mod.value}
                </span>
              ))}
          </div>
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
      {onDelete && (
        <button
          className="join-item btn h-auto btn-error  btn-sm"
          onClick={() => onDelete(item.id)}
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      )}

      {onMoreButton && (
        <button
          className="join-item btn btn-primary h-auto  btn-sm"
          onClick={onMoreButton}
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
      )}
    </div>
  );
}
