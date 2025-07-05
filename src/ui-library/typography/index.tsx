import styled from "styled-components";
import theme from "assets/css/theme";
import { Button, Form, Input, Checkbox, Card } from 'antd';
interface Props {
  color?: string;
  fontWeight?: 400 | 500 | 600;
  fontSize?: string;
  paddingRight?: string;
  center?: boolean;
  marginTop?: string;
}

const colorStyle = ({ color }: { color?: string }) => `
color: ${color || theme.primary};
`;

const fontWeightStyle = ({ fontWeight }: { fontWeight?: 400 | 500 | 600 }) => `
font-weight: ${fontWeight || 500};
`;

export const Title1 = styled.h1<Props>`
  font-size: 40px;
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
  font-weight: 500;
`;

export const Title4 = styled.h1<Props>`
  font-size: 30px;
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
  font-weight: 500;
`;
export const Title5 = styled.h1<Props>`
  font-size: 24px;
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
  font-weight: 500;
`;

export const H1 = styled.h1<Props>`
  font-size: ${({ fontSize }) => fontSize || '20px'};
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
  ${({ center }) => center ? `text-align: center;` : ''};
`;

export const H2 = styled.h2<Props>`
  font-size: 18px !important;
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
`;

export const H3 = styled.h3<Props>`
  font-size: 18px;
  margin-block-start: 0;
  margin-block-end: 0;
  ${colorStyle};
  ${fontWeightStyle};
  ${({ center }) => center ? `text-align: center;` : ''};
`;

export const Label = styled.span<Props>`
  display: inline-block;
  font-size: 16px;
  ${colorStyle};
  ${fontWeightStyle};
  ${({ paddingRight }) => paddingRight ? `padding-right: ${paddingRight};` : ''};
  ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ''};

`;

export const Subtext = styled.div<{
  error?: boolean;
  secondary?: boolean;
  color?: string;
  fontWeight?: 400 | 500 | 600;
}>`
  font-size: 0.875rem;
  line-height: 1.375rem;
  ${colorStyle};
  ${fontWeightStyle};
`;

export const XtraSmallText = styled.div<{
  error?: boolean;
  secondary?: boolean;
  color?: string;
  fontWeight?: 400 | 500 | 600;
  fontSize?: string;
  marginLeft?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || '12px'};
  line-height: 1rem;
  ${colorStyle};
  ${fontWeightStyle};
  ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ''};

`;

const linkStyle = `
  font-weight: normal;
  color: ${theme.colorLink};
  cursor: pointer;
  &:hover, :active, :focus {
    color: ${theme.colorLink};
    text-decoration: underline;
  }
`;

export const Link1 = styled.a`
  ${linkStyle}
  font-size: ${theme.fontSize}px;
  line-height: 1.375rem;
`;

export const Link2 = styled.a`
  ${linkStyle}
  font-size: ${theme.fontSizeSM}px;
  line-height: 1.125rem;
`;

export const PageContainerStyle = styled.div`
  background-color: white;
  padding: 2% 15%;
`;

export const FormItemStyle = styled(Form.Item)`
  margin-bottom: 16px;
`;

export const InputStyle = styled(Input)`
  border-radius: 8px;
`;

export const CheckboxGroupStyle = styled(Checkbox.Group)`
  display: flex;
  justify-content: space-between;
`;

export const CardStyle = styled(Card)`
  margin-bottom: 24px;
`;

export const ButtonStyle = styled(Button)`
  float: right;
  width: 100px;
`;

export const TagContainerStyle = styled.div`
  margin-bottom: 16px;
`;

export const ListItemMetaLinkStyle = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const SaveButtonStyle = styled(Button)`
  text-align: right;
`;
export const LabelStyle = styled.span`
  display: inline-block;
  font-size: 15px;
`;

export const SubmitButton = styled.button`
  background-color: #143D59;
  border-color: #143D59;
  color: white;
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

export const FormItem = styled.div`
  text-align: right;
  padding-top: 38%;
`;

export const FormLabel = styled.label`
  font-weight: 400;
  font-size: 15px;
`;

