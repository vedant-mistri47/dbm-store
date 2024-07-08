import { Box, Button, CircularProgress, Grid, Typography, Tooltip, Zoom } from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import React, { useState } from "react";
import { TextField, Divider } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Paypal from "/image/paypal.png";
// C:\Users\HP\Desktop\bit beast\dbm-store\public\image\paypal.png
import razorpay from '/image/razorpay.png';
import Stripe from '/image/stripe.png';
import { setUserDetail } from '../../redux/payment/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../util/axiosInstance';
import { CURRENCIES_SYMBOL } from '../currency/currency';
import countrys from '../../countryList.json'

const Checkout = ({ onClose }) => {
  const userDetails = useSelector((state) => state.payment.userDetails);
  const [name, setName] = useState(userDetails.name ?? "");
  const [email, setEmail] = useState(userDetails.email ?? "");
  const [address, setAddress] = useState(userDetails.address ?? "");
  const [city, setCity] = useState(userDetails.city ?? "");
  const [state, setState] = useState(userDetails.state ?? "");
  const [phone, setPhone] = useState(userDetails.phone ?? "");
  const [country, setCountry] = useState(userDetails.country ?? "");
  const [zip, setZip] = useState(userDetails.zip ?? "");
  const [selectedOption, setSelectedOption] = useState("home");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("razorpay");
  const products = useSelector((state) => state.payment.productDetails);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const currencySymbol = CURRENCIES_SYMBOL[currency];
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    };
    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      newErrors.name = "Name should only contain letters and spaces";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }
    if (!address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }
    if (!city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    }
    if (!state.trim()) {
      newErrors.state = "State is required";
      valid = false;
    }
    if (!country.trim()) {
      newErrors.country = "Country is required";
      valid = false;
    }
    if (!zip.trim()) {
      newErrors.zip = "Zip code is required";
      valid = false;
    } else if (!/^\d{6}$/.test(zip.trim())) {
      newErrors.zip = "Zip code must be exactly 6 digits";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      const userData = {
        name,
        email,
        address,
        city,
        state,
        phone,
        country,
        zip,
      };
      dispatch(setUserDetail(userData));
      PlaceOrder(userData);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const PlaceOrder = async (userData) => {
    try {
      const paymentdata = {
        currency: currency,
        payment_method: selectedPaymentMethod,
        items: products,
      };

      const response = await axiosInstance.post(
        "orders/place-order",
        JSON.stringify(paymentdata)
      );
      if (response.data.status) {
        if (selectedPaymentMethod === "razorpay") {
          displayRazorpay(
            userData,
            response.data.result,
            response.data.razorpay_key
          );
        } else if (selectedPaymentMethod === "stripe") {
          makeStripePayment(response?.data?.result.url);
        } else if (selectedPaymentMethod === "paypal") {
          makePaypalPayment(response?.data?.approval_url);
        } else {
          console.log("Please choose a payment method!");
        }
      } else {
        console.log("place order failed");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const razorpayVerification = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  ) => {
    const data = await axiosInstance.post("/orders/verify-payment", {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });
    console.log(data);
  };

  const makePaypalPayment = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  const makeStripePayment = (link) => {
    if (link) {
      window.location.href = link;
    }
  };

  async function displayRazorpay(userData, order, razoypayKey) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: razoypayKey,
      amount: order.amount,
      currency: currency,
      name: "Digi Bulk Marketing",
      description: "Order #" + order.receipt,
      image: "https://api.digibulkmarketing.com/media/reseller/dbm/logo.png",
      order_id: order.id,
      prefill: {
        name: userData.name ?? "",
        email: userData.email ?? "",
        contact: userData.phone ?? "",
      },
      handler: function (response) {
        razorpayVerification(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      },
      theme: {
        color: "#3399CC",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    razorpay.open();
  }

  return (
    <Box sx={{ width: { xs: 300,sm:300 ,md: 400 }, p: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={2}>
        <NavigateBeforeRoundedIcon
          fontSize="large"
          cursor="pointer"
          onClick={onClose}
        />
        <Typography fontWeight={600} align="center">
          Checkout
        </Typography>
      </Grid>
      <Box>
        <Typography variant="body" component="div">
          Total price : {currencySymbol}
          {(subtotal * exchangeRates).toFixed(2)}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body" mt={2}>
            {" "}
            Address :
          </Typography>
        </Box>
        <Box
        mt={2}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={setPhone}
                inputStyle={{ width: "100%" }}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                containerStyle={{}}
              />
              {errors.phone && (
                <Typography color="error" variant="caption">
                  {errors.phone}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                size="small"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                size="small"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                size="small"
                value={state}
                onChange={(e) => setState(e.target.value)}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                size="small"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                error={!!errors.zip}
                helperText={errors.zip}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Country"
                variant="outlined"
                fullWidth
                size="small"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 0 }} /> 
          <Typography variant="body"> Choice Payment Method </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            {[
              { id: "razorpay", src: razorpay, alt: "Razorpay" },
              { id: "stripe", src: Stripe, alt: "Stripe" },
              { id: "paypal", src: Paypal, alt: "Paypal" },
            ].map((method) => (
              <Tooltip key={method.id} title={`Pay with ${method.alt}`} arrow placement="top-start"  followCursor/* TransitionComponent={Zoom} */>
                <Box
                  component="img"
                  src={method.src}
                  alt={method.alt}
                  sx={{
                    width: 80,
                    height: 50,
                    cursor: "pointer",
                    border:
                      selectedPaymentMethod === method.id
                        ? "2px solid blue"
                        : "1px solid grey",
                    borderRadius: 2,
                    padding: 1,
                  }}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                />
              </Tooltip>
            ))}
          </Box>

          <Button
            variant="contained"
            color="black"
            onClick={handleSubmit}
            sx={{ color: "#fff", borderRadius: 2, mt: 2 }}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Pay Now"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
