import { useState, useEffect } from "react";
import { useResponsive } from "ahooks";
import { useTheme } from "antd-style";
import { el } from "date-fns/locale";

const useResponsivePadding = () => {
  const token = useTheme();
  const { xs, sm, md, lg, xl, xxl } = useResponsive(); // Lấy các breakpoint từ useResponsive
  const [padding, setPadding] = useState(token.padding); // Giá trị padding mặc định

  useEffect(() => {
    // Dựa vào các giá trị xs, sm, md, lg, xl để xác định padding
    if (!xs) {
      setPadding(token.paddingXXS); // paddingXS
    } else if (xs && !sm) {
      setPadding(token.paddingXS); // paddingXS
    } else if (sm && !md) {
      setPadding(token.paddingSM);
    } else if (md && !lg) {
      setPadding(token.padding);
    } else if (lg && !xl) {
      setPadding(token.padding);
    } else if (xl && !xxl) {
      setPadding(token.padding);
    } else {
      setPadding(token.paddingLG);
    }

    console.log("xs, sm, md, lg, xl", xs, sm, md, lg, xl, xxl);
  }, [xs, sm, md, lg, xl]);

  return padding;
};

export default useResponsivePadding;
