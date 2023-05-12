import React from "react";
import { RouterType } from "../types";
import { Navigate, useLocation } from "react-router-dom";

type PropsType = {
  route: RouterType;
};

// 路由拦截组件
const BeforeEach: React.FC<PropsType> = ({ route }) => {
  // 可以做一点其他的事情
  // 设置标题
  document.title = route.meta?.title || "后台管理系统";
  // 白名单
  const whiteList = ["/signin"];
  // token
  const token = localStorage.getItem("token");
  // 访问路径
  const { pathname } = useLocation();

  if (whiteList.includes(pathname)) {
    // 访问的是 白名单
    if (token) {
      return <Navigate to="/"></Navigate>;
    } else {
      return route.element as JSX.Element;
    }
    return route.element as JSX.Element;
  } else {
    // 访问的是 非白名单
    if (token) {
      // 验证token
      return route.element as JSX.Element;
    } else {
      return <Navigate to="/signin"></Navigate>;
    }
  }
};

export default BeforeEach;
