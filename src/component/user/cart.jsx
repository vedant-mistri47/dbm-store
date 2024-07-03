import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";
import emptyCart from "../image/emptyCart.png";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartProduct,
} from "../../redux/cart/cartSlice";
import { setProductDetails } from "../../redux/payment/paymentSlice";
import { CURRENCIES_SYMBOL } from "../currency/currency";

const Cart = ({ onClose, onClick, openProduct }) => {
  const cartData = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const currencySymbol = CURRENCIES_SYMBOL[currency];
  const dispatch = useDispatch();
  const couponCode = "a5623d";
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleRemoveFromCart = (id, variationId, e) => {
    e.stopPropagation();
    dispatch(removeFromCart({ id, variationId }));
    setSnackbarMessage("Item removed from cart");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleOpenProduct = (product, variation, e) => {
    e.stopPropagation();
    openProduct();
    dispatch(cartProduct({ product, variation }));
  };

  const increaseCartItem = (id, variationId, e) => {
    e.stopPropagation();
    dispatch(increaseQuantity({ id, variationId }));
    setSnackbarMessage("Quantity increased");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const decreaseCartItem = (id, variationId, quantity, e) => {
    e.stopPropagation();
    dispatch(decreaseQuantity({ id, variationId }));
    setSnackbarMessage("Quantity decreased");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleCheckout = () => {
    dispatch(
      setProductDetails(
        cartData.map((item) => ({
          product_id: item.product.id,
          variation_id: item.variation._id,
          quantity: item.quantity,
        }))
      )
    );
    onClick();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: { xs: 250, md: 350 }, p: 3, position: "relative" }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        sx={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "#fff" }}
      >
        <NavigateBeforeRoundedIcon
          fontSize="large"
          cursor="pointer"
          onClick={onClose}
        />
        <Typography variant="h6" fontWeight={600}>
          Shopping Cart
        </Typography>
        <Typography fontWeight={600}>({cartData.length} item)</Typography>
      </Grid>
      <Divider />
      <Box sx={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
        {cartData.map((item, index) => (
          <Grid
            key={index}
            container
            alignItems="center"
            spacing={2} 
            sx={{
              borderRadius: "15px",
              cursor: "pointer",
              boxShadow: "0 0 10px #eee",
              p: 1,
              my: 1,
            }}
            onClick={(e) => handleOpenProduct(item.product, item.variation, e)}
          >
            <Grid item xs={2} container justifyContent="center">
              <img width={60} height={60} src={item.image} alt="Product" />
            </Grid>
            <Grid item xs={9} container direction="column">
              <Typography variant="body1" noWrap>
                {item.name} ({item.variation?.title})
              </Typography>
              <Typography variant="body2" fontSize={"10px"}>
                ({currencySymbol}
                {(item.price * exchangeRates).toFixed(2)} x {item.quantity})
              </Typography>
              <Typography fontSize={"15px"}>
                {currencySymbol}{" "}
                {(item.price * item.quantity * exchangeRates).toFixed(2)}
              </Typography>

              <Grid
  container
  mt={{ xs: 1, md: 0, lg: 0 }} // Adjust margin top for different screen sizes
  // justifyContent="space-between"

  margin={'0 '}
  alignItems="center"
>
  <Grid item>
    <Box
      sx={{
        backgroundColor: "#ccc", 
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        cursor: "pointer",
        
      }}
      onClick={(e) =>
        decreaseCartItem(item.id, item.variation._id, item.quantity, e)
      }
    >
      <RemoveOutlinedIcon fontSize="small" />
    </Box>
  </Grid>
  <Grid item  margin={'0 10px'}>
    <Typography variant="body1">{item.quantity}</Typography>
  </Grid>
  <Grid item>
    <Box
      sx={{
        backgroundColor: "#ccc", // Example background color
        borderRadius: "50%", // Makes it round
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        cursor: "pointer",
      }}
      onClick={(e) => increaseCartItem(item.id, item.variation?._id, e)}
    >
      <AddOutlinedIcon fontSize="small" />
    </Box>
  </Grid>
  <Grid item>
    <Box
      display="flex"
      alignItems="center"
     
      ml={{ xs: 1, md: 2, lg: 8 }} // Adjust margin left for different screen sizes
      onClick={(e) =>
        handleRemoveFromCart(item.id, item.variation?._id, e)
      }
    >
      <DeleteIcon fontSize="small" color="black" sx={{
       
      }} />
      <Typography variant="body2">Remove</Typography>
    </Box>
  </Grid>
</Grid>
            </Grid>
          </Grid>
        ))}
      </Box>

      {cartData.length === 0 && (
        <Container sx={{ textAlign: "center" }}>
          <img src={emptyCart} alt="Empty Cart" width={240} />
          <Typography variant="h4">Your Cart is Empty</Typography>
          <Button
            variant="contained"
            sx={{ my: 2 }}
            href="#shop"
            onClick={onClose}
          >
            Continue Shopping
          </Button>
        </Container>
      )}
      {cartData.length !== 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            background: "#fff",
            py: 2,
            width: 360,
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            my={2}
            p={1}
            border="2px solid black"
            borderRadius={2}
          >
            <Box display="flex" alignItems="center">
              <DiscountRoundedIcon />
              <Typography mx={2}>{couponCode.toUpperCase()}</Typography>
            </Box>
            <Button variant="outlined" color="black" size="small">
              Apply
            </Button>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={12} container justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "#818181de" }}>
                Subtotal
              </Typography>
              <Typography variant="body2">
                {currencySymbol}
                {(subtotal * exchangeRates).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "#818181de" }}>
                Discount
              </Typography>
              <Typography variant="body2"></Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} container justifyContent="space-between">
              <Typography variant="body1" fontWeight={600}>
                Final Price
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {currencySymbol}
                {(subtotal * exchangeRates).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="black"
            sx={{ color: "#fff", borderRadius: 2, mt: 2 }}
            fullWidth
            onClick={handleCheckout}
          >
            Checkout Now
          </Button>
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
              snackbarSeverity === "success"
                ? "#4CAF50"
                : snackbarSeverity === "error"
                ? "#F44336"
                : "#FF9800",
            color: "#fff",
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default Cart;
