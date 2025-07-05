import styled from "styled-components";
import { Flex } from "ui-library/flex";


export const ModalContainer = styled(Flex) <{clientView?: boolean}>`
    padding: 30px;
    height: ${(Props) => Props.clientView ? "50vh": "70vh"};
`;
