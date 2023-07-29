import { useSelector, useDispatch } from "react-redux";
import { themeActions, themesList } from "@/state";

export default function ThemeSelector() {
  const theme = useSelector((s) => s.theme);
  const dispatch = useDispatch();
  const onChange = (e) => {
    const selectedTheme = e.target.value;
    dispatch({ type: themeActions.chooseTheme, payload: selectedTheme });
  };
  return (
    <div>
      <select
        className="select select-bordered w-full max-w-xs"
        defaultValue={theme}
        onChange={onChange}
      >
        {themesList.map((themeName) => (
          <option key={themeName}>{themeName}</option>
        ))}
      </select>
    </div>
  );
}
