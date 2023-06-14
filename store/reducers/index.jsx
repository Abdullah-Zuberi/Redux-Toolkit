import { combineReducers } from "redux";
import SiteReducer from "./siteReducer";
// Concatenate all reducers

export const rootReducer = combineReducers({
  site: SiteReducer,
});
