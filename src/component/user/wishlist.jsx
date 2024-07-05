import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Grid,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { removeFromWishlist } from "../../redux/wishlist/wishlistSlice";
import { CURRENCIES_SYMBOL } from "../currency/currency";

const Wishlist = ({ onClose }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const currencySymbol = CURRENCIES_SYMBOL[currency];
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (index) => {
    const itemName = wishlistItems[index].product?.name;
    dispatch(removeFromWishlist(index));
    setSnackbarMessage(`${itemName} removed from wishlist`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: { xs: 250, md: 350 }, p: 3 }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={3}>
        <NavigateBeforeRoundedIcon
          fontSize="large"
          cursor="pointer"
          onClick={onClose}
        />
        <Typography fontWeight={600}>Wishlist</Typography>
      </Grid>
      {wishlistItems?.map((item, index) => (
        <Grid
          key={index}
          container
          sx={{ borderRadius: "15px",position: "relative" }}
          p={0.5}
          my={2}
          boxShadow="0 0 10px #eee"
          alignItems="center"
        >
          <Grid
            item
            xs={3}
            md={3}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <img
              width={60}
              height={60}
              src={item.product?.image}
              alt="Product"
            />
          </Grid>
          <Grid item xs={9} md={7} container direction="column">
            <Grid display={"flex"}>
              <Typography variant="body1">{item.product?.name}</Typography>

              <Checkbox
                onChange={() => handleRemoveFromWishlist(index)}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={item.isInWishlist}
                sx={{ position: "absolute" , top: {xs : "50%" , md: 6 } , right: 3 }}
              />
            </Grid>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid container item xs={6} justifyContent="space-between">
                {/* <Typography variant="body2" sx={{ color: "#818181de" }}>
                  Price
                </Typography> */}
                <Typography variant="body2">
                  ₹
                  {item.product?.rates.reduce(
                    (min, rate) => Math.min(min, rate.price),
                    Infinity
                  )}{" "}
                  - ₹
                  {item.product?.rates.reduce(
                    (max, rate) => Math.max(max, rate.price),
                    -Infinity
                  )}
                </Typography>
              </Grid>
              {/* <Grid item xs={1} mb={1}>
                                <Checkbox
                                    onChange={() => handleRemoveFromWishlist(index)}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    checked={item.isInWishlist}
                                />
                            </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      >
        <SnackbarContent
          message={snackbarMessage}
          sx={{ backgroundColor: "#4caf50", color: "#fff" }}
        />
      </Snackbar>
    </Box>
  );
};

export default Wishlist;
