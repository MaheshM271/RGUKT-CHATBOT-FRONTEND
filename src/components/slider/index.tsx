import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout } from 'antd';
import { AuthorizedRoutes, Path } from 'components/routes';
import { Logo } from 'components/common/logo';
import { Label } from 'ui-library/typography';
import { useNavigate } from 'react-router-dom';
import { LayoutContainer, MenuContainer } from './styles';
import { Flex } from 'ui-library/flex';
import { faBowlFood, faDashboard, faDumbbell, faInbox, faKeyboard, faPeopleGroup, faPersonRunning, faTable } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#143d59',
  scrollbarWidth: 'none',
  width: '240px'
};

// const menuData = [
//   {
//     key: '1',
//     label: 'Dashboard',
//     icon: 'sidebar-dashboard',
//     path: Path.HOME,
//     fIcon: faDashboard
//   },
//   {
//     key: '2',
//     label: 'Clients',
//     icon: 'sidebar-client',
//     path: Path.CLIENTS,
//     fIcon: faPeopleGroup,
//   },
//   {
//     key: '3',
//     label: 'Exercises',
//     icon: 'sidebar-workout',
//     path: Path.EXERCISES,
//     fIcon: faDumbbell,
//   },
//   {
//     key: '4',
//     label: 'Workouts',
//     icon: 'sidebar-workout',
//     path: Path.WORKOUTS,
//     fIcon: faPersonRunning,
//   },
//   {
//     key: '5',
//     label: 'Programs',
//     icon: 'sidebar-workout',
//     path: Path.PROGRAMS,
//     fIcon: faTable,
//   },
//   {
//     key: '6',
//     label: 'Diet plan',
//     icon: 'sidebar-diet',
//     path: Path.DIET_PLAN,
//     fIcon: faBowlFood,
//   },
//   {
//     key: '7',
//     label: 'Habits',
//     icon: 'sidebar-habits',
//     path: Path.HABITS,
//     fIcon: faLightbulb,

//   },
//   {
//     key: '8',
//     label: 'Forms',
//     icon: 'sidebar-forms',
//     path: Path.FORMS,
//     fIcon: faKeyboard
//   },
//   {
//     key: '9',
//     label: 'Inbox',
//     icon: 'sidebar-inbox',
//     path: Path.INBOX,
//     fIcon: faInbox,
//   },
// ];


export const Slider = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('2');

  const renderLayout = () => {
    return <AuthorizedRoutes />;
  };

  const navigate = useNavigate();

  // const items: MenuItem[] = menuData.map(({ key, label, fIcon }) =>
  //   getItem(
  //     <Label color="#ffffff" fontWeight={selectedKey === key ? 600 : 400}>{label}</Label>,
  //     key,
  //     <Flex centered style={{ width: '24px', height: '24px' }}>
  //       <FontAwesomeIcon color={selectedKey === key ? "#F3B419" : '#ffffff'} icon={fIcon} fontSize={18} />
  //     </Flex>
  //   )
  // );

  // const handleMenuClick = (e: { key: string }) => {
  //   setSelectedKey(e.key);
  //   const selectedItem = menuData.find(item => item.key === e.key);
  //   if (selectedItem && selectedItem.path) {
  //     navigate(selectedItem.path);
  //   }
  // }

  return (
    <Layout>
      <LayoutContainer collapsed={collapsed}>
        <Content>
          {renderLayout()}
        </Content>
      </LayoutContainer>
    </Layout>
  );
};


