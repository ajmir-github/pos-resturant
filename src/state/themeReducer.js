const localThemeKey = "currnet-theme";

function getLocalTheme(defaultTheme) {
  if (typeof localStorage === "undefined") return defaultTheme;
  return localStorage.getItem(localThemeKey) || defaultTheme;
}
function setLocalTheme(theme) {
  if (typeof localStorage === "undefined") return theme;
  localStorage.setItem(localThemeKey, theme);
  return theme;
}

export const themesList = ["light", "dark"];
export const initialTheme = getLocalTheme(themesList[0]);

export const themeActions = {
  turnLightTheme: "TURN_LIGHT_THEME",
  turnDarkTheme: "TURN_DARK_THEME",
  chooseTheme: "CHOOSE_THEME",
};

export function themeReducer(state = initialTheme, { type, payload }) {
  switch (type) {
    case themeActions.turnLightTheme:
      return setLocalTheme(themesList[0]);

    case themeActions.turnDarkTheme:
      return setLocalTheme(themesList[1]);

    case themeActions.chooseTheme:
      return setLocalTheme(payload);

    default:
      return state;
  }
}
