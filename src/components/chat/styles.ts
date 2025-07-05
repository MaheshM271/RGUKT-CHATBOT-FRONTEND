import styled from "styled-components";
import { Flex } from 'ui-library/flex';
import { Button } from 'ui-library/button';
import { H3, XtraSmallText } from 'ui-library/typography';
import { Select } from 'antd';

export const ScrollbarHide = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

export const ChatContainer = styled(Flex)`
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  position: relative;
`;

export const ChatSidebar = styled(Flex)<{ collapsed: boolean }>`
  width: ${props => props.collapsed ? '60px' : '260px'};
  background-color: ${props => props.theme.sidebar};
  padding: 16px;
  height: 100%;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1000;

  @media (max-width: 680px) {
    position: fixed;
    left: 0;
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ChatMain = styled(Flex)`
  flex: 1;
  flex-direction: column;
  height: 100%;
  transition: margin-left 0.3s ease;
  position: relative;
  overflow-x: hidden;
  z-index: 1;

  @media (max-width: 680px) {
    margin-left: 30px;
    width: 100%;
  }
`;

export const ChatMessages = styled(Flex)`
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px 24px 100px 24px;
  gap: 24px;
  height: calc(100vh - 80px);
  width: 82%;
  margin: auto;
  ${ScrollbarHide}
  scroll-behavior: smooth;

  &::before {
    content: '';
    padding-top: 20px;
  }

  &::after {
    content: '';
    padding-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px 16px 90px 16px;
    gap: 16px;
  }

  @media (max-width: 680px) {
    width: 90%;
  }
`;

export const MessageContainer = styled(Flex)<{ isUser: boolean }>`
  background-color: ${props => props.isUser ? props.theme.messageUser : props.theme.messageAI};
  padding: 16px;
  border-radius: 12px;
  width: 80%;
  max-width: 800px;
  margin: ${props => props.isUser ? '0 0 0 auto' : '0 auto 0 0'};
  gap: 12px;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    width: 85%;
    padding: 12px;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;


export const MessageIcon = styled(Flex)<{ isUser: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.isUser ? props.theme.buttonBg : props.theme.primary};
  color: ${props => props.theme.text};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MessageContent = styled(Flex)`
  flex: 1;
  flex-direction: column;
  gap: 8px;
  max-width: calc(100% - 44px);
`;

export const MarkdownContent = styled.div`
  color: ${props => props.theme.text};
  font-size: 15px;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;

  p {
    margin: 0 0 0.8em 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  code {
    background-color: ${props => props.theme.codeBackground};
    padding: 2px 4px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
  }

  pre {
    margin: 0.8em 0;
    padding: 0;
    background: none;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul, ol {
    margin: 0 0 0.8em 0;
    padding-left: 1.5em;
    &:last-child {
      margin-bottom: 0;
    }
  }

  blockquote {
    margin: 0.8em 0;
    padding-left: 1em;
    border-left: 3px solid ${props => props.theme.border};
    color: ${props => props.theme.text + 'cc'};
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    overflow-x: auto;
    display: block;
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    background: ${props => props.theme.background};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    th, td {
      padding: 12px;
      border: 1px solid ${props => props.theme.border};
      text-align: left;
    }

    th {
      background-color: ${props => props.theme.sidebar};
      font-weight: 600;
      color: ${props => props.theme.text};
    }

    td {
      color: ${props => props.theme.text};
    }

    tr:nth-child(even) {
      background-color: ${props => props.theme.messageAI};
    }

    tr:hover {
      background-color: ${props => props.theme.buttonHover};
    }
  }
`;

export const InputContainer = styled(Flex)`
  padding: 20px 24px;
  background-color: ${props => props.theme.background};
  position: fixed;
  bottom: 0;
  width: 75%;
  margin: auto;
  backdrop-filter: blur(8px);
  gap: 12px;

  @media (max-width: 768px) {
    padding: 16px;
    width: 80%;
    margin-left: 20px;
  }
`;

export const InputWrapper = styled(Flex)`
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.messageAI};
  border-radius: 24px;
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const ExpandableInput = styled.textarea`
  width: 100%;
  min-height: 24px;
  max-height: 200px;
  padding: 12px 100px 12px 16px;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 15px;
  line-height: 1.5;
  outline: none;
  ${ScrollbarHide}

  &::placeholder {
    color: ${props => props.theme.text}80;
  }

  @media (max-width: 480px) {
    padding: 10px 30px 10px 14px;
    font-size: 11px;
  }
`;

export const InputActions = styled(Flex)`
  position: absolute;
  right: 8px;
  bottom: 50%;
  transform: translateY(50%);
  gap: 4px;
  padding: 4px;
