import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Flex } from 'ui-library/flex';
import { Button } from 'ui-library/button';
import { InputField } from 'ui-library/input';
import { H3, Label, XtraSmallText } from 'ui-library/typography';
import { 
  faChevronLeft, 
  faChevronRight, 
  faUser, 
  faSignOutAlt, 
  faCog, 
  faMoon, 
  faSun, 
  faSearch, 
  faLightbulb, 
  faEllipsisH,
  faRobot,
  faArrowUp,
  faPen,
  faImage,
  faTrash,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from 'components/common/logo';
import { Dropdown, Modal, Select } from 'antd';
import type { MenuProps, SelectProps } from 'antd';
import { lightTheme, darkTheme } from './theme';
import ReactMarkdown from 'react-markdown';
import {
  ChatContainer,
  ChatSidebar,
  ChatMain,
  ChatMessages,
  MessageContainer,
  MessageIcon,
  MessageContent,
  MarkdownContent,
  InputContainer,
  InputWrapper,
  ExpandableInput,
  InputActions,
  ActionButton,
  NewChatButton,
  ToggleButton,
  ThemeToggleButton,
  CompanyLogo,
  CompanyName,
  UserProfile,
  UserName,
  ConversationItem,
  StyledXtraSmallText,
  ConversationsList,
  WelcomeContainer,
  SearchBox,
  WelcomeContent,
  WelcomeTitle,
  CodeBlock,
  InlineCode,
  InlineEditInput,
  ConversationText,
  ConversationInner,
  IconContainer,
  LoadingSpinner,
  SpinnerDot,
  TypingMessage,
  ModelSelector,
} from './styles';
import useStores from 'stores/useStores';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from 'ui-library/toast';
import { observer } from 'mobx-react';
// import { Message, Chat } from 'stores/chatList/ChatStore';


interface CodeProps {
  children?: React.ReactNode;
  className?: string;
}


export interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}


const conversationMenuItems: MenuProps['items'] = [

  {
    key: 'rename',
    label: 'Rename',
    icon: <FontAwesomeIcon icon={faEdit} />,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <FontAwesomeIcon icon={faTrash} style={{ color: '#ff4d4f' }} />,
    danger: true,
  },

];


const userMenuItems: MenuProps['items'] = [
  // {
  //   key: '1',
  //   label: 'Profile',
  //   icon: <FontAwesomeIcon icon={faUser} />,
  // },
  // {
  //   key: '2',
  //   label: 'Settings',
  //   icon: <FontAwesomeIcon icon={faCog} />,
  // },
  {
    key: '3',
    label: 'Logout',
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
  },
];

const introQeustions = [
  "Academic Programs",
  "Campus Facilities",
  "Admission Process",
  "Student Life"
];



