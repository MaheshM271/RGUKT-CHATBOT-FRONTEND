import { HeaderContainer, IconContainer, Img, ProfileIcon } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { Flex } from '../flex';
import { H1, Label } from '../typography';
import { Svg } from 'assets/icons/svg';
import theme from 'assets/css/theme';
import useStores from "../../stores/useStores";
import { observer } from 'mobx-react';


interface Props {
  title?: {
    label: React.ReactNode | string;
    value: string;
  };
  subTitle?: any;
  children?: React.ReactNode;
}

export const Header = observer(({ title, subTitle, children }: Props) => {
  const navigate = useNavigate();
  const { userStore } = useStores();
  const { messagesStore: { showInfoMessage, showErrorMessage } } = useStores();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'account') {
      navigate('/profile');
    }
    else if (key === 'team') {
      navigate('/teams');
    }
    else if (key === 'logout') {
      userStore.logout().then(async () => {
        navigate('/login');
      }).then((r) => {
        showInfoMessage('Logged out successfully!');
      }).catch((e) => {
        showErrorMessage('Failed to logout, Please try again!')
      })
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="account">
        <Flex alignItemsCenter gap="8px">
          <FontAwesomeIcon icon={faUser} style={{ color: '#F4B41A' }} />
          <span style={{ fontWeight: 500 }}> My Account</span>
        </Flex>
      </Menu.Item>
      <Menu.Item key="team">
        <Flex alignItemsCenter gap="8px">
          <FontAwesomeIcon icon={faUsers} style={{ color: '#F4B41A', width: '15px' }} />
          <span style={{ fontWeight: 500 }}>Team</span>
        </Flex>
      </Menu.Item>
      <Menu.Item key="logout">
        <Flex alignItemsCenter gap="8px">
          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: '#F4B41A' }} />
          <span style={{ fontWeight: 500 }}>Logout</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer alignItemsCenter justifyContent='space-between'>
      <Flex alignItemsCenter gap='0.5rem'>
        {title && (
          <H1
            className='cursor'
            onClick={() => navigate(title.value)}
            color={subTitle ? theme.secondary : theme.primary}
            fontWeight={subTitle ? 400 : 500}
          >
            {title.label}
          </H1>
        )}
        {children && <><H1 fontWeight={400}>{'>'}</H1> {children}</>}
        {subTitle && <><H1 fontWeight={400}>{'>'}</H1> {subTitle}</>}
      </Flex>

      <Flex alignItemsCenter gap='2rem'>
        <IconContainer centered>
          <Svg name="video" />
        </IconContainer>
        <IconContainer centered>
          <Svg name="comments" />
        </IconContainer>
        <IconContainer centered>
          <Svg name="bell" />
        </IconContainer>
        <Flex className='cursor' gap='0.5rem' alignItemsCenter>
          <Label fontWeight={500}>{userStore?.fullName}</Label>
          <Dropdown overlay={menu} trigger={['click']}>
            <ProfileIcon centered>
              {userStore.avatarURL ? (
                <Img alt='' src={userStore.avatarURL} />
              ) : (
                <FontAwesomeIcon fontSize={20} icon={faUser} />
              )}
            </ProfileIcon>
          </Dropdown>
        </Flex>
      </Flex>
    </HeaderContainer>
  );
});
