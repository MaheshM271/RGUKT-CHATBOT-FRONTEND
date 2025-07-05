import styled from 'styled-components';
import { Input as AntInput } from 'antd';


const { TextArea } = AntInput;


export interface AntProps {
    width?: string;
    marginLeft?: string;
}

export const Input = styled(AntInput)<AntProps>`
    ${({ width }) => width ? `width: ${width};` : ''};
    ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ''};
`;

export interface TextAreaProps {
    width?: string;
}

export const Text = styled(TextArea) <TextAreaProps>`
    ${({ width }) => width ? `width: ${width};` : ''};
`
