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
  conditionalComponents,
} from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import ItemsFilterer from "./ItemsFilterer";
import { ItemComponent } from "../ItemComponent";

export default function CustomItem({ addToCart, item, closeModal }) {
  const itemVariations = getMustHaveVariations(item);
  const [variations, setVariations] = useState([]);
  const formRef = useRef(null);
  const closeAndResetModal = () => {
    formRef.current.reset();
    closeModal();
  };
  const addToCartWithVariations = () => {
    closeAndResetModal();
    addToCart({
      ...item,
      variations: itemVariations,
      modifications: variations.filter((v) => v.value !== v.defaultValue),
    });
  };

  const onInputChange = (variation) => {
    const match = (v) => v.name === variation.name;
    // if not exists push it
    if (!variations.some(match))
      return setVariations([...variations, variation]);
    // update
    setVariations(variations.map((v) => (match(v) ? variation : v)));
  };

  return (
    <form method="dialog" className="modal-box" ref={formRef}>
      <h3 className="font-bold text-lg">{item.name}</h3>
      <div className="py-4">
        {itemVariations.map((variation, index) => {
          switch (variation.component) {
            case VARIARION_COMPONENT.checkbox:
              return (
                <div
                  className="form-control"
                  key={`Variation:${variation.name},${index}`}
                >
                  <label className="label cursor-pointer">
                    <span className="label-text">{variation.name}</span>
                    <input
                      type="checkbox"
                      defaultValue={variation.defaultValue}
                      onChange={(e) =>
                        onInputChange({
                          ...variation,
                          value: e.target.checked,
                        })
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
                  key={`Variation:${variation.name},${index}`}
                >
                  <label className="label">
                    <span className="label-text">{variation.name}</span>
                  </label>
                  <select
                    className="select select-bordered"
                    defaultValue={variation.defaultValue}
                    onChange={(e) =>
                      onInputChange({
                        ...variation,
                        value: e.target.value,
                      })
                    }
                  >
                    {variation.options.map((option, index) => (
                      <option
                        key={`VariationOption:${variation.name},${index}`}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            case VARIARION_COMPONENT.numberInput:
              return (
                <div
                  className="form-control w-full"
                  key={`Variation:${variation.name},${index}`}
                >
                  <label className="label">
                    <span className="label-text">{variation.name}</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    defaultValue={variation.defaultValue}
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
            case VARIARION_COMPONENT.textInput:
              return (
                <div
                  className="form-control w-full"
                  key={`Variation:${variation.name},${index}`}
                >
                  <label className="label">
                    <span className="label-text">{variation.name}</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    defaultValue={variation.defaultValue}
                    onChange={(e) =>
                      onInputChange({
                        ...variation,
                        value: e.target.value,
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
          type="button"
          className="btn btn-primary"
          onClick={addToCartWithVariations}
        >
          Add
        </button>
        <button type="button" className="btn" onClick={closeAndResetModal}>
          Close
        </button>
      </div>
    </form>
  );
}
