import PhoneInput from 'react-phone-number-input/input';
import styled from 'styled-components';

export const PhoneNumber = styled(PhoneInput).attrs(({ className, size = 'large' }) => ({
  className: `ant-input ${className}`,
  size,
}))`
  width: 100%;
  height: 40px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 8.5px 11px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Courier New' monospace;
  &::placeholder {
    color: #d9d9d9;
    opacity: 1; /* Firefox */
  }
  &:focus {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
    background-color: #ffffff;
  }
  `;

