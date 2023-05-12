import { Breadcrumb, Layout, Dropdown, Button } from "antd";
import React, { useMemo, useState } from "react";
import { asyncRoutes } from "../../router/routes";
import { useAppSelector } from "../../store/hooks";
import NavMenu from "../navMenu";
import logo from "../../logo.svg";
import { useDispatch } from "react-redux";
import { loginFailActionCreator } from "../../store/user/reducer";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

type PropsType = {
  children: JSX.Element;
};

const App: React.FC<PropsType> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const permission_list = useAppSelector((state) => state.user.permission_list);
  const avator = useAppSelector((state) => state.user.avator);
  const nickname = useAppSelector((state) => state.user.nickname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 下拉菜单
  const items = [
    {
      key: "1",
      label: "用户信息",
    },
    {
      key: "2",
      label: "用户记录",
    },
    {
      key: "3",
      label: "用户设置",
    },
    {
      key: "4",
      label: (
        // 退出登录
        <span
          onClick={() => {
            dispatch(loginFailActionCreator());
            navigate("/signin");
          }}
        >
          退出登录
        </span>
      ),
    },
  ];

  // 导航路由信息
  const routes = useMemo(() => {
    // 根据登录的用户权限 做一个筛选
    return asyncRoutes.filter((v) => {
      if (!v.meta?.permission) return true;
      return permission_list.includes(v.meta?.permission);
    });
  }, [permission_list]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="site-layout-background"
        style={{
          padding: "0 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="left" style={{ color: "#fff" }}>
          <img src={logo} alt="" style={{ height: 40 }} />
          <span>后端管理系统</span>
        </div>
        <div className="right" style={{ color: "#fff" }}>
          <img
            src={avator}
            alt=""
            style={{ borderRadius: "50%", marginRight: 10 }}
          />
          {/* 下拉菜单  注意版本 */}
          <Dropdown menu={{ items }} placement="topRight" arrow>
            <Button type="primary">{nickname}</Button>
          </Dropdown>
        </div>
      </Header>
      <Layout className="site-layout">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <NavMenu routes={routes}></NavMenu>
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
