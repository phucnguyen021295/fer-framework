import { middleware } from "@/fe-base/reducers/middleware";
import { authApi } from "@/fe-module-auth/apis";
import { regionApi } from "../apis/region";
import { cityApi } from "../apis/city";

const _middleware = middleware([authApi.middleware, regionApi.middleware, cityApi.middleware]);

export { _middleware };
