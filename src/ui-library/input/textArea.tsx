import { TextAreaProps } from "antd/lib/input";
import { ReactNode } from "react";
import { Flex } from "ui-library/flex";
import { Subtext, XtraSmallText } from "ui-library/typography";
import { Text } from "./style";

type Common = {
  isError?: boolean;
  errorMessage?: string;
  errorMessageClass?: string;
  customClass?: string;
  label?: string | ReactNode;
  hideIcon?: boolean;
  width?: string;
};

export type TextAreaComponentProps = TextAreaProps & Common;

export const TextAreaField = ({
  label,
  isError,
  errorMessageClass,
  customClass,
  hideIcon,
  errorMessage,
  required,
  width,
  autoSize = { minRows: 2, maxRows: 5 },
  ...rest
}: TextAreaComponentProps) => {

  return (
    <Flex className={customClass} gap="0.25rem" flexDirection="column">
      {label && (
        <Flex>
          <Subtext>
            {label}
          </Subtext>
          {
            required && <Subtext color='#CE5B52'>*</Subtext>
          }
        </Flex>
      )}
      <Text style={{ maxHeight: '200px' }} {...rest} width={width} autoSize={autoSize} status={isError ? 'error' : undefined} />
      <Flex alignItemsCenter className={errorMessageClass}>
        {isError && (
          <XtraSmallText color='#CE5B52' error={isError}>{errorMessage}</XtraSmallText>
        )}
      </Flex>
    </Flex>
  );

}
