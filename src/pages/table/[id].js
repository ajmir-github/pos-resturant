import Cart from "@/Components/Cart";
import ItemsList from "@/Components/ItemsList";
import TopNav from "@/Components/Top";
import { generateID } from "@/utils";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Table() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const id = generateID();
    console.log({ id });
    setCartItems([...cartItems, { ...item, id }]);
  };

  const removeFromCart = (itemId) =>
    setCartItems(cartItems.filter((item) => item.id !== itemId));

  return (
    <div className="flex flex-col gap-2">
      <TopNav backHref={"/sales"} className="flex gap-2 px-2 justify-end">
        Table: {+router.query.id + 1}
      </TopNav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        <ItemsList addToCart={addToCart} />
      </div>
    </div>
  );
}
