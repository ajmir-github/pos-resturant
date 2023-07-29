// Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  themeActions,
  themeReducer,
  themesList,
  initialTheme,
} from "./themeReducer";

// Export Actions
export { themeActions, themesList, initialTheme };

// Reducers
const reducers = {
  theme: themeReducer,
};

// Store
const store = configureStore({
  reducer: combineReducers(reducers),
});

// inital state

// StoreProvider
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
