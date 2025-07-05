import { styled } from "styled-components";
import { Flex } from "../flex";


export const HeaderContainer = styled(Flex)`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 24px 12px;
  width: 100%;
  box-shadow: 0px 0px 10px 0px #0000001A;
  margin-bottom: 8px;
`
export const IconContainer = styled(Flex)`
  width: 18px;
  height: 12px;
`
export const ProfileIcon = styled(Flex)`
  background: #B3B3B3;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

export const Img = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  object-fit: cover;
`
