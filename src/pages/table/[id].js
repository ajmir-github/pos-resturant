import Cart from "@/Components/Cart";
import EditItem from "@/Components/EditItem";
import Feed from "@/Components/Feed";
import ItemsList from "@/Components/ItemsList";
import TopPanel from "@/Components/TopPanel";
import TopNav from "@/Components/TopPanel";
import {
  EURO_SYMBOL,
  classes,
  deepClone,
  generateID,
  ADDITION_TYPE,
  ITEMS,
  ITEM_CATEGORIES,
  ITEM_GROUPS,
  ITEM_TYPE,
} from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

  const editItemFromCart = (editedItem) => [
    setCartItems(
      cartItems.map((item) => {
        if (item.id !== editedItem.id) return item;
        editedItem.changed = true;
        return editedItem;
      })
    ),
  ];

  const selectItem = (item, isSelected) => {
    if (!isSelected) return setSelectedItem(item);
    setSelectedItem(null);
  };

  const activeItem = (item) => {
    if (!selectedItem) return false;
    return selectedItem.id === item.id;
  };

  const cancelEdit = () => setSelectedItem(null);

  return (
    <div className="flex flex-col items-stretch sm:min-h-screen gap-2">
      <TopPanel backHref={"/sales"} userName={"Ajmir Raziqi"}>
        <span>Table: {router.query.id}</span>
        <span>Customers: 4</span>
      </TopPanel>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-1 gap-2">
        <div className="md:col-span-2 flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-primary">
              Pay
            </div>

            <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-success">
              Reciept
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-error">
              Edit
            </div>
            <div className="btn rounded-none grow w-auto btn-outline btn-sm btn-info">
              More
            </div>
          </div>
          {selectedItem && (
            <EditItem
              item={selectedItem}
              cancelEdit={cancelEdit}
              editItemFromCart={editItemFromCart}
            />
          )}
          <div className={selectedItem ? "hidden" : "block"}>
            <Feed addItemToCart={addItemToCart} />
          </div>
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
