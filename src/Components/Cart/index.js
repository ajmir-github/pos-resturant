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
  applyVarsOnItem,
} from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ItemComponent } from "../ItemComponent";

function ItemSettings({ item, closeModal }) {
  return (
    <>
      <div method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">More on {item.name}</h3>
        <div className="py-4">
          {/* Other item related variations */}
          {getMustHaveVariations(item).map((variation, index) => {
            switch (variation.component) {
              case VARIARION_COMPONENT.checkbox:
                return (
                  <div className="form-control" key={`Variation:${index}`}>
                    <label className="label cursor-pointer">
                      <span className="label-text">{variation.name}</span>
                      <input
                        type="checkbox"
                        defaultValue={variation.default}
                        onChange={(e) =>
                          onInputChange(
                            variation.name,
                            e.target.checked,
                            variation.default
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                );

              case VARIARION_COMPONENT.select:
                return (
                  <div
                    className="form-control w-full"
                    key={`Variation:${index}`}
                  >
                    <label className="label">
                      <span className="label-text">{variation.name}</span>
                    </label>
                    <select
                      className="select select-bordered"
                      defaultValue={variation.default}
                      onChange={(e) =>
                        onInputChange(
                          variation.name,
                          e.target.value,
                          variation.default
                        )
                      }
                    >
                      {variation.options.map((option) => (
                        <option>{option}</option>
                      ))}
                    </select>
                  </div>
                );
              case VARIARION_COMPONENT.numberInput:
                return (
                  <div
                    className="form-control w-full"
                    key={`Variation:${index}`}
                  >
                    <label className="label">
                      <span className="label-text">Counts</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      defaultValue={1}
                      onChange={(e) =>
                        onInputChange({
                          ...variation,
                          value: Number(e.target.value),
                        })
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                );
              default:
                return "";
            }
          })}
        </div>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            // onClick={addToCartWithVariations}
          >
            Add
          </button>
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default function Cart({ cartItems, removeFromCart }) {
  const total = useMemo(
    () => cartItems.reduce((art, item) => art + item.price, 0),
    [cartItems]
  );
  const is = {
    starter: (item) =>
      item.modifications &&
      item.modifications.some((m) => m.name === "Starter") &&
      item.category === ITEM_CATEGORY.foods,
    main: (item) =>
      !(
        item.modifications &&
        item.modifications.some((m) => m.name === "Starter")
      ) && item.category === ITEM_CATEGORY.foods,
    drink: (item) => item.category === ITEM_CATEGORY.drinks,
    dessert: (item) => item.category === ITEM_CATEGORY.desserts,
  };

  const has = useMemo(
    () => ({
      starters: cartItems.some(is.starter),
      mains: cartItems.some(is.main),
      drinks: cartItems.some(is.drink),
      desserts: cartItems.some(is.dessert),
    }),
    [cartItems]
  );

  const Category = ({ title, items }) => (
    <div className="flex flex-col gap-1 sm:gap-2">
      <div className="text-lg text-center">{title}</div>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <ItemComponent
              item={item}
              onDelete={removeFromCart}
              // onItemButton={() => window[item.id].showModal()}
              onItemButton={() => console.log(item)}
            />
            <dialog id={item.id} className="modal">
              {/* <ItemSettings
                item={item}
                closeModal={() => window[item.id].close()}
              /> */}
            </dialog>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="join">
        <button className="join-item btn-sm btn btn-primary grow">
          Discount
        </button>
        <button className="join-item btn-sm btn btn-warning grow">
          Print Check
        </button>
        <button className="join-item btn-sm btn btn-error grow">Invoice</button>
      </div>
      {/* Starters */}
      {has.starters && (
        <Category title={"Starter"} items={cartItems.filter(is.starter)} />
      )}

      {/* Mains */}
      {has.mains && (
        <Category title={"Mains"} items={cartItems.filter(is.main)} />
      )}
      {/* Mains */}
      {has.desserts && (
        <Category title={"Desserts"} items={cartItems.filter(is.dessert)} />
      )}
      {/* Drinks */}
      {has.drinks && (
        <Category title={"Drinks"} items={cartItems.filter(is.drink)} />
      )}
      <div className="text-center font-bold text-lg">
        Total: {EURO_SYMBOL} {total}
      </div>
      <button className="join-item btn-sm btn btn-success grow" disabled>
        Save
      </button>
    </div>
  );
}
