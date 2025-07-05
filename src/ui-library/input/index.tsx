import { ReactNode } from 'react';
import { InputProps } from 'antd/lib/input/Input';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd';
import { Flex } from '../flex';
import { Subtext, XtraSmallText } from '../typography';
import { Input } from './style';
import PhoneInput from 'antd-phone-input';
import styled from 'styled-components';


type Common = {
  isError?: boolean;
  errorMessage?: string;
  errorMessageClass?: string;
  customClass?: string;
  label?: string | ReactNode;
  hideIcon?: boolean;
  width?: string;
  labelClassName?: string;
  marginLeft?: string;
};

export type InputComponentProps = InputProps & Common;
export type InputNumberComponentProps = InputNumberProps & Common;

export const InputField = ({
  label,
  isError,
  errorMessageClass,
  customClass,
  hideIcon,
  errorMessage,
  required,
  size = 'large',
  width,
  labelClassName,
  marginLeft,
  ...rest
}: InputComponentProps) => (
  <Flex className={customClass} gap="0.25rem" flexDirection="column">
    {label && (
      <Flex>
        <Subtext className={labelClassName}>
          {label}
        </Subtext>
        {
          required &&
          <Subtext color='#CE5B52'>*</Subtext>
        }
      </Flex>
    )}
    <Input {...rest} marginLeft={marginLeft} width={width} size={size} status={isError ? 'error' : undefined} />
    <Flex alignItemsCenter className={errorMessageClass}>
      {isError && (
        <XtraSmallText color='#CE5B52' error={isError}>{errorMessage}</XtraSmallText>
      )}
    </Flex>
  </Flex>
);


export const InputNumberField = ({
  label,
  isError,
  errorMessageClass,
  customClass,
  hideIcon,
  errorMessage,
  required,
  size = 'large',
  ...rest
}: InputNumberComponentProps) => (
  <Flex className={customClass} gap="0.25rem" flexDirection="column">
    {label && (
      <Flex>
        <Subtext>
          {label}
        </Subtext>
        {required && <Subtext color='#CE5B52'>*</Subtext>}
      </Flex>
    )}
    <InputNumber
      {...rest}
      type='number'
      size={size}
      status={isError ? 'error' : undefined}
      min={0}
      max={5000}
    />
    <Flex alignItemsCenter className={errorMessageClass}>
      {isError && (
        <XtraSmallText color='#CE5B52' error={isError}>{errorMessage}</XtraSmallText>
      )}
    </Flex>
  </Flex>
);

export const StyledPhoneInput = styled(PhoneInput) <{ isError: boolean }>`
  .ant-input {
    height: 40px !important;
    width: 168px;
    border-color: ${({ isError }) => (isError ? "#CE5B52" : "")};
  }
`;