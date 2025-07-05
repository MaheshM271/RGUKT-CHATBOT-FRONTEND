import { Heading, LogoContianer, SidebarHeading, SidebarLogoContianer } from './style';
import Img from 'assets/images';
import { Flex } from 'ui-library/flex';

interface LogoProps {
  isSignup?: boolean;
  collapsed?: boolean;
  logoName?: string;
  size?: number;
  isDarkMode?: boolean;
}

export const Logo = ({isSignup, collapsed, logoName, size, isDarkMode}: LogoProps) => {

  if (isSignup) {
    return (
      <LogoContianer justifyContentCenter isSignup alignItemsCenter>
        <Flex flexGrow centered>
          <Img name="login-logo" size={80} />
          <Heading color='#143D59'>
            RGUKT InfoGuru
          </Heading>
        </Flex>
      </LogoContianer>
    )
  }
  return (
    <SidebarLogoContianer centered gap='0.25rem' marginBottom='15px'>
      <Img name={logoName || "sidebar-logo"}  size={size}/>

      {collapsed && (
        <SidebarHeading color='#F4B41A'>
          RGUKT InfoGuru
        </SidebarHeading>
      )}
      
    </SidebarLogoContianer>
  )
}