import { IRootStore } from "..";

export interface LoginFormType {
  email: string;
  password: string;
}

export interface FormType {
  firstName: string;
  lastName: string;
  checked: boolean;
  email: string;
}

export interface IUserStore {
  email: string;
  fullName: string;
  userId: string;
  isLoggedIn: boolean;
  loadingCheckLogin: string;
  isRedirected: boolean;
  updateIsRedirected: (redirected: boolean) => void;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  rootStore: IRootStore;
  avatarURL: string;
  signup: (form: FormType) => Promise<void>
  verifyOTP: (emailAddress: string, otp: string, isLoginFlow?: boolean) => Promise<void>
  resendOTP: (emailAddress: string) => Promise<void>
  login: (form: LoginFormType) => Promise<boolean>
  logout: () => Promise<Boolean>
}