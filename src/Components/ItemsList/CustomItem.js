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
import { useEffect, useMemo, useState } from "react";
import ItemsFilterer from "./ItemsFilterer";
import { ItemComponent } from "../ItemComponent";

export default function CustomItem({ addToCart, item, closeModal }) {
  const [vars, setVars] = useState([]);

  const addToCartWithVariations = () => {
    return console.log(vars);

    // closeModal();
    let newProps = {};
    vars.forEach(({ type, value, property, amount }) => {
      console.log(type);
      switch (type) {
        case VARIARION_TYPE.changeCount:
          newProps.count = value;
          break;
        case VARIARION_TYPE.changePrice:
          newProps.price = value;
        default:
          break;
      }
    });
    console.log(newProps);
    // addToCart({ ...item, passedVariations: vars });
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
    <div method="dialog" className="modal-box">
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
                  key={`Variation:${variation.name},${index}`}
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
        <button className="btn btn-primary" onClick={addToCartWithVariations}>
          Add
        </button>
        <button className="btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}
