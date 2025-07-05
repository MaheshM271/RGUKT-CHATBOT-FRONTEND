import { IRootStore } from "..";
import { action, makeObservable, observable } from "mobx";
import { IUserStore } from "./types";
import {
  SIGNUP_API,
  VERIFY_OTP,
  RESEND_OTP,
  LOGIN,
  LOGOUT,
  VERIFY_AUTH_TOKEN,
} from "../../config";
import axios from "axios";
import LocalStorage from "utils/localstorage";
import { jwtDecode } from "jwt-decode";
import { apiAuthCaller, apiCaller } from "../../service/apicaller";

interface ApiErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export class UserStore implements IUserStore {
  @observable public email = "";

  @observable public userId = "";

  @observable public fullName = "";

  @observable public avatarURL = "";

  @observable public loadingCheckLogin = "idle";

  @observable public isLoggedIn = false;

  @observable public isRedirected = false;

  @observable public accessToken =
    localStorage.getItem("access_token") || undefined;
  
  @observable public refreshToken =
    localStorage.getItem("refresh_token") || undefined;

  @observable
  public rootStore: IRootStore;

  @action.bound
  public async signup(form) {
    let finalForm = { ...form };
    delete finalForm.checked;
    const email = finalForm.email;
    delete finalForm.email;
    try {
      finalForm = {
        ...finalForm,
        "email": email,
      };

      await axios.post(SIGNUP_API, finalForm);
      await this.login({ email:finalForm.email, password: finalForm.password });
    } catch (error: unknown) {
      const knownError = error as ApiErrorResponse;
      throw knownError?.response?.data?.message;
    }
  }

  @action.bound
  public updateIsRedirected(redirected: boolean) {
    this.isRedirected = redirected;
  }

  @action.bound
  public async verifyOTP(
    emailAddress: string,
    otp: string,
    isLoginFlow?: boolean
  ) {
    const {
      messagesStore: { showInfoMessage, showErrorMessage },
    } = this.rootStore;
    try {
      const response = await apiAuthCaller().post(VERIFY_OTP, {
        emailAddress,
        otp,
      });
      if (response) {
        const token = response.data.data.token;
        const data: { userId: string; email: string; isVerfied: boolean } =
          jwtDecode(token);
        this.userId = data.userId;
        this.email = data.email;
        this.accessToken = token;
        this.isLoggedIn = true;
        LocalStorage.set("Authorization", "Bearer " + token);
      }
      showInfoMessage(
        `${
          isLoginFlow
            ? "Email verified successfully"
            : "User created successfully. Please login using your credentials!"
        }`
      );
    } catch (error: unknown) {
      showErrorMessage("Enter valid OTP");
      const knownError = error as ApiErrorResponse;
      throw knownError?.response?.data?.message;
    }
  }

  @action.bound
  public async resendOTP() {
    try {
      await apiAuthCaller().get(RESEND_OTP);
    } catch (error: unknown) {
      const knownError = error as ApiErrorResponse;
      throw knownError?.response?.data?.message;
    }
  }

  @action.bound
  public resetToken() {
    this.isLoggedIn = false;
    LocalStorage.remove("access_token");
    LocalStorage.remove("refresh_token");
  }

  @action.bound
  public async verifyToken(token: string | undefined) {
    try {
      const payload = {
        token,
      };
      this.loadingCheckLogin = 'loading';
      const response = await apiCaller().post(VERIFY_AUTH_TOKEN, payload);
      if (response.data.data) {
        this.isLoggedIn = true;
        this.loadingCheckLogin = "loaded";
        this.userId = response.data.data.userId;
        this.email = response.data.data.email
        this.fullName = "";
        this.avatarURL = "";
        // console.log("It is coming here")
        // this.rootStore.chatListStore.getChatsList(this.userId);

      }
    } catch (error: unknown) {
      this.loadingCheckLogin = "failed";
      this.isLoggedIn = false;
      this.resetToken();
      const knownError = error as ApiErrorResponse;
      throw knownError?.response?.data?.message;
    }
  }

  @action.bound
  public async load() {
    const token = LocalStorage.get("access_token") || undefined;
    if (token) {
      try {
        await this.verifyToken(token);
      } catch (e) {
        this.loadingCheckLogin = "failed";
        this.isLoggedIn = false;
      }
    } else {
      this.loadingCheckLogin = "failed";
      this.isLoggedIn = false;
    }
  }

  @action.bound
  public async login(form) {
    try {

      this.loadingCheckLogin = 'loading';
      const response = await axios.post(LOGIN, form);
      if (response) {
        const access_token = response.data.data.access_token;
        const refresh_token = response.data.data.refresh_token;
        this.userId = response.data.data.id;
        this.email = response.data.data.email;
        this.accessToken = access_token;
        this.refreshToken = refresh_token
        this.isLoggedIn = true;
        LocalStorage.set("access_token", access_token);
        LocalStorage.set("refresh_token", refresh_token)

        this.loadingCheckLogin = "loaded";
        // this.rootStore.chatListStore.getChatsList(this.userId);

        return !!response.data;

      }
    } catch (error: any) {
      if (
        error.response.data.message ===
        "User not verified. OTP already sent to registered email for verification."
      ) {
        return false;
      }
      this.loadingCheckLogin = "failed";
      this.isLoggedIn = false;
      const knownError = error as ApiErrorResponse;
      throw knownError?.response?.data?.message;
    }
    return true;
  }

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    this.load();
    makeObservable(this);
  }

  @action.bound
  public async logout(): Promise<Boolean> {
    try {
      const payload = {
        refresh_token: this.refreshToken,
      };
      const response = await apiCaller().post(LOGOUT, payload);

      if (response.status === 200) {
        this.isLoggedIn = false;
        this.accessToken = undefined;
        LocalStorage.remove("access_token");
        LocalStorage.remove("refresh_token")
        return Promise.resolve(true);
      }
    } catch (error: unknown) {
      const knownError = error as ApiErrorResponse;
      throw knownError?.response?.data?.message;
    }
    return Promise.resolve(false);
  }
}
