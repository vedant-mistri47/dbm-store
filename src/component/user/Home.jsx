import {
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  Snackbar,
  CircularProgress,
  SnackbarContent
} from "@mui/material";
import React, { useEffect, useState } from "react";
import image1 from "../image/img1.png";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ImageIcon from "@mui/icons-material/Image";
import "../../index.css";
import { useTheme } from "@mui/system";
import bulkimg from "../image/image 2.svg";
import wew1 from "../image/Vectorhome 1 copy.svg";
import wew2 from "../image/Vectorhome 2.svg";
import star1 from "../image/Starhome 1.svg";
import star2 from "../image/Starhome 2.svg";
import bulkimgPdf from "../image/image 3.svg";
import bulkimgaudio from "../image/image 4.svg";
import MailIcon from "@mui/icons-material/Mail";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import ReportIcon from "@mui/icons-material/Report";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SpeakerIcon from "@mui/icons-material/Speaker";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PhoneInput from "react-phone-input-2";
import country from '../../countryList.json'
import "react-phone-input-2/lib/style.css";
import axiosInstance from "../../util/axiosInstance";
import CloseIcon from '@mui/icons-material/Close';
import countrys from '../../countryList.json'
import 'react-phone-input-2/lib/style.css';
const Home = () => {
  // console.log(countrys.map(i => i.countryNameEn));
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    number: "",
    email: "",
    product: "",
  });
  const [products, setProducts] = useState(null);
  // const [error, setError] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, number: value });
    // Check if the entered value has reached 10 digits to hide validation
    if (value.replace(/\D/g, '').length === 10) {
      setShowValidation(false); // Hide validation error
    }
  };
  const handleBlur = () => {
    // Show validation if number is empty
    if (!formValues.number.trim()) {
      setShowValidation(true);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const isValidName = (name) => {
    // Regex to match only alphabetic characters
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
  }
  useEffect(() => {
    if (showValidation) {
      setTimeout(() => setShowValidation(false), 20000);
    }
  }, [showValidation]);
  const handleSubmit = async () => {
    if (formValues.name !== '' && isValidName(formValues.name) && formValues.number !== '' && formValues.email !== '' && isValidEmail(formValues.email) && formValues.product !== '') {
      const requestData = {
        product_id: selectedProduct,
        name: formValues.name,
        phone: formValues.number,
        email: formValues.email,
      };
      console.log("Form values:", requestData);
      setLoading(true);
      try {
        const response = await axiosInstance.post("license/get-trial", requestData);
        console.log("API response:", response.data);
        handleClose(); 
        setSnackbarMessage("Key send successful");
      } catch (error) {
        console.error("API error:", error);
        setSnackbarMessage("Key send failed");
      } finally {
        setLoading(false);
        setSnackbarOpen(true);
      }
    } else {
      setShowValidation(true);
    }
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? "90%" : 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflowY: "auto",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const data = response.data;
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

return (
    <div>
      <Box sx={{ backgroundColor: "#f4f4f4" }}>
        <Container sx={{ mt: 15 }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                position: "relative",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="title"
                component="div"
                sx={{ fontWeight: "800", mb: 2 }}
              >
                <Box
                  component="span"
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    display: "inline-block",
                    backgroundColor: "#0084FE",
                    p: 1,
                    fontSize: { xs: "28px", sm: "30px", md: "48px" },
                    borderRadius: 2,
                    transform: "rotate(-8deg)",
                    position: { xs: "relative", md: "absolute" },
                    top: { xs: "30px", sm: "34px", md: "-24px" },
                    left: { xs: "-3px", sm: "-40px", md: "28px" },
                    mb: { xs: 2, md: 0 },
                  }}
                >
                  #1 Bulk
                </Box>
              </Typography>
              <Box sx={{ fontSize: "fontSize" }}>
                <Typography
                  variant="title"
                  component="div"
                  sx={{ fontWeight: "600", mb: 2 }}
                >
                  WhatsApp
                </Typography>

                <Typography
                  variant="title"
                  component="div"
                  sx={{ fontWeight: "600", mb: 2 }}
                >
                  Marketing Tool &
                </Typography>
                <Typography
                  variant="title"
                  component="div"
                  sx={{ fontWeight: "600", mb: 2 }}
                >
                  More
                </Typography>
              </Box>
              <Typography variant="body" align="justify" display={"flex"}>
                Unlock the full potential of the world's most popular messaging
                platform with our premium features, including bulk messaging,
                chatbot support, autoresponders, and much more!
              </Typography>
              <Button
                sx={{
                  backgroundColor: "#0084FE",
                  color: "white",
                  marginTop: "20px",
                }}
                variant="contained"
                onClick={handleOpen}
              >
                Try Now
              </Button>

              <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="try-now-modal-title"
  aria-describedby="try-now-modal-description"
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}

>
  <Box

    sx={{
      width: { md: '30%', sm: '50%', xs: '60%' },
      maxWidth: 350,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 4,

    }}

  >
    <Box display={'flex'} justifyContent={'space-between'}>

      <Typography
        id="try-now-modal-title"
        variant="h6"
        component="h2"
      >
        Try Now
      </Typography>
      <Box onClick={handleClose} sx={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>
        <CloseIcon />
      </Box>
      {/* <CloseIcon/> */}
    </Box>
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mt: 2 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            size="small"
            fullWidth
            value={formValues.name}
            onChange={handleInputChange}
            sx={{ fontSize: "1.25rem" }}
            error={
              (formValues.name === "" || !isValidName(formValues.name)) &&
              showValidation
            }
            helperText={
              (formValues.name === "" || !isValidName(formValues.name)) &&
                showValidation ? (
                <Typography variant="p">{"Name is required"}</Typography>
              ) : (

                ""
              )}
          />
        </Grid>
        <Grid item xs={12}>
          <PhoneInput
            inputStyle={{
              width: "100%",
              height: "44px",
              fontSize: "1.25rem",
              borderColor: showValidation && !formValues.number.trim() ? 'red' : '#ced4da',

            }}
            margin="dense"
            size="small"
            name="number"
            country={"in"}
            required
            value={formValues.number}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
          />

          {showValidation && !formValues.number.trim() && (
            <Typography variant="caption" color="error">
              Phone Number is required
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            size="small"
            fullWidth
            value={formValues.email}
            onChange={handleInputChange}
            sx={{ fontSize: "1.25rem" }}
            error={
              (formValues.email === "" || !isValidEmail(formValues.email)) &&
              showValidation
            }
            helperText={
              (formValues.email === "" || !isValidEmail(formValues.email)) &&
                showValidation ? (
                <Typography variant="p">{"Valid email is required"}</Typography>
              ) : (

                ""
              )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField

            margin="dense"
            name="product"
            label="Select Product"
            select
            size="small"
            fullWidth
            value={formValues.product}
            onChange={handleInputChange}
            error={formValues.product == "" && showValidation}
            helperText={
              formValues.product == "" && showValidation ? (
                <Typography variant="p">{"Product is required"}</Typography>
              ) : (
                ""
              )
            }
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    overflow: "auto",
                  },
                },
              },
            }}
            sx={{ fontSize: "1.25rem" }}
          >
            {products?.map((product) => (
              <MenuItem key={product.id} value={product.name} onClick={() => setSelectedProduct(product?.id)} >
                <Box display="flex" alignItems="center" >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "30px",
                      height: "35px",
                      marginRight: "10px",
                      objectFit: "cover",
                    }}
                  />
                  <span>{product.name}</span>
                </Box>
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
        </Grid>
      </Grid>
    </Box>
    <Box
      sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
    >

      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#0084FE",
          color: "white",
          marginTop: "12px",
          ml: 2
        }}
        type="button"
        variant="contained"
        disabled={loading} 
      >
        {loading ? <CircularProgress size={24} /> : "Get Key"}
      </Button>
    </Box>
  </Box>