export const Chat = observer(() => {
  const [inputValue, setInputValue] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNewChat, setIsNewChat] = useState(true);
  const [inputRows, setInputRows] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { chat_id } = useParams<{ chat_id: string }>();

  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const { userStore, chatListStore, chatMessageListStore } = useStores();
  const { chatsList } = chatListStore;
  const { messages } = chatMessageListStore;

  const modelOptions = [
    { value: 'deepseek-r1-distill-llama-70b', label: 'Deepseek' },
    { value: 'llama-3.3-70b-versatile', label: 'Llama70BV' },
    { value: 'llama3-70b-8192', label: 'Llama70B' },
    { value: 'llama3-8b-8192', label: 'Llama8B' },
    { value: 'llama-3.1-8b-instant', label: 'Llama8BI' },
    { value: 'gemma2-9b-it', label: 'Gemma2' },
    { value: 'mistral-saba-24b', label: 'Mistral' },
    { value: 'allam-2-7b', label: 'Allam' },
    { value: 'qwen-qwq-32b', label: 'Qwen' },
  ];
  

  const [selectedModel, setSelectedModel] = useState<string>(modelOptions[0].value);

  const handleModelChange: SelectProps['onChange'] = (value) => {
    setSelectedModel(value as string);
  };

  useEffect(() => {
    if (userStore.userId && chatsList.length === 0) {
      try {
        chatListStore.getChatsList(userStore.userId);
      }
      catch (error) {
        console.log(error);
      }
    }

    
  }, []);

  useEffect(() => {
    if (chat_id !== undefined && userStore.userId) {
      try {
        chatMessageListStore.getChatMessages(userStore.userId, chat_id);
      }
      catch (error) {
        console.log(error);
      }
    }
  }, [chat_id])



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerateMessage = async () => {
    if (inputValue.trim() && userStore.userId && !isGenerating) {
      setIsGenerating(true);
      setInputValue('');
      setInputRows(1);
      
      try {
        const chatId = await chatMessageListStore.generateMessage(userStore.userId, chat_id ?? null, inputValue, selectedModel);
        
        if (chat_id === undefined) {
          navigate(`/chat/${chatId}`);
          setInputValue('');
          setIsNewChat(false);
        }

        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating message:', error);
        setIsGenerating(false);
      }
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateMessage();
    }
  };

  const handleNewChat = () => {
    setInputValue('');
    setIsNewChat(true);
    navigate('/chat');
    chatMessageListStore.updateChatMessages([]);
  };

  const handleConversationAction = async (key: string, chatId: string) => {
    if (key === 'rename') {
      const chat = chatsList.find((c: any) => c.chat_id === chatId);
      setEditValue(chat?.chat_name || '');
      setEditingChatId(chatId);
      setTimeout(() => {
        editInputRef.current?.focus();
      }, 0);
    } else if (key === 'delete') {
      Modal.confirm({
        title: 'Delete Conversation',
        content: 'Are you sure you want to delete this conversation?',
        okText: 'Delete',
        okButtonProps: { danger: true },
        onOk: async () => {
          try {
            await chatListStore.deleteChatConversation(chatId);
            setIsNewChat(true);
            navigate("/chat")
            // showToast('Conversation deleted successfully', 'success');
          } catch (error) {
            // showToast('Failed to delete conversation', 'error');
          }
        },
      });
    }
  };



  const handleRename = async (chatId: string, newName: string) => {

    if (!newName.trim()) {
      setEditingChatId(null);
      return;
    }

    try {
      await chatListStore.renameChatConversation(chatId, newName);
      setEditingChatId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, chatId: string) => {
    if (e.key === 'Enter') {
      handleRename(chatId, editValue);
    } else if (e.key === 'Escape') {
      setEditingChatId(null);
    }
  };

  const handleChatSelect = async(chatId: string) => {
    
    try {
      await chatMessageListStore.getChatMessages(userStore.userId, chatId);
      navigate(`/chat/${chatId}`);
      setInputValue('');
      setIsNewChat(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const lineHeight = 24;
    const minRows = 1;
    const maxRows = 5;
    
    const previousRows = e.target.rows;
    e.target.rows = minRows;
    
    const currentRows = Math.floor(e.target.scrollHeight / lineHeight);
    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }
    
    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }
    
    setInputRows(currentRows < maxRows ? currentRows : maxRows);
  };

  const handleMenuClick = async (key: string) => {
    if (key === '3') {
      try {
        await userStore.logout();
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ChatContainer>
        <ChatSidebar collapsed={collapsed}>
          <CompanyLogo collapsed={collapsed}>
            <Logo collapsed={!collapsed} logoName={!isDarkMode ? 'login-logo' : "login-logo1"} isDarkMode={isDarkMode}/>
          </CompanyLogo>
           
          <NewChatButton onClick={handleNewChat}>
            {!collapsed ? '+ New Chat' : '+'}
          </NewChatButton>
          
          <ConversationsList>
            {!collapsed && <Label color={isDarkMode ? '#ffffff' : '#2d2d2d'} style={{ marginBottom: '0.5rem' }}>Today</Label>}
            
            {chatsList.length === 0 && !collapsed? (
              (
              <Flex 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                style={{ 
                  padding: '20px',
                  color: isDarkMode ? '#ffffff80' : '#2d2d2d80',
                  textAlign: 'center',
                  minHeight: '100px'
                }}
              >
                <FontAwesomeIcon icon={faRobot} style={{ marginBottom: '8px', opacity: 0.5 }} />
                No previous chats
              </Flex>
            )
            ) : (
              chatsList.map((chat: any) => (
                <ConversationItem 
                  gap='0.1rem'
                  key={chat.chat_id} 
                  onClick={(e) => {
                    if (editingChatId === chat.chat_id || (e.target as HTMLElement).closest('.conversation-menu')) {
                      e.stopPropagation();
                      return;
                    }
                    handleChatSelect(chat.chat_id);
                  }}
                >
                  {!collapsed && (
                    <ConversationInner>
                      {editingChatId === chat.chat_id ? (
                        <InlineEditInput
                          ref={editInputRef}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, chat.chat_id)}
                          onBlur={() => handleRename(chat.chat_id, editValue)}
                        />
                      ) : (
                        <ConversationText>{chat.chat_name}</ConversationText>
                      )}
                      <Dropdown 
                        menu={{ 
                          items: conversationMenuItems,
                          onClick: ({ key }) => handleConversationAction(key, chat.chat_id)
                        }}
                        trigger={['click']}
                        placement="bottomRight"
                      >
                        <IconContainer centered>
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </IconContainer>
                    </Dropdown>
  
                  </ConversationInner>
                  )}
                </ConversationItem>
              ))
            )}
          </ConversationsList>

          <UserProfile>
            <FontAwesomeIcon icon={faUser} color={isDarkMode ? darkTheme.text : lightTheme.text} />
            {!collapsed && (
              <Dropdown 
                menu={{ 
                  items: userMenuItems,
                  onClick: ({ key }) => handleMenuClick(key)
                }} 
                placement="topRight"
              >
                <UserName>{userStore.fullName || 'User'}</UserName>
              </Dropdown>
            )}
          </UserProfile>

          <ToggleButton onClick={() => setCollapsed(!collapsed)}>
            <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
          </ToggleButton>

          <ThemeToggleButton onClick={() => setIsDarkMode(!isDarkMode)}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </ThemeToggleButton>
        </ChatSidebar>
        
        <ChatMain>
          {isNewChat ? (
            <WelcomeContainer>
              <WelcomeContent>
                <Flex flexDirection='column' gap='1rem'>
                  <Logo 
                    collapsed={false} 
                    logoName={!isDarkMode ? 'login-logo' : "login-logo1"} 
                    size={130}
                  />
                  <WelcomeTitle>Welcome to InfoGuru</WelcomeTitle>
                </Flex>
                
                <StyledXtraSmallText>
                  An intelligent assistant for RGUKT Basar. Ask me anything about academics, campus life, or general information.
                </StyledXtraSmallText>
                <SearchBox>
                  <InputWrapper>
                    <ModelSelector
                      value={selectedModel}
                      onChange={handleModelChange}
                      options={modelOptions}
                      dropdownMatchSelectWidth={false}
                    />
                    <ExpandableInput
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask anything about RGUKT Basar..."
                      rows={inputRows}
                    />
                    <InputActions>
                      <ActionButton 
                        primary 
                        onClick={handleGenerateMessage}
                        disabled={!inputValue.trim()}
                      >
                        <FontAwesomeIcon icon={faArrowUp} size="sm" />
                      </ActionButton>
                    </InputActions>
                  </InputWrapper>
                </SearchBox>
                <Flex flexWrap justifyContent='center' gap='1rem' marginTop='3rem'>
                  <StyledXtraSmallText style={{ opacity: 0.7 }}>
                    Try asking about:
                  </StyledXtraSmallText>
                  <Flex gap="8px" flexWrap justifyContentCenter>
                    {introQeustions.map((suggestion, index) => (
                      <ActionButton
                        key={index}
                        onClick={() => {
                          setInputValue(suggestion);
                          setInputRows(1);
                        }}
                        style={{
                          background: 'transparent',
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          height: 'auto',
                          width: 'auto'
                        }}
                      >
                        {suggestion}
                      </ActionButton>
                    ))}
                  </Flex>
                </Flex>
              </WelcomeContent>
            </WelcomeContainer>
          ) : (
            <Flex flexDirection='column' centered overflowY="hidden">
              <ChatMessages>
                {messages.map((message) => (
                  <MessageContainer key={message.message_id} isUser={message.role === 'user'}>
                    <MessageIcon isUser={message.role === 'user'}>
                      <FontAwesomeIcon 
                        icon={message.role === 'user' ? faUser : faRobot} 
                        size="sm"
                      />
                    </MessageIcon>
                    <MessageContent>
                      <MarkdownContent>
                        <ReactMarkdown
                          components={{
                            code: ({ children, className }) => {
                              const isInline = !className;
                              return isInline ? (
                                <InlineCode>{children}</InlineCode>
                              ) : (
                                <CodeBlock>{children}</CodeBlock>
                              );
                            }
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </MarkdownContent>
                    </MessageContent>
                  </MessageContainer>
                ))}
                {isGenerating && (
                  <MessageContainer isUser={false}>
                    <MessageIcon isUser={false}>
                      <FontAwesomeIcon icon={faRobot} size="sm" />
                    </MessageIcon>
                    <MessageContent>
                      <LoadingSpinner>
                        <SpinnerDot />
                        <SpinnerDot />
                        <SpinnerDot />
                      </LoadingSpinner>
                    </MessageContent>
                  </MessageContainer>
                )}
                <div ref={messagesEndRef} />
              </ChatMessages>
                
              <InputContainer>
                <InputWrapper>
                  <ModelSelector
                    value={selectedModel}
                    onChange={handleModelChange}
                    options={modelOptions}
                    dropdownMatchSelectWidth={false}
                  />
                  <ExpandableInput
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask anything about RGUKT Basar..."
                    rows={inputRows}
                  />
                  <InputActions>
                    <ActionButton 
                      primary 
                      onClick={handleGenerateMessage}
                      disabled={!inputValue.trim()}
                    >
                      <FontAwesomeIcon icon={faArrowUp} size="sm" />
                    </ActionButton>
                  </InputActions>
                </InputWrapper>
              </InputContainer>
            </Flex>
          )}
        </ChatMain>
      </ChatContainer>
    </ThemeProvider>
  );
}); 