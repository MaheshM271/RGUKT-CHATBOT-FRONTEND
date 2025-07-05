import { Modal } from "antd";
import { observer } from "mobx-react";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import useStores from "stores/useStores";
import { Button } from "ui-library/button";
import { Flex } from "ui-library/flex";
import { Link1, Subtext } from "ui-library/typography";
import { Timer } from "../signup/timer";

interface Props {
  handleCancel: () => void;
  email: string;
  open: boolean;
  showTimer: boolean;
  handleShowTimer: (flag: boolean) => void;
}

export const OTPmodal = observer(({ email, handleCancel, open, showTimer, handleShowTimer }: Props) => {

  const { userStore } = useStores();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOTPError] = useState('');

  const handleResendCode = async () => {
    await userStore.resendOTP(email);
    handleShowTimer(true);
  }

  const validateOtp = async () => {
    try {
      setLoading(true);
      await userStore.verifyOTP(email, otp, true);
      navigate('/');
      setLoading(false);
      handleCancel();
    } catch (e) {
      setLoading(false);
      setOTPError('Invalid OTP');
    }
  }

  return (
    <Modal
      open={open}
      width={400}
      onCancel={handleCancel}
      onClose={handleCancel}
      footer={[
        <Button type='default' name='Cancel' onClick={handleCancel} />,
        <Button disabled={otp.length !== 6} loading={loading} type="primary" name="Submit" onClick={validateOtp} />,
      ]}
    >
      <Flex style={{ padding: "12px 0" }} flexDirection='column' gap='1rem'>
        <div>
          <OTPInput
            value={otp}
            skipDefaultStyles
            inputType="number"
            onChange={(value) => {
              setOtp(value);
              setLoading(false);
            }}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus
            inputStyle={'input'}
            containerStyle="input_container"
          />
        </div>
        {
          otpError && (
            <Subtext color="#CE5B52">{otpError}</Subtext>
          )
        }
        <Flex gap="0.25rem">
          <Subtext className="m-t-sm">
            Did not receive code?{' '}
          </Subtext>
          {showTimer ? (
            <Subtext>
              Please wait <Timer time={5} timeUp={() => handleShowTimer(false)} /> to send another
            </Subtext>
          ) : (
            <Link1 onClick={() => handleResendCode()}>Send another</Link1>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
});