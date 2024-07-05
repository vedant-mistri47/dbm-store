import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { MuiOtpInput } from "mui-one-time-password-input";
import "react-phone-input-2/lib/style.css";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setToken, setUserDetail } from "../../redux/auth/authSlice";
import axiosInstance from "../../util/axiosInstance";
import logo from "../image/logo (1).png";

function Login({ onClose }) {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showModal, setShowModal] = useState(true);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [resendDisabled, setResendDisabled] = useState(false);
  const dispatch = useDispatch();

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false); // Reset resend button when timer completes
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const formatSeconds = (seconds) => {
    const sec = Math.max(0, Math.min(seconds, 59));
    return sec < 10 ? `0${sec}` : `${sec}`;
  };

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSendOtp = async () => {
    if (!otpSent) {
      setLoading(true);
      const data = {
        phone: "+" + number,
        master_reseller_id: "626f85e0544a264104223e37",
        auth_type: "phone",
      };

      try {
        const response = await axiosInstance.post("user/send-otp", data);

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        setLoading(false);
        setOtpSent(true);
        setTimer(60); // Start timer when OTP is sent
        setSnackbarMessage("OTP sent successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error sending OTP:", error);
        setLoading(false);
        setError("Failed to send OTP. Please try again.");
        setSnackbarMessage("Failed to send OTP. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    const data = {
      phone: "+" + number,
      otp: otp,
      master_reseller_id: "626f85e0544a264104223e37",
      auth_type: "phone",
    };

    try {
      const response = await axiosInstance.post("user/verify-otp", data);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const result = response.data;

      setLoading(false);
      if (result.status) {
        dispatch(setToken(result));
        dispatch(setUserDetail(result.user));
        setSnackbarMessage("OTP verified successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        setShowModal(false);
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        setError("Invalid OTP. Please try again.");
        setSnackbarMessage("Invalid OTP. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setLoading(false);
      setError("Failed to verify OTP. Please try again.");
      setSnackbarMessage("Failed to verify OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const data = {
      phone: "+" + number,
      master_reseller_id: "626f85e0544a264104223e37",
      auth_type: "phone",
    };

    try {
      const response = await axiosInstance.post("user/send-otp", data);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      setLoading(false);
      setOtp("");
      setOtpSent(true);
      setTimer(10); // Start timer again when OTP is resent
      setSnackbarMessage("OTP resent successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setLoading(false);
      setError("Failed to resend OTP. Please try again.");
      setSnackbarMessage("Failed to resend OTP. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleChangeNumber = () => {
    setOtpSent(false);
    setOtp("");
    setError(null);
  };

  return (
    <>
      {showModal && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: { xs: "80%", sm: 250, md: 300, lg: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {otpSent ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={logo} alt="Logo" width="50%" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  mb: 1,
                  fontWeight: "700",
                  color: "#2B3445",
                  fontSize: "16px",
                }}
              >
                Welcome To Digi Bulk Marketing
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center", // Center vertically
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  +{number}
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  onClick={handleChangeNumber}
                  variant="body2"
                  sx={{
                    color: "#3399CC",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Change Number
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  mb: 2,
                  color: "grey",
                  fontWeight: "400",
                  fontSize: { xs: "12px", sm: "12px", md: "14px", lg: "14px" },
                }}
              >
                A 6-digit OTP has been sent to your phone number.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  width: "100%",
                }}
              >
                <MuiOtpInput
                  value={otp}
                  onChange={handleChange}
                  length={6}
                  gap={1}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleVerifyOtp();
                    }
                  }}
                  sx={{
                    width: "100%",
                    maxWidth: "450px",
                    "& input": {
                      width: { xs: "30px", sm: "40px", md: "50px" },
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleVerifyOtp}
                  sx={{
                    backgroundColor: "#0084FE !important",
                    color: "#fff !important",
                    width: "100% !important",
                    textTransform: "none",
                    cursor: "pointer",
                    mt: 2,
                  }}
                  disabled={!otp || loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Verify & Proceed"
                  )}
                </Button>
              </Box>

              {timer > 0 && (
                <Typography
                  variant="body2"
                  lineHeight={3}
                  sx={{
                    textAlign: "center",
                    color: "#0084FE",
                    fontSize: "15px",
                  }}
                >
                  00:{formatSeconds(timer)}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                  mt: 1
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    color: "#2B3445",
                    fontSize: "14px",
                  }}
                >
                  Did not receive OTP?
                </Typography>

                {timer === 0 ? (
                  <Typography
                    variant="h6"
                    onClick={handleResendOtp}
                    sx={{
                      color: "#D23F57 !important",
                      textTransform: "none",
                      fontSize: "14px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Resend OTP
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#808080 !important",
                      textTransform: "none",
                      fontSize: "14px",
                      cursor: "not-allowed",
                      fontWeight: "600",
                    }}
                  >
                    Resend OTP
                  </Typography>
                )}
              </Box>

              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={logo} alt="Logo" width="50%" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  mb: 2,
                  fontWeight: "700",
                  color: "#2B3445",
                  fontSize: "16px",
                }}
              >
                Welcome To Digi Bulk Marketing
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  mb: 2,
                  fontSize: "14px",
                  color: "grey",
                }}
              >
                Enter Phone Number
              </Typography>
              <PhoneInput
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  fontFamily: "Monospace",
                  border: "1px solid #AEB4BE",
                  marginBottom: "16px",
                }}
                containerStyle={{ width: "100%" }}
                country={"in"}
                value={number}
                onChange={(value) => setNumber(value)}
                inputProps={{
                  name: "phone",
                  required: true,
                  type: "tel",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendOtp();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleSendOtp}
                disabled={!number || loading}
                sx={{
                  mt: 2,
                  backgroundColor: "#0084FE",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#0084FE",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send OTP"
                )}
              </Button>
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <SnackbarContent
          message={snackbarMessage}
          sx={{
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#f44336",
            color: "#fff",
          }}
        />
      </Snackbar>
    </>
  );
}

export default Login;
