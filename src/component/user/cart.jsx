// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Typography,
//   Divider,
//   Snackbar,
//   SnackbarContent,
//   CircularProgress,
// } from "@mui/material";
// import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
// import CloseIcon from "@mui/icons-material/Close";
// import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";
// import emptyCart from "../image/emptyCart.png";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
//   cartProduct,
// } from "../../redux/cart/cartSlice";
// import { setProductDetails } from "../../redux/payment/paymentSlice";
// import { CURRENCIES_SYMBOL } from "../currency/currency";

// const Cart = ({ onClose, onClick, openProduct , openLogin }) => {
//   const cartData = useSelector((state) => state.cart.items);
//   const subtotal = useSelector((state) => state.cart.subtotal);
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const { currency, exchangeRates } = useSelector((state) => state.currency);
//   const currencySymbol = CURRENCIES_SYMBOL[currency];
//   const dispatch = useDispatch();
//   const couponCode = "a5623d";
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [loading, setLoading] = useState({});

//   const handleRemoveFromCart = (id, variationId, e) => {
//     e.stopPropagation();
//     dispatch(removeFromCart({ id, variationId }));
//     setSnackbarMessage("Item removed from cart");
//     setSnackbarSeverity("success");
//     setSnackbarOpen(true);
//   };

//   const handleOpenProduct = (product, variation, e) => {
//     e.stopPropagation();
//     openProduct();
//     dispatch(cartProduct({ product, variation }));
//   };

//   const increaseCartItem = (id,index, variationId, e) => {
//     e.stopPropagation();
//     setLoading((prev) => ({ ...prev, [index]: true }));
//     setTimeout(() => {
//       dispatch(increaseQuantity({ id, variationId }));
//       setSnackbarMessage("Quantity increased");
//       setSnackbarSeverity("success");
//       setSnackbarOpen(true);
//       setLoading((prev) => ({ ...prev, [index]: false }));
//     }, 1000); 
//   };

//   const decreaseCartItem = (id,index, variationId, quantity, e) => {
//     e.stopPropagation();
//     setLoading((prev) => ({ ...prev, [index]: true }));
//     setTimeout(() => {
//       if (quantity > 1) {
//         dispatch(decreaseQuantity({ id, variationId }));
//         setSnackbarMessage("Quantity decreased");
//         setSnackbarSeverity("success");
//       } else {
//         dispatch(removeFromCart({ id, variationId }));
//         setSnackbarMessage("Item removed from cart");
//         setSnackbarSeverity("success");
//       }
//       setSnackbarOpen(true);
//       setLoading((prev) => ({ ...prev, [index]: false }));
//     }, 1000); 
//   };

//   const handleCheckout = () => {
//     dispatch(
//       setProductDetails(
//         cartData.map((item) => ({
//           product_id: item.product.id,
//           variation_id: item.variation._id,
//           quantity: item.quantity,
//         }))
//       )
//     );
//     onClick();
//   };

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

//   return (
//     <Box sx={{ width: { xs: 300, sm: 350, md: 400 }, p: 2, position: "relative" }}>
//       <Grid
//         container
//         alignItems="center"
//         justifyContent="space-between"
//         mb={2}
//         sx={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "#fff" }}
//       >
//         <NavigateBeforeRoundedIcon
//           fontSize="large"
//           cursor="pointer"
//           onClick={onClose}
//         />
//         <Typography variant="h6" fontWeight={600}>
//           Shopping Cart
//         </Typography>
//         <Typography fontWeight={600}>({cartData.length} item)</Typography>
//       </Grid>
//       <Divider />
//       <Box sx={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
//         {cartData.map((item, index) => (
//           <Grid
//             key={index}
//             container
//             alignItems="center"
//             spacing={1}
//             sx={{
//               borderRadius: "15px",
//               cursor: "pointer",
//               boxShadow: "0 0 10px #eee",
//               p: 1,
//               my: 1,
//             }}
//             onClick={(e) => handleOpenProduct(item.product, item.variation, e)}
//           >
//             <Grid item xs={2} container direction="column" alignItems="center">
              
//                   <Box
//                     sx={{
//                       backgroundColor: "#ccc",
//                       borderRadius: "50%",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       width: 24,
//                       height: 24,
//                       cursor: "pointer",
//                       mb: 0.5,
//                     }}
//                     onClick={(e) =>
//                       increaseCartItem(item.id,index, item.variation?._id, e)
//                     }
//                   >
//                     <AddOutlinedIcon fontSize="small" />
//                   </Box>
//                   {loading[index] ? (
//                 <CircularProgress size={20} />
//               ) : (
//                   <>
//                   <Typography variant="body1">{item.quantity}</Typography>

