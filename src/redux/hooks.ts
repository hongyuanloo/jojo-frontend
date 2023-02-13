import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { reduxRootState, reduxDispatch } from "./store";

// type safe useReduxDispatch and useReduxSelector, to be used in app.
export const useReduxDispatch: () => reduxDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<reduxRootState> =
  useSelector;