</Modal>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "fit-content",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={image1}
                  alt="Marketing Team"
                  sx={{
                    width: { xs: "250px", md: "450px" },
                    borderRadius: 2,
                    transform: "rotate(0deg)",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: "12px", md: "58px" },
                    left: { xs: "-15px", md: "40px" },
                    mt: { xs: -5, md: -4 },
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    color="white"
                    sx={{

                      backgroundColor: "#fff",
                      color: "black",
                      marginBottom: "15px",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      borderRadius: "8px",
                      boxShadow: "0.5px 0.5px 5.5px",
                      transform: {
                        xs: "rotate(-5deg)",
                        md: "translateX(-50%) rotate(-5deg)",
                      },
                      width: { xs: "80px", md: "115px" },
                      height: { xs: "30px", md: "40px" },
                      fontSize: { xs: "10px", md: "20px" },
                    }}
                  >
                    <Typography variant="body1">

                      Easy use
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#0084FE",
                      color: "#fff",
                      marginBottom: "15px",
                      zIndex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      borderRadius: "8px",
                      transform: {
                        xs: "rotate(5deg)",
                        md: "translateX(-50%) rotate(5deg)",
                      },
                      width: { xs: "70px", md: "115px" },
                      height: { xs: "30px", md: "40px" },
                      fontSize: { xs: "10px", md: "20px" },
                    }}
                  >
                    <Typography variant="body1" >

                      Powerful
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>


            <Grid>
