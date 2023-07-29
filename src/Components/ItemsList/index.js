import TopNav from "@/Components/TopPanel";
import {
  EURO_SYMBOL,
  classes,
  conditionalClasses,
  ITEMS,
  ITEM_CATEGORIES,
  ITEM_SUB_CATEGORIES,
  TABLE_STATUS,
  VARIARION_COMPONENT,
  VARIARION_TYPE,
  ITEM_CATEGORY,
  getMustHaveVariations,
} from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ItemsFilterer from "./ItemsFilterer";
import { ItemComponent } from "../ItemComponent";
import CustomItem from "./CustomItem";

export default function ItemsList({ addToCart }) {
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
      <ItemsFilterer filter={filter} setFilter={setFilter} />
      <div className="grid gap-1">
        {ITEMS.filter(filterFunc).map((item) => {
          const id = "ITEM_MODAL:" + item.id;
          return (
            <div key={id}>
              <ItemComponent
                item={item}
                onItemButton={() => addToCart(item)}
                onMoreButton={() => window[id].showModal()}
              />
              <dialog id={id} className="modal">
                <CustomItem
                  addToCart={addToCart}
                  item={item}
                  closeModal={() => window[id].close()}
                />
              </dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
}
