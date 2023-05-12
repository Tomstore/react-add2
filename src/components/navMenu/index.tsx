import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterType } from "../../types";
import { useAppSelector } from "../../store/hooks";

type MenuItem = Required<MenuProps>["items"][number];

type PropsType = {
  routes: RouterType[];
};

const Index: React.FC<PropsType> = ({ routes }) => {
  // 获取访问路由路径
  const { pathname } = useLocation();
  // 获取跳转
  const navigate = useNavigate();
  const permission_list = useAppSelector((state) => state.user.permission_list);
  const gennerateItems = (routes: RouterType[]): MenuItem[] => {
    return routes
      .filter(
        (v) =>
          !v.meta?.hidden &&
          v.meta?.permission &&
          permission_list.includes(v.meta?.permission)
      )
      .map((v) => {
        if (v.children)
          return {
            key: v.path,
            label: v.meta?.title,
            icon: v.meta?.icon,
            children: gennerateItems(v.children),
          };

        return {
          key: v.path,
          icon: v.meta?.icon,
          label: v.meta?.title,
        };
      });
  };
  // 导航菜单
  const items: MenuItem[] = gennerateItems(routes);
  return (
    <Menu
      onClick={({ key }) => navigate(key)}
      theme="dark"
      defaultSelectedKeys={[pathname]}
      mode="inline"
      items={items}
    />
  );
};

export default Index;
