import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Modal,
  TextField,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Checkout from "../user/checkout";
import Cart from "../user/cart";
import Login from "./login";
import Order from "../user/order";
import logo from "../image/logo (1).png";
import OrderDetails from "../user/orderDetails";
import EditProfile from "./editProfile";
import Wishlist from "../user/wishlist";
import { Logout } from "@mui/icons-material";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/auth/authSlice";
import ProductDetails from "../user/productDetails";
import Header from "../user/Header";
import { Image } from "../../../lib";

const pages = [
  { id: "#home", name: "HOME" },
  { id: "#shop", name: "SHOP" },
  { id: "#featured", name: "FEATURED" },
  { id: "#about", name: "ABOUT US" },
  { id: "#faq", name: "FAQ" },
];

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [checkoutDrawer, setCheckoutDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userDetails = useSelector((state) => state.auth.detail);
  const [wishlist, setWishlist] = useState(false);
  const [activePage, setActivePage] = useState("#home");
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const wishlistItemCount = useSelector((state) => state.wishlist.items.length);
  const drawerProduct = useSelector((state) => state.cart.selectedProduct);
  const [profilePicture, setProfilePicture] = useState(
    "/static/images/avatar/2.jpg"
  );
  const [details, setDetails] = useState(false);
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const toggleOrderDetailsDrawer = (newOpen) => () => {
    setDetails(newOpen);
    if (newOpen) setOpenOrder(false);
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleLoginModal = (newOpen) => () => setOpenLoginModal(newOpen);
  const handleClick = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);
  const toggleCartDrawer = (newOpen) => () => {
    setOpenCart(newOpen);
    if (newOpen) {
      setDetails(false);
      setOpenDetails(false);
    }
  };
  const toggleDetailsDrawer = (newOpen) => () => {
    setOpenDetails(newOpen);
    if (newOpen) setOpenCart(false);
  };
  const toggleWishlistDrawer = (newOpen) => () => setWishlist(newOpen);
  const toggleOrderDrawer = (newOpen) => () => setOpenOrder(newOpen);
  const toggleCheckoutDrawer = (newOpen) => () => {
    setCheckoutDrawer(newOpen);
    if (newOpen) setOpenCart(false);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(clearUser());
    showSnackbar("Logged out successfully.");
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      textAlign="right"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "25px",
        }}
      >
        <img src={logo} alt="Logo" width="70%" />
      </Box>
      <List>
        {pages.map((text, index) => (
          <ListItem key={`${text.id}-${index}`}>
            <ListItemButton href={text.id}>
              <ListItemText
                primary={text.name}
                onClick={() => setActivePage(text.id)}
                sx={{
                  color: activePage === text.id ? "#0084fe" : "#000",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
      </List>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button variant="contained" href="#contact">
          Let's talk
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "#fff",
          position: "fixed",
          bottom: 0,
          p: "20px 30px",
          width: { xs: 190, md: 250 },
          boxShadow: "0 0 10px gray",
        }}
      >
        <ArrowBackIosNewRoundedIcon
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
    </Box>
  );

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <div style={{ paddingTop: 56 }}>
      <AppBar position="fixed" sx={{ background: "#f4f4f4" }}>
        <Header />
        <Container>
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableGutters
          >
            {/* logo */}
            <Box sx={{ width: { xs: "40%", md: "20%" } }}>
              <a href="#home" onClick={() => setActivePage("#home")}>
                <img src={logo} alt="Logo" width="100%" />
              </a>
            </Box>

            {/* links */}
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pages.map((page, index) => (
                <Typography
                  component="a"
                  key={`${page.id}-${index}`}
                  onClick={() => setActivePage(page.id)}
                  sx={{
                    mx: { md: 2, lg: 4 },
                    color: activePage === page.id ? "#0084fe" : "#000",
                    fontSize: "15px",
                    textDecoration: "none",
                    behavior: "smooth",
                  }}
                  color="khaki"
                  href={page.id}
                >
                  {page.name}
                </Typography>
              ))}
            </Box>

            {/* let's talk , cart and avatar*/}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                href="#contact"
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                Let's talk
              </Button>
              <Badge
                badgeContent={cartItemCount}
                color="primary"
                sx={{ mx: 3 }}
              >
                <Box
                  sx={{
                    width: 35,
                    height: 35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "50%",
                  }}
                  onClick={toggleCartDrawer(true)}
                >
                  <ShoppingBagOutlinedIcon
                    color="black"
                    sx={{ cursor: "pointer" }}
                  />
                </Box>
              </Badge>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  onClick={isLoggedIn ? handleClick : handleLoginModal(true)}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt="Profile Picture"
                    src={Image(userDetails.profile)}
                    sx={{ width: 35, height: 35 }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="open drawer"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer(true)}
                  color="black"
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
              </Box>
            </Box>

            {/* checkout drawer */}
            <Drawer
              anchor="right"
              open={checkoutDrawer}
              onClose={toggleCheckoutDrawer(false)}
            >
              <Checkout onClose={toggleCheckoutDrawer(false)} />
            </Drawer>

            {/* cart drawer */}
            <Drawer
              anchor="right"
              open={openCart}
              onClose={toggleCartDrawer(false)}
            >
              <Cart
                onClose={toggleCartDrawer(false)}
                onClick={toggleCheckoutDrawer(true)}
                openProduct={toggleDetailsDrawer(true)}
              />
            </Drawer>

            {/* order drawer */}
            <Drawer
              anchor="right"
              open={openOrder}
              onClose={toggleOrderDrawer(false)}
            >
              <Order
                onClose={toggleOrderDrawer(false)}
                orderDetails={toggleOrderDetailsDrawer(true)}
              />
            </Drawer>

            <Drawer
              anchor="right"
              open={openDetails}
              onClose={toggleDetailsDrawer(false)}
            >
              <ProductDetails
                onClose={toggleDetailsDrawer(false)}
                product={drawerProduct}
                cartDrawer={
                  <Badge badgeContent={cartItemCount} color="primary">
                    <Box
                      sx={{
                        width: 35,
                        height: 35,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        borderRadius: "50%",
                      }}
                      onClick={toggleCartDrawer(true)}
                    >
                      <ShoppingBagOutlinedIcon color="black" />
                    </Box>
                  </Badge>
                }
              />
            </Drawer>

            {/* wishlist drawer */}
            <Drawer
              anchor="right"
              open={wishlist}
              onClose={toggleWishlistDrawer(false)}
            >
              <Wishlist onClose={toggleWishlistDrawer(false)} />
            </Drawer>

            {/* edit profile modal */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <EditProfile onClose={handleCloseModal} />
            </Modal>

            <Modal
              open={openLoginModal}
              onClose={handleLoginModal(false)}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Login
                onClose={handleLoginModal(false)}
                onLogin={() => setIsLoggedIn(true)}
              />
            </Modal>

            {/* user menu */}
            <Menu
              anchorEl={anchorElUser}
              id="account-menu"
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  padding: "15px",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                data-item="Name"
                sx={{ fontSize: "10px" }}
              >
                {userDetails.name}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleOpenModal} data-item="Profile">
                Profile
              </MenuItem>
              <MenuItem
                onClick={toggleWishlistDrawer(true)}
                data-item="Wishlist"
              >
                wishlist{" "}
                {wishlistItemCount > 0 && (
                  <Badge
                    badgeContent={wishlistItemCount > 0 && wishlistItemCount}
                    color="primary"
                    sx={{ ml: 2 }}
                  />
                )}
              </MenuItem>
              <MenuItem onClick={toggleOrderDrawer(true)} data-item="Orders">
                Orders
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} data-item="Logout">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Snackbar for logout message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{ backgroundColor: "#4caf50" }}
        />
      </Snackbar>
    </div>
  );
};

export default Navbar;
