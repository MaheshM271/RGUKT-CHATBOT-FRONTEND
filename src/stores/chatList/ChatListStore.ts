import { action, makeObservable, observable } from "mobx";
import { IRootStore } from "..";
import { apiAuthCaller } from "service/apicaller";
import { ChatListStoreType, ChatMessage, ChatMessageListStoreType, Chats, ChatStoreType } from "./types";
import { ChatMessageStore, ChatStore } from "./ChatStore";
import { CHATS_API, DELETE_CHAT_API, GENERATE_MESSAGE_API, MESSAGES_API, RENAME_CHAT_API } from "../../config";


export class ChatListStore implements ChatListStoreType {
  @observable public rootStore: IRootStore;
  @observable private _chatsList: Chats[] = [];
  @observable private _chats?: ChatStoreType = undefined;
 
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }


  @action.bound
  public updateChatsList(chats: Chats[]) {
    this._chatsList = chats;
  }

  public get chatsList() {
    return this._chatsList;
  }

  public get chats() {
    return this._chats;
  }

  @action.bound
  public async getChatsList(user_id: string) {
    try {
      const response = await apiAuthCaller().get(`${CHATS_API}/${user_id}`);
      const data = response.data.data.chats.map((chat: any) => 
        new ChatStore(this.rootStore, {
          chat_id: chat.chat_id,
          chat_name: chat.chat_name,
          created_at: chat.created_at
        })
      )

      this.updateChatsList(data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  @action.bound
  public async renameChatConversation(chat_id: string, chat_name: string) {
    try {
      const response = await apiAuthCaller().put(`${RENAME_CHAT_API}/${chat_id}`, { "chat_name": chat_name });
      console.log("Response: ", response);

      this.updateChatsList(this._chatsList.map((chat) => {
        if (chat.chat_id === chat_id) {
          chat.setChatName(chat_name);
        }
        return chat;
      }))
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  @action.bound
  public async deleteChatConversation(chat_id: string) {
    try {
      const response = await apiAuthCaller().delete(`${DELETE_CHAT_API}/${chat_id}`);
      console.log("Response: ", response);

      this.updateChatsList(this._chatsList.filter((chat) => chat.chat_id !== chat_id))

    } catch (error) {
      console.log("Error: ", error);
    }
  }


}

export class ChatMessageListStore implements ChatMessageListStoreType {
  @observable public rootStore: IRootStore;
  @observable private _messages: ChatMessage[] = [];

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action.bound
  public updateChatMessages(chats: ChatMessage[]) {
    this._messages = chats;
  }

  public get messages() {
    return this._messages;
  }

  @action.bound
  public async generateMessage(user_id: string, chat_id: any, message: string, model: string) {
    const payload = {
      "user_id": user_id,
      "chat_id": chat_id,
      "message": message,
      "model": model
    }

    this.updateChatMessages([...this._messages,
      new ChatMessageStore(this.rootStore, {
      message_id: "dummy_uuid-1",
      role: "user",
      content: message,
      created_at: new Date().toISOString()
    })])

    console.log("Payload", payload);

    try {
      const response = await apiAuthCaller().post(`${GENERATE_MESSAGE_API}`, payload);

      console.log("Response: ", response);

      const data = response.data.data;

      console.log("Data : ", data);

      this.updateChatMessages([...this._messages,
        new ChatMessageStore(this.rootStore, {
          message_id: data.messages[1].message_id,
          role: data.messages[1].role,
          content: data.messages[1].content,
          created_at: data.messages[1].created_at
        })
      ])

      if (chat_id === null) {
        this.getChatMessages(user_id, data.chat_id);

        this.rootStore.chatListStore.updateChatsList([
          new ChatStore(this.rootStore, {
            chat_id: data.chat_id,
            chat_name: data.chat_name,
            created_at: data.created_at
          }), ...this.rootStore.chatListStore.chatsList
        ])
      }

      

      return data.chat_id;

    } catch (error) {
      console.log("Error: ", error);
    }
  }

  @action.bound
  public async getChatMessages(user_id: string, chat_id: string) {
    try {
      const response = await apiAuthCaller().get(`${MESSAGES_API}/${user_id}/${chat_id}`);
      const data = response.data.data.messages.map((message: any) => 
        new ChatMessageStore(this.rootStore, {
          message_id: message.message_id,
          role: message.role,
          content: message.content,
          created_at: message.created_at
        })
      )

      this.updateChatMessages(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

}