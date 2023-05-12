import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { constRoutes, asyncRoutes } from "./routes";
import LoadingProgress from "../components/loadingProgress";
import MainLayout from "../components/mainLayout";
import BeforeEach from "./beforeEach";
import { useAppSelector } from "../store/hooks";
import { RouterType } from "../types";
// 路由级组件
const Router: React.FC = () => {
  const permission_list = useAppSelector((state) => state.user.permission_list);

  const flatRoutes = (routes: RouterType[]): RouterType[] => {
    return routes.reduce((p, n) => {
      return n.children ? p.concat(flatRoutes(n.children)) : p.concat(n);
    }, [] as RouterType[]);
  };

  // 动态路由 根据用户权限
  const routes = useMemo(() => {
    const routes = flatRoutes(asyncRoutes);

    return routes.filter((v) => {
      if (!v.meta?.permission) return true;
      return permission_list.includes(v.meta?.permission);
    });
    
  }, [permission_list]);

  return (
    <BrowserRouter>
      {/* 一次只渲染一个匹配的路由 */}
      <Suspense fallback={<LoadingProgress></LoadingProgress>}>
        <Routes>
          {/* 动态路由渲染 */}
          {routes.map((v, i) => {
            return (
              <Route
                path={v.path}
                element={<BeforeEach route={v}></BeforeEach>}
                key={i}
              ></Route>
            );
          })}
          {/* 静态路由渲染 */}
          {constRoutes.map((v, i) => {
            return (
              <Route
                path={v.path}
                element={<BeforeEach route={v}></BeforeEach>}
                key={i}
              ></Route>
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
