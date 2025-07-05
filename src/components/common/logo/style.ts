import { styled } from "styled-components";
import { Flex } from "ui-library/flex";
import { Title4, Title5 } from "ui-library/typography";

export const LogoContianer = styled(Flex) <{ isSignup?: boolean }>`
  padding: 16px;
  height: 40px;
  width: ${({ isSignup }) => isSignup ? 'calc(100vw - 32px)' : '216px'};
  position: sticky;
  top: 0;
  ${({ isSignup }) => isSignup ? 'background: white;' : ''};
  z-index: 100;
`
export const SidebarLogoContianer = styled(Flex) <{ isSignup?: boolean }>`
  height: 40px;
  margin-top: 16px;
`

export const Heading = styled(Title4)`
  margin-top: -12px;
`
export const SidebarHeading = styled(Title5)`
  margin-top: -6px;
  font-size: 22px;
`