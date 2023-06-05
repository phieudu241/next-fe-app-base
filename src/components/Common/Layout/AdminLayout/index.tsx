import React from "react";
import { Layout, Menu, MenuProps } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

import LogoIcon from "statics/images/logo.svg";
import { ROUTE } from "constants/route";
import Header from "components/Common/Layout/AdminLayout/Header";

const { Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menuItems: MenuProps["items"] = [
  getItem("Navigation One", "sub1", <MailOutlined rev={undefined}/>, [
    getItem("Item 1", "g1", null, [getItem("Option 1", "1"), getItem("Option 2", "2")], "group"),
    getItem("Item 2", "g2", null, [getItem("Option 3", "3"), getItem("Option 4", "4")], "group"),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined rev={undefined}/>, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")]),
  ]),

  { type: "divider" },

  getItem("Navigation Three", "sub4", <SettingOutlined rev={undefined}/>, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),

  getItem("Group", "grp", null, [getItem("Option 13", "13"), getItem("Option 14", "14")], "group"),
];

const AdminLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Layout className="main-layout min-h-[100vh]">
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      theme="light"
    >
      {/*Logo*/}
      <div className="bg-white px-4">
        <Link passHref href={ROUTE.ADMIN_INDEX}>
          <Image src={LogoIcon} alt="Logo" width={40}/>
        </Link>
      </div>
      <Menu
        className="menu"
        defaultSelectedKeys={["item1"]}
        defaultOpenKeys={["item1", "item2", "item3"]}
        mode="inline"
        items={menuItems}
      >
      </Menu>
    </Sider>
    <Layout>
      <Header/>
      <Content>
        {children}
      </Content>
      <Footer></Footer>
    </Layout>
  </Layout>
);

export default AdminLayout;
