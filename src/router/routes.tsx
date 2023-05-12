import React from "react";
// 引入布局组件
import MainLayout from "../components/mainLayout";
// 引入路由类型
import { RouterType } from "../types";
import {
  BarsOutlined,
  BankOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

// 引入路由级组件  并且懒加载
const Home = React.lazy(() => import("../views/home"));
const ListAdd = React.lazy(() => import("../views/listAdd"));
const ListManage = React.lazy(() => import("../views/listManage"));
const Set = React.lazy(() => import("../views/set"));
const SignIn = React.lazy(() => import("../views/signin"));
// 静态路由
export const constRoutes: RouterType[] = [
  {
    path: "/signin",
    element: <SignIn></SignIn>,
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "*",
    element: <div>404 页面未找到</div>,
    meta: {
      title: "404",
      hidden: true,
    },
  },
];

// 动态路由
export const asyncRoutes: RouterType[] = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Home></Home>
      </MainLayout>
    ),
    meta: {
      title: "首页",
      permission: 1000,
      icon: <BankOutlined />,
    },
  },
  {
    path: "/list",
    meta: {
      title: "列表操作",
      permission: 1100,
      icon: <BarsOutlined />,
    },
    children: [
      {
        path: "/list/add",
        element: (
          <MainLayout>
            <ListAdd></ListAdd>
          </MainLayout>
        ),
        meta: {
          title: "列表添加",
          permission: 1110,
          icon: <BankOutlined />,
        },
      },
      {
        path: "/list/manage",
        element: (
          <MainLayout>
            <ListManage></ListManage>
          </MainLayout>
        ),
        meta: {
          title: "列表管理",
          permission: 1121,
          icon: <BankOutlined />,
        },
      },
    ],
  },
  {
    path: "/set",
    element: (
      <MainLayout>
        <Set></Set>
      </MainLayout>
    ),
    meta: {
      title: "设置",
      permission: 1200,
      icon: <ShareAltOutlined />,
    },
  },
];
