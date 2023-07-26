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

export default function Cart({ cartItems }) {
  const total = useMemo(
    () => cartItems.reduce((art, item) => art + item.price, 0),
    [cartItems]
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
      <div className="flex flex-col gap-1 sm:gap-2">
        {cartItems.map((item, index) => {
          const id = "CART_ITEM:" + item.id + "+INDEX" + index;
          return (
            <div key={id}>
              <ItemComponent
                item={item}
                onItemButton={() => alert("Wait")}
                onMoreButton={() => window[id].showModal()}
              />
              <dialog id={id} className="modal">
                <ItemSettings
                  item={item}
                  closeModal={() => window[id].close()}
                />
              </dialog>
            </div>
          );
        })}
      </div>
      <div className="text-center font-bold text-lg">
        Total: {EURO_SYMBOL} {total}
      </div>
      <button className="join-item btn-sm btn btn-success grow" disabled>
        Save
      </button>
    </div>
  );
}
