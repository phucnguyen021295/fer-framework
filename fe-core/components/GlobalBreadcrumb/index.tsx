import { Breadcrumb, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { appSelector } from "../../reducers/app";

const { Text } = Typography;

const transformMenuToBreadcrumb = (menuItems, path) => {
  const breadcrumbs = [];
  const findPath = (items, currentPath) => {
    for (const item of items) {
      if (item.link === currentPath) {
        breadcrumbs.push(item);
        return true;
      }
      if (item.children) {
        if (findPath(item.children, currentPath)) {
          breadcrumbs.unshift(item);
          return true;
        }
      }
    }
    return false;
  };

  findPath(menuItems, path);

  return breadcrumbs.map((item) => {
    const breadcrumbItem = {
      title: (
        <>
          {item.icon}
          {item.label && <span>{item.label}</span>}
        </>
      ),
    };

    // ⚡ Chỉ thêm `href` nếu có `children`
    if (item.children) {
      breadcrumbItem.href = item.link;
    }

    return breadcrumbItem;
  });
};

const GlobalBreadcrumb = (props) => {
  const pathname = usePathname();
  const menuItems = useSelector(appSelector.getItemsMenu);
  const breadcrumbItems = transformMenuToBreadcrumb(menuItems, pathname);

  return <Breadcrumb items={breadcrumbItems} style={{ marginLeft: 16 }} />;
};

export default GlobalBreadcrumb;
