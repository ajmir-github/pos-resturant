// -------------- UTIL FUNCS
export function classes(...cls) {
  return cls.filter(Boolean).join(" ");
}

export function conditionalClasses(condition, classes) {
  return classes[condition] || classes.default;
}
export function conditionalComponents(condition, Components) {
  return Components[condition] || Components.default;
}

// -------------- ENUMS
export const TABLE_STATUS = {
  close: "CLOSE",
  open: "OPEN",
  closing: "CLOSING",
  break: "BREAK",
};

export const EURO_SYMBOL = <>&#8364;</>;

export const ITEM_CATEGORY = {
  foods: "Foods",
  drinks: "Drinks",
  desserts: "Desserts",
};

export const ITEM_CATEGORIES = ["Foods", "Drinks", "Desserts"];
export const ITEM_SUB_CATEGORIES = {
  [ITEM_CATEGORY.drinks]: [
    "Apperitives",
    "Coffee",
    "Cooktails",
    "Soft Drinks",
    "Red Wines",
    "White Wines",
    "Rose Wines",
  ],
  [ITEM_CATEGORY.foods]: [
    "Starters",
    "Pizza",
    "Side Dishes",
    "Pasta",
    "Steaks",
    "Salads",
  ],
  [ITEM_CATEGORY.desserts]: ["Hot desserts", "Cold desserts"],
};

export const VARIARION_COMPONENT = {
  checkbox: "checkbox",
  select: "select",
  numberInput: "numberInput",
  textInput: "textInput",
};

export const VARIARION_TYPE = {
  addToPrice: "ADD_TO_PRICE",
  substructFromPrice: "SUBTRACT_FROM_PRICE",
  changePrice: "CHANGE_PRICE",
  addProperty: "ADD_PROPERTY",
  changeCount: "CHANGE_COUNT",
  non: "NON",
};

export const ITEMS = [
  {
    id: 1,
    category: ITEM_CATEGORY.foods,
    subCategory: "Pasta",
    name: "Ragatoni Arrabiata",
    price: 10,
    veg: true,
    variations: [
      {
        name: "Gluten Free",
        component: VARIARION_COMPONENT.checkbox,
        type: VARIARION_TYPE.addToPrice,
        amount: 1,
        default: false,
      },
      {
        name: "Meat",
        component: VARIARION_COMPONENT.select,
        options: [
          "Rare",
          "Rare-to-medium",
          "Medium",
          "Medium-to-well-Done",
          "Well-Done",
        ],
        default: "Medium",
        type: VARIARION_TYPE.non,
      },
    ],
  },
  {
    id: 2,
    category: ITEM_CATEGORY.foods,
    subCategory: "Pasta",
    name: "Taggatelle Pollo",
    price: 11,
  },
  {
    id: 3,
    category: ITEM_CATEGORY.foods,
    subCategory: "Pasta",
    name: "Languine Seafood",
    price: 15.5,
  },
  {
    id: 4,
    category: ITEM_CATEGORY.foods,
    subCategory: "Pizza",
    name: "Pizza Margaritta",
    price: 10.5,
    veg: true,
    variations: [
      {
        name: "With mushrooms",
        component: VARIARION_COMPONENT.checkbox,
        toPrice: VARIARION_TYPE.addToPrice,
        amount: 0.5,
      },
    ],
  },
  {
    id: 5,
    category: ITEM_CATEGORY.foods,
    subCategory: "Pizza",
    name: "Pizza Hawian",
    price: 12.5,
    veg: true,
  },
  {
    id: 6,
    category: ITEM_CATEGORY.drinks,
    subCategory: "Cooktails",
    name: "Pink Spritis",
    price: 5.5,
  },
  {
    id: 7,
    category: ITEM_CATEGORY.drinks,
    subCategory: "Soft Drinks",
    name: "Cola Zero",
    price: 2.5,
  },

  {
    id: 8,
    category: ITEM_CATEGORY.drinks,
    subCategory: "Cooktails",
    name: "Mojito",
    price: 4.5,
    variations: [
      {
        name: "Non-alcoholic",
        component: VARIARION_COMPONENT.checkbox,
        default: false,
        type: VARIARION_TYPE.substructFromPrice,
        amount: 0.5,
      },
      {
        name: "Mixer",
        component: VARIARION_COMPONENT.select,
        options: ["Classic", "Strawberry"],
        default: "Classic",
        type: VARIARION_TYPE.non,
      },
    ],
  },
];

export const getMustHaveVariations = ({
  category,
  price,
  count,
  variations,
}) => {
  const vars = [];
  // only for food
  if (category === ITEM_CATEGORY.foods) {
    vars.push({
      name: "Starter",
      component: VARIARION_COMPONENT.checkbox,
      default: false,
      type: VARIARION_TYPE.addProperty,
      property: {
        starter: true,
      },
    });
  }

  // for all: change the count
  vars.push({
    name: "Count",
    component: VARIARION_COMPONENT.numberInput,
    type: VARIARION_TYPE.changeCount,
    default: count || 1,
  });
  // for all: change the price
  vars.push({
    name: "Price",
    component: VARIARION_COMPONENT.numberInput,
    type: VARIARION_TYPE.changePrice,
    default: price,
  });

  if (!variations) return vars;
  return [...vars, ...variations];
};
