import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Button } from "ui-library/button";
import { Label } from "ui-library/typography";

export const ButtonContainer = styled(Button)`
    border: none;
    background: transparent;
`

export const LabelDesign = styled(Label)`
    text-align: center;
    color: black; 
    fontWeight: 600;
    cursor: pointer;
    padding: 4px 0px;
    width: 900px;
    border: 1px solid black;
    background-color: white;
    border-radius: 8px;
    opacity: 0.8;

    @media (max-width: 1060px) {
        width: 650px
    } 
`
export const Icon = styled(FontAwesomeIcon) <{ disable?: boolean }>`
    cursor: ${({ disable }) => disable ? 'cursor: not-allowed;' : ''}
  }
`