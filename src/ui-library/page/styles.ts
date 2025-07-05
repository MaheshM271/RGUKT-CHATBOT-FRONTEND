import { Tabs } from "antd";
import { styled } from "styled-components";


export const TabsHeader = styled(Tabs)`
  width: 100vw;
  .ant-tabs-nav {
    //border: 1px solid #C8D0D6;
    padding-right: 8px;
    padding-left: 8px;
    //margin-top: 16px;
    //border-radius: 8px;
    //margin-bottom: 2.5rem;
  }

  .ant-tabs .ant-tabs-tab+.ant-tabs-tab {
    margin-left: 0;
  }
`