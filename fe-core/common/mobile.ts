import { useSelector } from "react-redux";
import { appSelector } from "../reducers/app";

export function useMobile() {
  const isMobile = useSelector(appSelector.getIsMobile);
  return isMobile;
}
