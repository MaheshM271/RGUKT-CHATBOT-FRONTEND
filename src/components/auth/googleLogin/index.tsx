import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import { apiCaller } from "service/apicaller";
import { useNavigate } from "react-router-dom";
import useStores from "stores/useStores";
import Loader from "../login/loader";
import { Flex } from "ui-library/flex";
import { useState } from "react";
import { Divider } from "antd";
import { Label } from "ui-library/typography";
import {GOOGLE_LOGIN_API} from "../../../config";

export const GoogleOAuth = ({ isLogin }) => {

  const { userStore } = useStores();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSuccess = async (oAuthResponse: CredentialResponse) => {
    setLoading(true);
    try {
      const response = await  apiCaller().post(GOOGLE_LOGIN_API, {
        credential: oAuthResponse.credential
      });

      if (response.status === 200) {
        const responseData = response.data.data;
        userStore.isLoggedIn = true;
        userStore.userId = responseData.userId;
        userStore.fullName = responseData.firstName + " " + responseData.lastName;
        userStore.accessToken = responseData.token;
        userStore.avatarURL = responseData.avatarURL;
        localStorage.setItem('Authorization', responseData.token)
        setLoading(false);
        navigate("/clients");
      } else {
        setLoading(false);
        alert("Login Failed!");
      }
    }
    catch (error) {
      setLoading(false);
      if (isLogin) {
        alert("Login Failed!");
      } else {
        alert("Signup Failed!");
      }
    }
  }
  const onFailure = () => {
    setLoading(false);
    // toast.error("Login Failed");
  }

  if (loading) return <Loader />;

  return (
      <GoogleOAuthProvider clientId="1076068628081-0odjmsav2v6qkkhnuvde8ns853o3tpq6.apps.googleusercontent.com">
          <Flex flexDirection="column" gap="0.5rem" >
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onFailure}
              useOneTap
              width="400px"
              text={"continue_with"}
              shape="pill"
              logo_alignment="center"
            />
            <Flex flexGrow>
              <Divider style={{ margin: '0' }}>
                <Label color="143D59" style={{ marginBottom: "6px" }}>or</Label>
              </Divider>
            </Flex>
          </Flex>
      </GoogleOAuthProvider>
  )
}