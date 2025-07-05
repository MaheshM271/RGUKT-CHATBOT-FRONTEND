import styled from 'styled-components';

export interface FlexProps {
  wrap?: boolean;
  spaceBetween?: boolean;
  justifyContentCenter?: boolean;
  alignItemsCenter?: boolean;
  alignSelfCenter?: boolean;
  justifyContent?: string;
  flexDirection?: string;
  alignItems?: string;
  alignSelf?: string;
  margin?: string;
  noShrink?: boolean;
  borderRadius?: string;
  centered?: boolean;
  inline?: boolean;
  textAlignStart?: boolean;
  flexGrow?: boolean;
  flexWrap?: boolean;
  hiddenOverflow?: boolean;
  gap?: string;
  width?: string;
  height?: string;
  maxHeight?: string;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
  marginBottom?: string;
  cursor?: string;
  overflowX?: string;
  position?: string;
  overflowY?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ gap }) => gap ? `gap: ${gap};` : ''};
  ${({ inline }) => inline ? `display: inline-flex;` : ''};
  ${({ wrap }) => wrap ? `flex-wrap: wrap;` : ''};
  ${({ spaceBetween }) => spaceBetween ? `justify-content: space-between;` : ''};
  ${({ justifyContentCenter }) => justifyContentCenter ? `justify-content: center;` : ''};
  ${({ alignItemsCenter }) => alignItemsCenter ? ` align-items: center;` : ''};
  ${({ margin }) => margin ? `margin: ${margin}` : ''};
  ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection}` : ''};
  ${({ alignItems }) => alignItems ? `align-items: ${alignItems};` : ''};
  ${({ alignSelf }) => alignSelf ? alignSelf : ''};
  ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''};
  ${({ noShrink }) => noShrink ? `flex-shrink: 0;` : ''};
  ${({ borderRadius }) => borderRadius ? `border-radius: ${borderRadius};` : ''};
  ${({ textAlignStart }) => textAlignStart ? `text-align: start;` : ''};
  ${({ flexGrow }) => flexGrow ? `flex-grow: 1;` : ''};
  ${({ flexWrap }) => flexWrap ? `flex-wrap: wrap;` : ''};
  ${({ hiddenOverflow }) => hiddenOverflow ? `overflow: hidden;` : ''};
  ${({ alignSelfCenter }) => alignSelfCenter ? `align-self: center;` : ''};
  ${({ marginTop }) => marginTop ? `margin-top: ${marginTop};` : ''};
  ${({ width }) => width ? `width: ${width};` : ''};
  ${({ height }) => height ? `height: ${height};` : ''};
  ${({ maxHeight }) => maxHeight ? `max-height: ${maxHeight};` : ''};
  ${({ cursor }) => cursor ? `cursor: ${cursor};` : ''};
  ${({ overflowX }) => overflowX ? `overflow-x: ${overflowX};` : ''};
  ${({ overflowY }) => overflowY ? `overflow-x: ${overflowY};` : ''};
  ${({ marginLeft }) => marginLeft ? `margin-left: ${marginLeft};` : ''};
  ${({ marginRight }) => marginRight ? `margin-right: ${marginRight};` : ''};
  ${({ marginBottom }) => marginBottom ? `margin-bottom: ${marginBottom};` : ''};
  ${({ position }) => position ? `position: ${position};` : ''};



  ${({ centered }) => centered ? `
    justify-content: center;
    align-items: center;
  ` : ''};
`;
