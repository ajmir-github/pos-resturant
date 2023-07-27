import TopNav from "@/Components/Top";
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
  const [vars, setVars] = useState([]);
  const formRef = useRef(null);
  const closeAndResetModal = () => {
    formRef.current.reset();
    closeModal();
  };
  const addToCartWithVariations = () => {
    closeAndResetModal();
    let customItem = { ...item };
    const addToVariant = (v) => {
      customItem.variant = customItem.variant
        ? [...customItem.variant, v]
        : [v];
    };
    vars.forEach(({ name, type, value, property, amount, component }) => {
      switch (type) {
        case VARIARION_TYPE.changeCount:
          customItem.count = value;
          break;

        case VARIARION_TYPE.changePrice:
          customItem.price = value;
          break;

        case VARIARION_TYPE.substructFromPrice:
          customItem.price -= amount;
          break;

        case VARIARION_TYPE.addToPrice:
          customItem.price += amount;
          break;

        case VARIARION_TYPE.addProperty:
          customItem = { ...customItem, ...property };
          break;
      }

      if (component === VARIARION_COMPONENT.checkbox) {
        addToVariant(name);
      } else if (component === VARIARION_COMPONENT.select) {
        addToVariant(value);
      }
    });
    addToCart({ ...customItem, passedVariations: vars });
  };

  const excludeVar = (name) => setVars(vars.filter((v) => v.name !== name));
  const varsHas = (name) => vars.some((v) => v.name === name);
  const addVar = (newVar) => setVars([...vars, newVar]);

  const onInputChange = (variation) => {
    // exclude it from vars
    if (variation.value === variation.default)
      return excludeVar(variation.name);
    // updated the added var
    if (varsHas(variation.name))
      return setVars(
        vars.map((v) =>
          v.name !== variation.name ? v : { ...v, value: variation.value }
        )
      );
    // add it for the first time in the vars
    addVar(variation);
  };

  return (
    <form method="dialog" className="modal-box" ref={formRef}>
      <h3 className="font-bold text-lg">{item.name}</h3>
      <div className="py-4">
        {getMustHaveVariations(item).map((variation, index) => {
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
                      defaultValue={variation.default}
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
                    defaultValue={variation.default}
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
                    defaultValue={variation.default}
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
                    defaultValue={variation.default}
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
