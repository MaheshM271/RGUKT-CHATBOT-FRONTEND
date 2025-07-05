import { action, makeObservable, observable } from "mobx";
import { ChatMessageStoreType, ChatStoreType } from "./types";
import { IRootStore } from "..";

export class ChatStore implements ChatStoreType {
  @observable private _chat_id: string = '';

  @observable private _chat_name: string = '';

  @observable private _created_at: string = '';

  @observable public rootStore: IRootStore

  @action.bound
  public setChatId(value: string) {
    this._chat_id = value;
  }

  public get chat_id() {
    return this._chat_id;
  }

  @action.bound
  public setChatName(value: string) {
    this._chat_name = value;
  }

  public get chat_name() {
    return this._chat_name;
  }

  @action.bound
  public setCreatedAt(value: string) {
    this._created_at = value;
  }

  public get created_at() {
    return this._created_at;
  }

  constructor(rootStore: IRootStore, chatData?: Partial<ChatStoreType>) {
    this.rootStore = rootStore;

    if (chatData) {
      this._chat_id = chatData.chat_id || '';
      this._chat_name = chatData.chat_name || '';
      this._created_at = chatData.created_at || '';
    }

    makeObservable(this);
  }
}

export class ChatMessageStore implements ChatMessageStoreType {
  @observable private _message_id: string = '';

  @observable private _role: string = '';

  @observable private _content: string = '';

  @observable private _created_at: string = '';

  @observable public rootStore: IRootStore

  @action.bound
  public setMessageId(value: string) {
    this._message_id = value;
  }

  public get message_id() {
    return this._message_id;
  }

  @action.bound
  public setRole(value: string) {
    this._role = value;
  }

  public get role() {
    return this._role;
  }

  @action.bound
  public setContent(value: string) {
    this._role = value;
  }

  public get content() {
    return this._content;
  }

  @action.bound
  public setCreatedAt(value: string) {
    this._created_at = value;
  }

  public get created_at() {
    return this._created_at;
  }

  constructor(rootStore: IRootStore, messageData?: Partial<ChatMessageStoreType>) {
    this.rootStore = rootStore;

    if (messageData) {
      this._message_id = messageData.message_id || '';
      this._role = messageData.role || '';
      this._content = messageData.content || '';
      this._created_at = messageData.created_at || '';
    }

    makeObservable(this);
  }
}
