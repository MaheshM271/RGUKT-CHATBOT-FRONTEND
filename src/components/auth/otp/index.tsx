import { observer } from "mobx-react";
import { Flex } from "ui-library/flex";
import { H1, Label } from "ui-library/typography";
import "./otp.css";
import useStores from "stores/useStores";
import type { GetProp } from "antd";
import { Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { Button } from "ui-library/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "components/common/logo";
import axios from "axios";
import { VERIFY_OTP } from "../../../config";
import "react-toastify/dist/ReactToastify.css";

interface AxiosResponse {
  status: number;
  data: {
    message?: string;
  };
}

export const OTP = observer(() => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/clients");
    }
  }, [navigate]);

  const [error, setError] = useState("");

  const { userStore } = useStores();

  const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
    setOtp(text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const [countdown, setCountdown] = useState<number>(30);
  const [showLink, setShowLink] = useState<boolean>(false);

  useEffect(() => {
    // toast.success("OTP sent to the email successfully");
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setShowLink(true);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(30);
    setShowLink(false);
  };

  const emailAddress = userStore.email;

  const verifyOTP = async (): Promise<AxiosResponse> => {
    try {
      const response = await axios.post(VERIFY_OTP, { emailAddress, otp });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleVerification = async () => {
    try {
      if (otp.length !== 6) {
        setError("Please enter otp");
        return;
      }
      await verifyOTP();
      navigate("/clients");
      // toast.success("Verification-Successful");
    } catch (error) {
      setOtp("");
      setError("Invalid or Expired OTP");
    }
  };

  return (
    <>
      <Logo />
      <Flex centered className="otpVerificationContianer">
        <Flex className="otp-verification" centered flexDirection="column">
          <H1 color="#143D59">Please Complete Verification to continue</H1>
          <br />
          <Label> Please verify your email, An OTP sent to your </Label>
          <Label>Email</Label>
          <br />
          <Label>{userStore.email}</Label>
          <br />
          <Input.OTP
            length={6}
            {...sharedProps}
            mask="*"
            value={otp}
            onFocus={() => {
              setError("");
            }}
          />
          <br />
          {showLink ? (
            <Label className="resendOTP" color="#143D59" onClick={handleResend}>
              Resend OTP
            </Label>
          ) : (
            <Label color="#143D59">Resend OTP in {countdown}s </Label>
          )}
          <br />
          <Button
            size="large"
            type="primary"
            onClick={handleVerification}
            name="Verify Email"
          />
          <br />
          {error && (
            <div className="error-message" style={{ color: "#CE5B52" }}>
              {error}
            </div>
          )}
        </Flex>
      </Flex>
    </>
  );
});