`;

export const ActionButton = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? props.theme.primary : 'transparent'};
  color: ${props => props.primary ? '#000000' : props.theme.text};
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${props => props.primary ? 1 : 0.7};

  &:hover {
    background: ${props => props.primary ? props.theme.primary : props.theme.buttonHover};
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

export const NewChatButton = styled(Button)`
  background-color: ${props => props.theme.buttonBg};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  width: 100%;
  margin-bottom: 16px;
  
  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
`;

export const ToggleButton = styled(Button)`
  position: absolute;
  right: -15px;
  top: 20px;
  background-color: ${props => props.theme.toggleBg};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  
  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
`;

export const ThemeToggleButton = styled(Button)`
  position: absolute;
  right: -15px;
  top: 70px;
  background-color: ${props => props.theme.toggleBg};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  
  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
`;

export const CompanyLogo = styled(Flex)<{ collapsed: boolean }>`
  margin-bottom: 24px;
  align-items: center;
  gap: 12px;
  width: 100%;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};
`;

export const CompanyName = styled(H3)<{ collapsed: boolean }>`
  color: ${props => props.theme.text};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${props => props.collapsed ? 'none' : 'block'};
`;

export const UserProfile = styled(Flex)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background-color: ${props => props.theme.sidebar};
  border-top: 1px solid ${props => props.theme.border};
  align-items: center;
  gap: 12px;
`;

export const UserName = styled(XtraSmallText)`
  color: ${props => props.theme.text};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ConversationItem = styled(Flex)`
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
  // margin-bottom: 8px;
  
  &:hover {
    background-color: ${props => props.theme.buttonHover};
  }
`;

export const StyledXtraSmallText = styled(XtraSmallText)<{ opacity?: number }>`
  opacity: ${props => props.opacity || 1};
  color: ${props => props.theme.text};
  text-align: center;
  max-width: 600px;
  margin-top: -25px;
  margin-bottom: 32px;
  opacity: 0.7;
  line-height: 1.6;
`;

export const ConversationsList = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  ${ScrollbarHide}
`;

export const WelcomeContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  ${ScrollbarHide}
`;

export const SearchBox = styled(Flex)`
  width: 85%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const WelcomeContent = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 24px;
`;

export const WelcomeTitle = styled(H3)`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 32px;
  color: ${props => props.theme.text};
  text-align: center;
`;

export const CodeBlock = styled.pre`
  background-color: ${props => props.theme.codeBackground};
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.4;
  margin: 8px 0;
  ${ScrollbarHide}
`;

export const InlineCode = styled.code`
  background-color: ${props => props.theme.codeBackground};
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
`;

export const InlineEditInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  font-size: inherit;
  padding: 2px 0;
  width: 100%;
  outline: none;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.primary};
  }
`;



export const ConversationText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 20px; 
  line-height: 1.5;
  max-width: 100%;
`;



export const ConversationInner = styled(Flex)`
  width: 100%;
  position: relative;
`;

export const IconContainer = styled(Flex)`
  padding-left: 10px;
  margin-left: 10px;
`

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  margin: 8px 0;
  background: ${props => props.theme.background};
  border-radius: 8px;
  width: fit-content;
`;

export const SpinnerDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${props => props.theme.text};
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%, 80%, 100% { 
      transform: scale(0);
    } 
    40% { 
      transform: scale(1.0);
    }
  }
`;

export const TypingMessage = styled.div`
  color: ${props => props.theme.text};
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  opacity: 0.8;
`;

export const ModelSelector = styled(Select)`
  min-width: 110px;
  margin-right: 12px;
  
  .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
    border-radius: 12px !important;
    color: ${props => props.theme.text} !important;
    height: 40px !important;
    padding: 4px 12px !important;
    box-shadow: none !important;
    font-size: 15px;
    display: flex;
    align-items: center !important;

    .ant-select-selection-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 20px !important;
      line-height: 32px;
      color: ${props => props.theme.text};
    }
  }

  &.ant-select-focused {
    .ant-select-selector {
      box-shadow: none !important;
    }
  }

  .ant-select-arrow {
    color: ${props => props.theme.text};
    top: 50%;
    right: 11px;
    margin-top: -1px;
    pointer-events: none;
  }

  .ant-select-dropdown {
    background-color: ${props => props.theme.messageAI} !important;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .ant-select-item {
      color: ${props => props.theme.text};
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
      
      &:hover {
        background-color: ${props => props.theme.buttonHover};
      }
      
      &.ant-select-item-option-selected {
        background-color: ${props => props.theme.primary};
        color: #000;
        font-weight: 500;
      }
    }
  }
`;