//                   </>
//               )}
//                   <Box
//                     sx={{
//                       backgroundColor: "#ccc",
//                       borderRadius: "50%",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       width: 24,
//                       height: 24,
//                       cursor: "pointer",
//                     }}
//                     onClick={(e) =>
//                       decreaseCartItem(item.id,index, item.variation._id, item.quantity, e)
//                     }
//                   >
//                     <RemoveOutlinedIcon fontSize="small" />
//                   </Box>
           
//             </Grid>
//             <Grid item xs={1} container justifyContent="center">
//               <img width={60} height={60} src={item.image} alt="Product" />
//             </Grid>
//             <Grid item xs={8} container direction="column" margin={'0 10px'}>
//               <Grid display={'flex'} justifyContent={'space-between'}>
//                 <Typography variant="body2">
//                   {item.name} ({item.variation?.title})
//                 </Typography>
//                 <Grid item xs={1} container justifyContent="center">
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       width: 24,
//                       height: 24,
//                       cursor: "pointer",
//                     }}
//                     onClick={(e) =>
//                       handleRemoveFromCart(item.id, item.variation?._id, e)
//                     }
//                   >
//                     <CloseIcon fontSize="small" />
//                   </Box>
//                 </Grid>
//               </Grid>
//               <Typography variant="body2" fontSize={"10px"}>
//                 ({currencySymbol}
//                 {(item.price * exchangeRates).toFixed(2)} x {item.quantity})
//               </Typography>
//               <Typography fontSize={"15px"}>
//                 {currencySymbol}{" "}
//                 {(item.price * item.quantity * exchangeRates).toFixed(2)}
//               </Typography>
//             </Grid>
//           </Grid>
//         ))}
//       </Box>

//       {cartData.length === 0 && (
//         <Container sx={{ textAlign: "center" }}>
//           <img src={emptyCart} alt="Empty Cart" width={240} />
//           <Typography variant="h4">Your Cart is Empty</Typography>
//           <Button
//             variant="contained"
//             sx={{ my: 2 }}
//             href="#shop"
//             onClick={onClose}
//           >
//             Continue Shopping
//           </Button>
//         </Container>
//       )}
//       {cartData.length !== 0 && (
//         <Box
//           sx={{
//             position: "fixed",
//             bottom: 0,
//             background: "#fff",
//             py: 2,
//             width: { xs: 300, sm: 350, md: 400 },
//           }}
//         >
//           <Grid
//             container
//             justifyContent="space-between"
//             alignItems="center"
//             my={2}
//             p={1}
//             border="2px solid black"
//             borderRadius={2}
//           >
//             <Box display="flex" alignItems="center">
//               <DiscountRoundedIcon />
//               <Typography mx={2}>{couponCode.toUpperCase()}</Typography>
//             </Box>
//             <Button variant="outlined" color="black" size="small">
//               Apply
//             </Button>
//           </Grid>
//           <Grid container alignItems="center">
//             <Grid item xs={12} container justifyContent="space-between">
//               <Typography variant="body2" sx={{ color: "#818181de" }}>
//                 Subtotal
//               </Typography>
//               <Typography variant="body2">
//                 {currencySymbol}
//                 {(subtotal * exchangeRates).toFixed(2)}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} container justifyContent="space-between">
//               <Typography variant="body2" sx={{ color: "#818181de" }}>
//                 Discount
//               </Typography>
//               <Typography variant="body2"></Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Divider />
//             </Grid>
//             <Grid item xs={12} container justifyContent="space-between">
//               <Typography variant="body1" fontWeight={600}>
//                 Final Price
//               </Typography>
//               <Typography variant="body1" fontWeight={600}>
//                 {currencySymbol}
//                 {(subtotal * exchangeRates).toFixed(2)}
//               </Typography>
//             </Grid>
//           </Grid>
//           <Button
//             variant="contained"
//             color="black"
//             sx={{ color: "#fff", borderRadius: 2, mt: 2 }}
//             fullWidth
//             onClick={isLoggedIn ? handleCheckout : openLogin}
//           >
//             Checkout Now
//           </Button>
//         </Box>
//       )}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <SnackbarContent
//           message={snackbarMessage}
//           sx={{
//             backgroundColor:
//               snackbarSeverity === "success"
//                 ? "#4CAF50"
//                 : snackbarSeverity === "error"
//                 ? "#F44336"
//                 : "#FF9800",
//             color: "#fff",
//           }}
//         />
//       </Snackbar>
//     </Box>
//   );
// };

