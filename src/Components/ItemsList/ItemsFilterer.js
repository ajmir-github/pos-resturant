import { ITEM_CATEGORIES, ITEM_SUB_CATEGORIES, classes } from "@/utils";

export default function ItemsFilterer({ filter, setFilter }) {
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
