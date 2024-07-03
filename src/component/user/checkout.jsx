import { Box, Button, Grid, MenuItem, Modal, Typography } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import React, { useState } from "react";
import {
    TextField,
    FormControlLabel,
    RadioGroup,
    Radio,
    Divider
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Paypal from '../image/paypal.png';
import razorpay from '../image/razorpay.png';
import Stripe from '../image/stripe.png';
import { setUserDetail } from '../../redux/payment/paymentSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../util/axiosInstance';
import { CURRENCIES_SYMBOL } from '../currency/currency';
import countrys from '../../countryList.json'

const Checkout = ({ onClose }) => {
    const userDetails = useSelector(state => state.payment.userDetails);
    const [name, setName] = useState(userDetails.name ?? "");
    const [email, setEmail] = useState(userDetails.email ?? "");
    const [address, setAddress] = useState(userDetails.address ?? "");
    const [city, setCity] = useState(userDetails.city ?? "");
    const [state, setState] = useState(userDetails.state ?? "");
    const [phone, setPhone] = useState(userDetails.phone ?? "");
    const [country, setCountry] = useState(userDetails.country ?? "");
    const [zip, setZip] = useState(userDetails.zip ?? "");
    const [selectedOption, setSelectedOption] = useState('home');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
    const products = useSelector(state => state.payment.productDetails);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const subtotal = useSelector(state => state.cart.subtotal);
    const { currency, exchangeRates } = useSelector((state) => state.currency);
    const currencySymbol = CURRENCIES_SYMBOL[currency]
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zip: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        };
        if (!name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        } else if (!/^[a-zA-Z\s]*$/.test(name)) {
            newErrors.name = 'Name should only contain letters and spaces';
            valid = false;
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
            valid = false;
        }
        if (!address.trim()) {
            newErrors.address = 'Address is required';
            valid = false;
        }
        if (!city.trim()) {
            newErrors.city = 'City is required';
            valid = false;
        }
        if (!state.trim()) {
            newErrors.state = 'State is required';
            valid = false;
        }
        if (!country.trim()) {
            newErrors.country = 'Country is required';
            valid = false;
        }
        if (!zip.trim()) {
            newErrors.zip = 'Zip code is required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        const isValid = validateForm();
        if (isValid) {
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
            PlaceOrder(userData)
        }
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
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
                userData,
                currency: currency,
                payment_method: selectedPaymentMethod,
                items: products
            };
            const response = await axiosInstance.post("/orders/place-order", paymentdata);
            console.log(response)
            if (response.data.status) {
                if (selectedPaymentMethod === "razorpay") {
                    displayRazorpay(userData ,response.data.result, response.data.razorpay_key);
                } else if (selectedPaymentMethod === 'stripe') {
                    makeStripePayment(response?.data?.result.url, "pk_test_51L1E9YSFDFHp5bEhFLrxuBRiZ0ifZQE5Nle0k1szQOzv3H3fOG0UXU2QsxbBzvGJYBDqsFN73f0P58hWVpFJYddC00qtpMYQRs");
                } else if (selectedPaymentMethod === 'paypal') {
                    makePaypalPayment(response?.approval_url);
                } else {
                    console.log("Please choose a payment method!");
                }
            } else {
                console.log("Please choose a payment method!");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const razorpayVerification = async (razorpay_payment_id, razorpay_order_id, razorpay_signature) => {
        const data = await axiosInstance.post("/orders/verify-payment", { razorpay_payment_id, razorpay_order_id, razorpay_signature });
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
    async function displayRazorpay(userData , order, razoypayKey) {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
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
                razorpayVerification(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
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
        <Box sx={{ width: { xs: 250, md: 350 }, p: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                <NavigateBeforeRoundedIcon
                    fontSize="large"
                    cursor="pointer"
                    onClick={onClose}
                />
                <Typography fontWeight={600} align="center">Checkout</Typography>
            </Grid>
            <Box>
                <Typography variant="h6" component="div">
                    Total Price : {currencySymbol}{(subtotal * exchangeRates).toFixed(2)}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" >
                    <Typography variant="h6" mt={2}> Address :</Typography>
                </Box>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <FormControlLabel value="home" control={<Radio />} label="Home" />
                        <FormControlLabel value="office" control={<Radio />} label="Office" />
                    </RadioGroup>

                    <Grid container spacing={2}>
                        <Grid item xs={12} >
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
                        <Grid item xs={12} >
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
                                inputStyle={{
                                    width: "100%",
                                    height: "40px",
                                    fontFamily: "Monospace",
                                    border: "1px solid #AEB4BE",
                                }}
                                country={"in"}
                                value={phone}
                                onChange={setPhone}
                                inputProps={{
                                    name: "phone",
                                    required: true,
                                }}
                            />
                            {errors.phone && (
                                <Typography variant="caption" color="error">
                                    {errors.phone}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Billing address"
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
                                value={city}
                                size="small"
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
                                value={state}
                                size="small"
                                onChange={(e) => setState(e.target.value)}
                                error={!!errors.state}
                                helperText={errors.state}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField

                                margin="dense"
                                name="country"
                                label="Country"
                                select
                                size="small"
                                onChange={(e) => setCountry(e.target.value)}
                                fullWidth
                                value={country}

                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                                maxWidth: 140,
                                                overflow: "auto",
                                            },
                                        },
                                    },
                                }}
                                sx={{ fontSize: "1.25rem" }}
                            >
                                {countrys?.map((country, i) => (
                                    <MenuItem key={i} value={country.countryNameEn}  >
                                        {country.countryNameEn}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Zip code"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                error={!!errors.zip}
                                helperText={errors.zip}
                            />
                        </Grid>
                    </Grid>
                    {/* <Box display="flex" justifyContent="space-between" my={2} >
                        <Button
                            variant="contained"
                            color="black"
                            sx={{ color: '#fff', borderRadius: 2 }}
                            fullWidth
                            onClick={handleSubmit}
                        >
                            save address
                        </Button>
                    </Box> */}
                </Box>
            </Box>
            <Divider sx={{my: 2}} />
            <Box>
                <Typography variant='subtitle1' fontWeight={600}>
                    Select Payment Method
                </Typography>
                <RadioGroup
                    aria-label="payment-method"
                    value={selectedPaymentMethod}
                >
                    <FormControlLabel
                        value="razorpay"
                        control={<Radio />}
                        onChange={() => setSelectedPaymentMethod("razorpay")}
                        label={
                            <Box display="flex" alignItems="center">
                                <img src={razorpay} alt="Razorpay" width={80} style={{ background: 'white', marginRight: '10px' }} />
                                <Typography noWrap fontWeight={600} variant='caption'>Payment With RazorPay</Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="stripe"
                        control={<Radio />}
                        onChange={() => setSelectedPaymentMethod("stripe")}
                        label={
                            <Box display="flex" alignItems="center">
                                <img src={Stripe} alt="Stripe" width={80} style={{ background: 'white', marginRight: '10px' }} />
                                <Typography noWrap fontWeight={600} variant='caption'>Payment With Stripe</Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        onChange={() => setSelectedPaymentMethod("paypal")}
                        label={
                            <Box display="flex" alignItems="center">
                                <img src={Paypal} alt="Paypal" width={80} style={{ background: 'white', marginRight: '10px' }} />
                                <Typography noWrap fontWeight={600} variant='caption'>Payment With PayPal</Typography>
                            </Box>
                        }
                    />
                </RadioGroup>
                <Button
                    variant="contained"
                    color="black"
                    sx={{ color: '#fff', borderRadius: 2,my:2 }}
                    fullWidth
                    onClick={handleSubmit}>
                    Place Order
                </Button>
            </Box>
        </Box>
    );
}
export default Checkout;