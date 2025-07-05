
import { IUserStore } from "./user/types";
import { UserStore } from "./user";
import { ChatListStore, ChatMessageListStore } from "./chatList/ChatListStore";
import { IMessageStore, MessagesStore } from "./messagesStore";

export interface IRootStore {
  
  userStore: IUserStore;
  chatListStore: ChatListStore;
  chatMessageListStore: ChatMessageListStore;
  messagesStore: IMessageStore
}

export class RootStore implements IRootStore {

  
  public userStore: IUserStore;

  public chatListStore: ChatListStore;

  public chatMessageListStore: ChatMessageListStore;

  public messagesStore: IMessageStore;



  constructor() {
    this.userStore = new UserStore(this);
    this.chatListStore = new ChatListStore(this);
    this.chatMessageListStore = new ChatMessageListStore(this);
    this.messagesStore = new MessagesStore();
  }
}

export const stores = new RootStore();