<Grid item margin={"50px 0"}>
  <Typography
    textAlign={"center"}
    margin={"10px"}
    fontWeight={600}
    sx={{
      position: "relative",
      fontSize: {
        xs: theme.typography.title.fontSize,
        sm: theme.typography.title["@media (min-width:600px)"]
          .fontSize,
        md: theme.typography.title["@media (min-width:600px)"]
          .fontSize,
      },
    }}
  >
    Why
    <Box
      component="span"
      sx={{
        color: theme.palette.primary.main, // Use the primary color from the theme
        mx: 1,
      }}
    >
      Bulk
    </Box>
    WhatsApp?
  </Typography>

  <Typography
    sx={{
      position: "relative",
      fontSize: { xs: "12px", sm: "25px", md: "30px" },
    }}
    textAlign={"center"}
    lineHeight={"35px"}
    color={"#9A9A9A"}
  >
    Bulk WhatsApp Sender Supports Multiple Formats
  </Typography>
</Grid>

<Grid>
  <Box
    sx={{
      typography: "body1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    }}
  >
    <TabContext value={value}>
      <Box
        sx={{
          borderColor: "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <TabList
          onChange={handleChange}
          aria-label="responsive tabs example"
          variant="fullWidth"
          sx={{
            width: "100%",
            "& .MuiTab-root": {
              color: "black",
              flex: 1,
            },
          }}
        >
          <Tab label="IMAGE" value="1" sx={{ fontSize: "18px" }} />
          <Tab label="PDF" value="2" sx={{ fontSize: "18px" }} />
          <Tab label="AUDIO" value="3" sx={{ fontSize: "18px" }} />
        </TabList>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
        <TabPanel value="1">
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              p: 2,
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 0px 10px lightgray",
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: 200,
                height: 200,
                mb: isSmallScreen ? 1 : 0,
                mr: isSmallScreen ? 0 : 1,
              }}
            >
              <img src={bulkimg} alt="" />
            </Box>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="h6"
                component="div"
                fontSize={"30px"}
                fontWeight={600}
                sx={{ mb: 1, textAlign: "left" }}
              >
                Image
              </Typography>
              <Typography
                variant="body"
                color="#000"
                align="justify"
                display={"flex"}
              >
                Software supports multiple images along with
                captions for each image which can be sent to all the
                imported numbers with a click of a single button.
              </Typography>
            </CardContent>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            padding="20px"
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none" /* IE and Edge */,
              "scrollbar-width": "none" /* Firefox */,
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                flexWrap: "nowrap",
                gap: "43px",
                "@media (max-width: 900px)": {
                  flexWrap: "wrap",
                  justifyContent: "center",
                },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
                color={""}
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <MailIcon fontSize="large" />
                </Box>

                <Typography variant="body1">
                  Send Customized Messages
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <ImportContactsIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Import Contacts
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <PersonAddIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Send Without Saving Contact
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <AccountCircleIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Multi Account
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <ChatIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Create Multiple Variations
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <ReportIcon fontSize="large" />
                </Box>
                <Typography variant="body1">Get Report</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="200px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <MailIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Scheduling message
                </Typography>
              </Box>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              p: 2,
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                boxShadow: "0px 0px 10px lightgray",
                backgroundColor: "#fff",
                width: 200,
                height: 200,
                mb: isSmallScreen ? 2 : 0,
                mr: isSmallScreen ? 0 : 2,
              }}
            >
              <img src={bulkimgPdf} alt="" />
            </Box>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="h6"
                component="div"
                fontSize={"30px"}
                fontWeight={600}
                sx={{ mb: 1, textAlign: "left" }}
              >
                PDF
              </Typography>
              <Typography
                variant="body"
                color="#000"
                align="justify"
                display={"flex"}
              >
                Bulkwhatsapp is great tool for sharing PDF to
                multiple user.It is the best way to express the
                thought with an unlimited number of character.
              </Typography>
            </CardContent>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            padding="20px"
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none" /* IE and Edge */,
              "scrollbar-width": "none" /* Firefox */,
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                flexWrap: "nowrap",
                gap: "43px",
                "@media (max-width: 900px)": {
                  flexWrap: "wrap",
                  justifyContent: "center",
                },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
                
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <LaptopWindowsIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Send Customized Messages
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <PhoneAndroidOutlinedIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Import Contacts
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <CameraAltIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Send Without Saving Contact
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <LiveTvIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Multi Account
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <CreditCardIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Create Multiple Variations
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <SpeakerIcon fontSize="large" />
                </Box>
                <Typography variant="body1">Get Report</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="200px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <SportsEsportsIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Scheduling message
                </Typography>
              </Box>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="3">
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              p: 2,
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                backgroundColor: "#fff",
                boxShadow: "0px 0px 10px lightgray",
                width: 200,
                height: 200,
                mb: isSmallScreen ? 2 : 0,
                mr: isSmallScreen ? 0 : 2,
              }}
            >
              <img src={bulkimgaudio} alt="" />
            </Box>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant="h6"
                component="div"
                fontSize={"30px"}
                fontWeight={600}
                sx={{ mb: 1, textAlign: "left" }}
              >
                AUDIO
              </Typography>
              <Typography
                variant="body"
                color="#000"
                align="justify"
                display={"flex"}
              >
                It not only supports the text but also various media
                files.WhatsApp Marketing through Audios on mobile is
                very important for every sector now a days.
              </Typography>
            </CardContent>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            padding="20px"
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none" /* IE and Edge */,
              "scrollbar-width": "none" /* Firefox */,
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="baseline"
              sx={{
                flexWrap: "nowrap",
                gap: "43px",
                "@media (max-width: 900px)": {
                  flexWrap: "wrap",
                  justifyContent: "center",
                },
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <LaptopWindowsIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Send Customized Messages
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <PhoneAndroidOutlinedIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Import Contacts
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <CameraAltIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Send Without Saving Contact
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <LiveTvIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Multi Account
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <CreditCardIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Create Multiple Variations
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="120px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <SpeakerIcon fontSize="large" />
                </Box>
                <Typography variant="body1">Get Report</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                minWidth="200px"
                minHeight="100px"
              >
                <Box
                  borderRadius={"50px"}
                  width={"75px"}
                  height={"75px"}
                  sx={{
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <SportsEsportsIcon fontSize="large" />
                </Box>
                <Typography variant="body1">
                  Scheduling message
                </Typography>
              </Box>
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </TabContext>
  </Box>
</Grid>
</Grid>

<Snackbar
 open={snackbarOpen}
 autoHideDuration={6000}
 onClose={handleSnackbarClose}
 message={snackbarMessage}
 anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
 
>
<SnackbarContent
          message={snackbarMessage}
          sx={{ backgroundColor: "#4caf50", color: "#fff" }} // Success green color
        />
</Snackbar>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;

