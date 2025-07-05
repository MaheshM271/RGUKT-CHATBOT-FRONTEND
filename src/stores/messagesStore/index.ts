import { action, observable, makeObservable } from 'mobx';

type MessageType = 'success' | 'error' | 'info' | null;
export interface IMessageStore {
  type: MessageType;
  infoString: string;
  setType(value: MessageType): void;
  setInfoString(value: string): void;
  showSuccessMessage(value: string, autoClose?: boolean): void;
  showErrorMessage(value: string, autoClose?: boolean): void;
  showInfoMessage(value: string, autoClose?: boolean): void;
  removeSuccessMessage(): void;
  removeErrorMessage(): void;
  removeInfoMessage(): void;
  clear(): void;
}

const clearTime = 6000;

export class MessagesStore implements IMessageStore {
  @observable public type: MessageType;

  @observable public infoString: string;

  constructor() {
    makeObservable(this);
    this.type = null;
    this.infoString = '';
  }

  @action.bound
  public setType(value: MessageType): void {
    this.type = value;
  }

  @action.bound
  public setInfoString(value: string): void {
    this.infoString = value;
  }

  @action.bound
  public showSuccessMessage(infoString: string, autoClose = true) {
    this.showMessage('success', infoString, autoClose);
  }

  @action.bound
  public removeSuccessMessage() {
    this.removeMessage('success');
  }

  @action.bound
  public showErrorMessage(infoString: string, autoClose = true) {
    this.showMessage('error', infoString, autoClose);
  }

  @action.bound
  public removeErrorMessage() {
    this.removeMessage('error');
  }

  @action.bound
  public showInfoMessage(infoString: string, autoClose = true) {
    this.showMessage('info', infoString, autoClose);
  }

  @action.bound
  public removeInfoMessage() {
    this.removeMessage('info');
  }

  private showMessage(type: MessageType, infoString: string, autoClose = true) {
    this.setInfoString(infoString);
    this.setType(type);
    if (autoClose) {
      setTimeout(() => {
        if (this.type === type) {
          this.setInfoString('');
          this.setType(null);
        }
      }, clearTime);
    }
  }

  private removeMessage(type: MessageType) {
    if (this.type === type) {
      this.setType(null);
    }
  }

  @action.bound
  public clear(): void {
    this.setType(null);
  }
}
