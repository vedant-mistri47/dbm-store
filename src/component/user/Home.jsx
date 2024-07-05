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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import image1 from "../image/img1.png";
import Tab from "@mui/material/Tab";
import Snackbar from "@mui/material/Snackbar"; // Import Snackbar
import MuiAlert from "@mui/material/Alert"; // Import Alert for the Snackbar
import TabContext from "@mui/lab/TabContext";
import CircularProgress from "@mui/material/CircularProgress";
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
    if (
      formValues.name !== '' &&
      isValidName(formValues.name) &&
      formValues.number !== '' &&
      formValues.email !== '' &&
      isValidEmail(formValues.email) &&
      formValues.product !== ''
    ) {
      const requestData = {
        product_id: selectedProduct,
        name: formValues.name,
        phone: formValues.number,
        email: formValues.email,
      };

      console.log("Form values:", requestData);

      setLoading(true); // Start loading

      try {
        const response = await axiosInstance.post("license/get-trial", requestData);
        console.log("API response:", response.data);
        handleClose();
        setSnackbarMessage("Request successful");
      } catch (error) {
        console.error("API error:", error);
        setSnackbarMessage("Request failed");
      } finally {
        setLoading(false); // End loading
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
                onClick={handleOpen}
                variant="contained"
              >
                <Typography color={'#fff'}>
                TRY NOW
                  </Typography>
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <img
                src={image1}
                alt="Image"
                style={{
                  width: "80%",
                  marginLeft: "20px",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

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
                      type="button" // Use "button" type to avoid form submission default
                      variant="contained"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? <CircularProgress size={24} /> : "Get Key"}
                    </Button>
                  </Box>
                </Box>
              </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        action={
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            <CloseIcon />
          </Button>
        }
      />
    </div>
  );
};

export default Home;
