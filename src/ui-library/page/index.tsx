import { styled } from "styled-components";
import { Flex } from "../flex";

export const PageContent = styled(Flex)`
  flex-grow: 1;
  padding: 16px 15px 16px 15px;
  height: 100%;
  //max-height: calc(100vh - 88px);
  //height: calc(100vh - 88px);
  //background: #FFFFFF;
  overflow: auto;
`;

export const PageContainer = styled(Flex).attrs({
  flexDirection: 'column',
})`
  max-height: 100vh;
  flex: 1;
  flex-flow: column nowrap;
  background: #FFFFFF;
  position: relative;
`;