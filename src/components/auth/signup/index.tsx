import { Checkbox, Modal, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "ui-library/button";
import { Flex } from "ui-library/flex";
import { InputField } from "ui-library/input";
import { H1, Label, Link1, Subtext } from "ui-library/typography";
import { AuthTemplate } from "../template";
import "./signup.css";
import useStores from "stores/useStores";
import { observer } from "mobx-react";
import { conditions, validateForm } from "./validations";
import { faCircleCheck, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleOAuth } from "../googleLogin";
import { Toast } from "ui-library/toast";

const defaultForm = {
  password: '',
  confirmPassword: '',
  firstName: 'dummy first name',
  lastName: 'dummy last name',
  email: '',
  checked: false,
};

const defaultErrors = {
  password: '',
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  checked: '',
}

export const SignUp = observer(() => {
  const navigate = useNavigate();
  const { userStore: { signup } } = useStores();
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState(defaultErrors);
  const [showSignupLoader, setShowSignupLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const updateForm = (field: string, value: string | boolean) => {
    setShowSignupLoader(false);
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
  const updateFormErrors = (error) => {
    setErrors({
      ...errors,
      ...error,
    })
  }

  const updateFields = (field: string, value: string | boolean) => {
    updateErrors(field, '');
    updateForm(field, value);
  }

  const handleSubmit = async () => {
    const error = validateForm(form);

    const errorPresent = Object.keys(error).reduce((acc, value) => {
      return acc || !!error[value];
    }, false);

    if (errorPresent) {
      updateFormErrors(error);
      return;
    }

    try {
      setShowSignupLoader(true);
      await signup(form);
      setShowSignupLoader(false);
      navigate("/chat")
      setShowToast(true);
    } catch (e) {
      setShowSignupLoader(false);
      updateErrors('checked', e as unknown as string);
    }

  };

  
  
  return (
    <AuthTemplate hideImage imageName="signup">
      <Flex marginTop="-1rem" alignItemsCenter className="loginFormContianer">
        {/* {OTPModal} */}
        <Flex gap="0.5rem" className="signup" centered flexDirection="column">
          <H1 color="#143D59">Sign up</H1>
          {/* <Flex centered>
            <GoogleOAuth isLogin={false} />
          </Flex> */}
          <Flex className="nameContainer" justifyContentCenter flexDirection="column" gap="0.5rem">
            {/* <Flex style={{ width: '400px' }} justifyContentCenter flexGrow gap="1rem">
              <Flex flexDirection="column" gap="0.25rem">
                <InputField
                  width="192px"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => updateFields('firstName', e.target.value)}
                  label="First Name"
                />
                {errors.firstName && (
                  <Subtext color="#CE5B52">
                    {errors.firstName}
                  </Subtext>
                )}
              </Flex>
              <Flex flexDirection="column" gap="0.25rem">
                <InputField
                  width="192px"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => updateFields('lastName', e.target.value)}
                  label="Last Name"
                />
                {errors.lastName && (
                  <Subtext color="#CE5B52">
                    {errors.lastName}
                  </Subtext>
                )}
              </Flex>
            </Flex> */}
            <Flex justifyContentCenter flexDirection="column" gap="0.25rem">
              <InputField
                labelClassName="label"
                width="400px"
                placeholder="Email"
                value={form.email}
                onChange={(e) => updateFields('email', e.target.value)}
                label="Email"
              />
              {errors.email && (
                <Subtext color="#CE5B52">
                  {errors.email}
                </Subtext>
              )}
            </Flex>
            <Popover
              trigger="focus"
              placement="left"
              content={
                <Flex gap="0.25rem" flexDirection="column">
                  <Label fontWeight={500}>Passwords must include at least:</Label>
                  <Flex gap="0.25rem" flexDirection="column">
                    {
                      conditions(form.password).map(item => {
                        return (
                          <Flex gap="0.5rem" alignItemsCenter>
                            <FontAwesomeIcon
                              color={item.condition ? '#349C03' : '#CE5B52'}
                              icon={item.condition ? faCircleCheck : faCircleXmark}
                            />
                            <Subtext color={item.condition ? '#349C03' : '#CE5B52'}>
                              {item.label}
                            </Subtext>
                          </Flex>
                        )
                      })
                    }
                  </Flex>
                </Flex>
              }
            >
              <Flex justifyContentCenter flexDirection="column" gap="0.25rem">
                <InputField
                  labelClassName="label"
                  width="400px"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  label="Password"
                  onChange={(e) => updateFields('password', e.target.value)}
                  suffix={
                    <FontAwesomeIcon
                      data-testid="eye"
                      onClick={() => setShowPassword((x) => !x)}
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  }
                />
                {errors.password && (
                  <Subtext color="#CE5B52">
                    {errors.password}
                  </Subtext>
                )}
              </Flex>
            </Popover>
            <Flex justifyContentCenter gap="0.25rem" flexDirection="column">
              <InputField
                labelClassName="label"
                width="400px"
                placeholder="Confirm password"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => updateFields('confirmPassword', e.target.value)}
                suffix={
                  <FontAwesomeIcon
                    data-testid="eye"
                    onClick={() => setShowConfirmPassword((x) => !x)}
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                }
              />
              {errors.confirmPassword && (
                <Subtext color="#CE5B52">
                  {errors.confirmPassword}
                </Subtext>
              )}
            </Flex>
            <Flex flexDirection="column" gap="0.25rem">
              <Flex alignItemsCenter width="400px" gap="0.5rem">
                <Checkbox
                  onChange={(e) => updateFields('checked', e.target.checked)}
                  checked={form.checked}
                />
                <Subtext>
                  By signing up, you accept our Terms of Service & Privacy
                  Policy.
                </Subtext>
              </Flex>
              {errors.checked && (
                <Subtext color="#CE5B52">
                  {errors.checked}
                </Subtext>
              )}
            </Flex>
            <Button
              style={{ width: '400px' }}
              size="large"
              type="primary"
              name="Sign up"
              onClick={handleSubmit}
              loading={showSignupLoader}
            />

            <Flex gap="0.5rem" centered>
              <Subtext>Already a member ?</Subtext>
              <Subtext
                className="loginLink"
                onClick={() => navigate("/login")}
                color="#F4B41A"
              >
                Sign in
              </Subtext>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </AuthTemplate>
  );
});
