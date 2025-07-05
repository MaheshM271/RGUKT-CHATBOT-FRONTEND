import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

export const SiderContainer = styled(Sider)`
  height: 100vh;
  overflow: auto;
  position: fixed;
  inset-inline-start: 0;
  top: 0;
  bottom: 0;
  background-color: #143d59;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LayoutContainer = styled(Layout)<{ collapsed? : boolean}>`
  transition: margin-inline-start 0.3s ease;
`;

export const MenuContainer = styled(Menu)`
  background-color: #143d59;
  color: #ffffff;

  .ant-menu-item,
  .ant-menu-submenu-title {
    margin-bottom: 1.2rem;
    background-color: transparent !important; 
  }

  .ant-menu-item-selected,
  .ant-menu-item:active,
  .ant-menu-item:hover {
    background-color: transparent !important;
    color: #ffffff;
  }

  .ant-menu-item:last-child,
  .ant-menu-submenu-title:last-child {
    margin-bottom: 0;
  }
`;
