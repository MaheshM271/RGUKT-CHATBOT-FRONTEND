import { Button } from "ui-library/button";
import { Flex } from "ui-library/flex";
import { H1, Subtext } from "ui-library/typography";
import { InputField } from "ui-library/input";
import "./login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthTemplate } from "../template";
import { observer } from "mobx-react";
import Loader from "./loader";
import { GoogleOAuth } from "../googleLogin";
import { Error } from "../error";
import useStores from "stores/useStores";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { validateSigninForm } from "../signup/validations";
import { OTPmodal } from "./otpModal";


export const Login = observer(() => {

  const navigate = useNavigate();
  const location = useLocation();

  const { userStore } = useStores();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const queryParams = new URLSearchParams(location.search);
  const emailFromQuery = queryParams.get("email") || "";

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    setForm({ email: emailFromQuery, password: '' });
  }, [emailFromQuery]);

  const updateFrom = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    })
  }
  const updateErrors = (field: string, value: string) => {
    setErrors({
      ...errors,
      [field]: value,
    })
  }

  const handleSignIn = async () => {
    const errors = validateSigninForm(form);
    if (errors.email || errors.password) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    try {
      const isVerified = await userStore.login({ email: form.email, password: form.password });
      if (!isVerified) {
        setOpen(true);
        return;
      }
      navigate("/chat");
    } catch (error) {
      updateErrors('password', error as unknown as string);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthTemplate hideImage imageName="login">
      <Flex marginTop="4rem" className="loginForm" centered flexDirection="column" gap="1rem">
        <H1 color="#143D59">Sign in</H1>
        <Flex gap="1rem" flexDirection="column">
          {/* <GoogleOAuth isLogin={true} /> */}
          <Flex flexDirection="column" gap="0.25rem">
            <InputField
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateFrom('email', e.target.value)}
            />
            <Error error={errors.email} />
          </Flex>
          <Flex flexDirection="column" gap="0.25rem">
            <InputField
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => updateFrom('password', e.target.value)}
              suffix={
                <FontAwesomeIcon
                  data-testid="eye"
                  onClick={() => setShowPassword((x) => !x)}
                  icon={showPassword ? faEyeSlash : faEye}
                />
              }
            />
            <Error error={errors.password} />
          </Flex>
          <Button
            size="large"
            color="#143D59"
            type="primary"
            name="Sign in"
            onClick={handleSignIn}
            style={{ borderRadius: "24px", height: "38px" }}
          />
        </Flex>
        <Flex gap="0.5rem" alignItemsCenter>
          <Subtext>New to RGUKT InfoGuru ?</Subtext>
          <Subtext
            className="signupLink"
            onClick={() => {
              navigate("/signup");
            }}
            color="#F4B41A"
          >
            Join Now for Free
          </Subtext>
        </Flex>
      </Flex>
    </AuthTemplate>
  );
});