// export default Cart;

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import CloseIcon from "@mui/icons-material/Close";
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
import { useSnackbar } from 'notistack'; // Import useSnackbar from notistack

const Cart = ({ onClose, onClick, openProduct, openLogin }) => {
  const cartData = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const currencySymbol = CURRENCIES_SYMBOL[currency];
  const dispatch = useDispatch();
  const couponCode = "a5623d";
  const { enqueueSnackbar } = useSnackbar(); // useSnackbar hook
  const [loading, setLoading] = useState({});

  const handleRemoveFromCart = (id, variationId, e) => {
    e.stopPropagation();
    dispatch(removeFromCart({ id, variationId }));
    enqueueSnackbar("Item removed from cart", { variant: "success" });
  };

  const handleOpenProduct = (product, variation, e) => {
    e.stopPropagation();
    openProduct();
    dispatch(cartProduct({ product, variation }));
  };

  const increaseCartItem = (id, index, variationId, e) => {
    e.stopPropagation();
    setLoading((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      dispatch(increaseQuantity({ id, variationId }));
      enqueueSnackbar("Quantity increased", { variant: "success" });
      setLoading((prev) => ({ ...prev, [index]: false }));
    }, 1000);
  };

  const decreaseCartItem = (id, index, variationId, quantity, e) => {
    e.stopPropagation();
    setLoading((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      if (quantity > 1) {
        dispatch(decreaseQuantity({ id, variationId }));
        enqueueSnackbar("Quantity decreased", { variant: "success" });
      } else {
        dispatch(removeFromCart({ id, variationId }));
        enqueueSnackbar("Item removed from cart", { variant: "success" });
      }
      setLoading((prev) => ({ ...prev, [index]: false }));
    }, 1000);
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

  return (
    <Box sx={{ width: { xs: 300, sm: 350, md: 400 }, p: 2, position: "relative" }}>
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
            spacing={1}
            sx={{
              borderRadius: "15px",
              cursor: "pointer",
              boxShadow: "0 0 10px #eee",
              p: 1,
              my: 1,
            }}
            onClick={(e) => handleOpenProduct(item.product, item.variation, e)}
          >
            <Grid item xs={2} container direction="column" alignItems="center">
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
                  mb: 0.5,
                }}
                onClick={(e) =>
                  increaseCartItem(item.id, index, item.variation?._id, e)
                }
              >
                <AddOutlinedIcon fontSize="small" />
              </Box>
              {loading[index] ? (
                <CircularProgress size={20} />
              ) : (
                <Typography variant="body1">{item.quantity}</Typography>
              )}
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
                  decreaseCartItem(
                    item.id,
                    index,
                    item.variation._id,
                    item.quantity,
                    e
                  )
                }
              >
                <RemoveOutlinedIcon fontSize="small" />
              </Box>
            </Grid>
            <Grid item xs={1} container justifyContent="center">
              <img width={60} height={60} src={item.image} alt="Product" />
            </Grid>
            <Grid item xs={8} container direction="column" margin={"0 10px"}>
              <Grid display={"flex"} justifyContent={"space-between"}>
                <Typography variant="body2">
                  {item.name} ({item.variation?.title})
                </Typography>
                <Grid item xs={1} container justifyContent="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                    }}
                    onClick={(e) =>
                      handleRemoveFromCart(item.id, item.variation?._id, e)
                    }
                  >
                    <CloseIcon fontSize="small" />
                  </Box>
                </Grid>
              </Grid>
              <Typography variant="body2" fontSize={"10px"}>
                ({currencySymbol}
                {(item.price * exchangeRates).toFixed(2)} x {item.quantity})
              </Typography>
              <Typography fontSize={"15px"}>
                {currencySymbol}{" "}
                {(item.price * item.quantity * exchangeRates).toFixed(2)}
              </Typography>
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
            width: { xs: 300, sm: 350, md: 400 },
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
            onClick={isLoggedIn ? handleCheckout : openLogin}
          >
            Checkout Now
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
