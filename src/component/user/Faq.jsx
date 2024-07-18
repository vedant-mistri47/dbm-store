import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, Controller } from "react-hook-form";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import contactFormImg from "/image/ContactForm.png";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import axiosInstance from "../../util/axiosInstance";

const CustomLeftArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      backgroundColor: "#0084FE",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: "30px",
      zIndex: 1,
      cursor: "pointer",
    }}
  >
    <KeyboardArrowLeftRoundedIcon sx={{ color: "#fff" }} fontSize="large" />
  </Box>
);

const CustomRightArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      backgroundColor: "#0084FE",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: "30px",
      zIndex: 1,
      cursor: "pointer",
    }}
  >
    <KeyboardArrowRightRoundedIcon sx={{ color: "#fff" }} fontSize="large" />
  </Box>
);

const useStyles = makeStyles({
  dotList: {
    margin: "20px 0",
  },
});

const Faq = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(0);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reCaptchaKey, setReCaptchaKey] = useState(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const SITE_KEY = "6LcNLbMpAAAAAHT-3b_fICQjCcUEivSg53-srBQn";

  // const SITE_KEY = useSelector(
  //   (state) => state.data.data.googleRecapthcha.siteKey
  // );

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/app/contact-form", {
        ...data,
        reCaptchaKey,
      });
      console.log("Form submission response:", response.data);
      // Optionally handle success response or show notification
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error state or show error notification
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const data = response.data;
        setProducts(data);
        if (data.products.length > 0) {
          setSelectedProduct(data.products[0]);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleProductChange = (index) => {
    setSelectedProduct(products.products[index]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/products/product-by-id", {
          master_reseller_id: "626f85e0544a264104223e37",
          product_id: "62677b1d52f74219882d4f38",
        });
        setFaqData(response.data.product.faqs);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.digibulkmarketing.com/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const contactForm = async () => {
      try {
        const response = await axiosInstance.post("app/contact-form", {});
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };
    contactForm();
  }, []);

  const carouselResponsive = {
    all: { breakpoint: { max: 4000, min: 0 }, items: 1 },
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!products) {
    return null;
  }

  return (
    <Box sx={{ background: "#f4f4f4" }}>
      <Container>
        <Box pb={8} textAlign="center">
          <Typography
            fontWeight={600}
            variant="title"
            sx={{
              background: "#f4f4f4",
            }}
          >
            Frequently
            <Box
              component="span"
              sx={{
                color: "primary.main",
                mx: 1,
              }}
            >
              Asked
            </Box>
            Questions
          </Typography>
          <Typography variant="h6" color="khaki">
            Getting more information about our platform that will help you get
            all benefits from us.
          </Typography>
          <Typography variant="h6" color="khaki">
            These all questions are asked for the first time
          </Typography>
        </Box>
        <Grid container spacing={5} pb={5}>
          <Grid item xs={12} md={6} sx={{ height: "570px", overflowY: "auto" }}>
            {faqData?.map((item, index) => (
              <Accordion
                sx={{ my: 2, py: 1 }}
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ background: "#1783FE", p: 3, color: "#fff" }}
                >
                  <Typography>{item.description}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              mb={5}
              variant="subtitle"
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: {
                  xs: "20px",
                  sm: "25px",
                },
              }}
            >
              {selectedProduct && selectedProduct.name}
            </Typography>

            <Carousel
              showDots
              responsive={carouselResponsive}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
              afterChange={(previousSlide, { currentSlide }) =>
                handleProductChange(currentSlide)
              }
              dotListClass={classes.dotList}
            >
              {products.products.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    textAlign: "center",
                    borderRadius: "15px",
                    py: { xs: 5, md: 10 },
                  }}
                >
                  <img
                    width={250}
                    height={250}
                    src={item.image}
                    alt={item.name}
                  />
                </Card>
              ))}
            </Carousel>
          </Grid>
        </Grid>
        <Grid xs={12} md={6}>
          <Typography variant="h5">
            Can't find an answer to your question?
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: "10px", py: 1, my: 1 }}
          >
            Submit a request
          </Button>
        </Grid>
      </Container>

      <section id="contact">
        <Container>
          <Card
            style={{
              clipPath: "polygon(50% 0%, 35% 100%, 65% 100%)",
              transform: "translate(50%, 2%)",
              backgroundColor: "white",
              boxShadow: "none",
            }}
            sx={{ maxWidth: "50%", width: "100%", justifyContent: "center" }}
          >
            gh
          </Card>

          <Box
            sx={{
              padding: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "center" },
              backgroundColor: "#FFF",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "45%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "none",
              }}
            >
              <img
                src={contactFormImg}
                alt="Working Professional"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ width: "100%", padding: "10px" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: "First name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="standard"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Phone number is required",
                      pattern: {
                        value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                        message: "Invalid phone number",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone Number"
                        variant="standard"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ""}
                      />
                    )}
                  />
                </Box>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
                <Controller
                  name="subject"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Subject is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Subject"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      error={!!errors.subject}
                      helperText={errors.subject ? errors.subject.message : ""}
                    />
                  )}
                />
                <Controller
                  name="feedback"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Message is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Feedback"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={4}
                      error={!!errors.feedback}
                      helperText={
                        errors.feedback ? errors.feedback.message : ""
                      }
                    />
                  )}
                />
                <ReCAPTCHA
                  sitekey={SITE_KEY}
                  onChange={(value) => {
                    setReCaptchaKey(value);
                    console.log("Captcha value:", value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "10px", borderRadius: "10px" }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </section>
    </Box>
  );
};

export default Faq;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CircularProgress,
//   Container,
//   Grid,
//   TextField,
//   Typography,
// } from "@mui/material";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useForm, Controller } from "react-hook-form";
// import axiosInstance from "../../util/axiosInstance";
// import contactFormImg from "/image/ContactForm.png";
// import { useDispatch, useSelector } from "react-redux";
// import { setData } from "../../redux/data/dataSlice";

// const Faq = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const SITE_KEY = useSelector((state) => state.data.data.googleRecapthcha.siteKey);
//   console.log("SITE_KEY" , SITE_KEY);
//   const recaptcha =
//     "03AFcWeA4TquLHaccsOZKnyeV9tEkGPZ8YlTkESHfWms8OAz4V-JqaMxibV986_7wSoetqAqVJbxHd7ba3RleI3Ow0dSD-SV4Z757Vump_J4BHKf3H_G-tEg7eJrjcXFqJR50YplU5hfluH8yZyYE7OwnCYR7NAR5-tAwTJJBltY9uphQJXwo8YoJ9EC-OdH6OMnh0ggzzbhiclM-2zj2IeUmmCBphQlscXPpcXccYKXKM7lhlw89OWSiju3ikyK2DDxL2rFV4YhuygwJf0QCusrMy_3YK2fz7psPLo05Ay7dDFBRsQ-NP43Gwx5A6RT95x43mWuVAKZcXemeueNaZ7ByL3Rw-zYKQoarjkGkKsQaeoX8nbcnaTcbtOwg9luuBTZ3gKP0eHK8EVCH5nAt1Qj1_WIkjeSADJrxGl_qeLFMDpJkLnysH_PMju_6FZX9RJCaDfOulpWYZAh4TDjd7qWqQta0rN_hUvIPrFG5zUI9hmonkJSfXIPjKbZqKqEJGb86k54ZA3lx9chATmFmiVtNdoZLSTj7B62qYx0S666zLvoWFozeS4TDb1PO993YHprKjO8F7DEzg2IiWqDoV5hp4BKjQ75gsEbXdvAfnj6VtOGq6PLZpHvUixePUSNh8Q3E527XWwahR1soWa77k-MYgB3rtbKXa6dWhdY5N3Ek7YinnsdRl3azpGuNx3ZCBsjy1QIDNIifb2Aqw8UFlZemSzy-ct9wfSYYqvwA__BGIpdVuaphcSeQFJOM7bKqnQJZcTc2CRZhE-J7e8OOu_TzE1lEwXDSrc9Nf0WsBFpLTzPE_aUf1R_93usM9x-27cWbQBq1nk2l-67LIXZtCRRGvqa9k58KC1P8wvpQZBVhr6hLpB45C8nPUwh_TJD8xjD2LrXXVioAnde3ZWNlRqwvLAOUW2BHHQw_PuwXOmTvd2BOFdF4qzooO4cGhQOsE7NCz-F1v2VRcon4HgL8kdyVYC8GWVuE-S-hHkVvBT5wzRqDVyLbuSPsPAwcEJgTEDE9OGklHNCsuH858zhXPFcIHdGxk3pjkCDwYfLARmez54fa04Ia1xTRYcHPF6OWgfUqXiMMKd7eMF2Ghzr6v4TXV0ufUeSMfeXrWtvILwigPVvpZ1kJLyqbunImElifsAcd6etzOwyQ03pd2rYTnmXkeAOhMlIDOISfbF66lN5FJVhsYL_Xcjl1WKqK2AEMsFRA-ur-V7Qcs3b9AZKxq30lp7hxeXtgjpuLExEO95c7Iirl0VU3wgt6tjoHu77P5NJXp0AE2lEKrt9MSHn1H05aS7DXk6YUIIxsYd5250hVmgnA4qFXTCdBHA6N_9jZp8V_i986W5GbqDkreHqRln7zQkC0S4I9S3_S5YBpjh5U2oJ4qDE9WHkepNpsSPFB3Sc0fu4nqJu78-EnyE_zM2DbFGwI7vBYc3ghLJdyvrG35vThYRL9FsZmeZQFwoElikDhzIM3bnDVDDM_2xW7qi_uxWvmjyNZtbQPj5LyLVJNLHJrfVV3jhQbcUX2x9N_GlKqbKVQAsUvyQMa8GqEcxtQ-cbroRof5Fov5B2vir9fgEAEcQNX8Z6V-hoUvLWtPyMxhLK0TfUkHYHrLF9Uqk3b9F6d0dtWLSqzZWA3uG3NLEI0Pu0lrX3RPIUPYBL5GaXO2XtGFaDmqINGd6zb9qrFMx2bVAxaC1S9irGqIvrqsGMb0v5jQQK8izqVGD2_KAGMvLEx4Zko_yt7lwZqLkc-S8DDO7MKdXxRWRqpqQamGzXJosIL9R-AWRcZ8A_KuO2_cZOLctPkq0iD4qF7F5MynFTtKz919ycdygDFEf1qKOoaVppcp-0Z4xXUG-z3SFVOAZyIGIBuYIoBcrm9Aqd23rpidU0oNuM9pWHQoZwV4_HIpDoGjJKAigdwafESPME5FvhvjX1Io2G5iXF7yYQBl22Kopg7Liahy-bf-CRPWzE9cIrtBcdZpkzXl6sQ58Wz0Pvkc3Q0-";

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.post("/app/contact-form", {
//         ...data,
//         recaptcha,
//       });
//       console.log("Form submission response:", response.data);

//       // reset();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ background: "#f4f4f4" }}>
//       <Container>
//         <Box pb={8} textAlign="center">
//           <Typography
//             fontWeight={600}
//             variant="title"
//             sx={{ background: "#f4f4f4" }}
//           >
//             Frequently
//             <Box component="span" sx={{ color: "primary.main", mx: 1 }}>
//               Asked
//             </Box>
//             Questions
//           </Typography>
//           <Typography variant="h6" color="khaki">
//             Getting more information about our platform that will help you get
//             all benefits from us.
//           </Typography>
//           <Typography variant="h6" color="khaki">
//             These all questions are asked for the first time
//           </Typography>
//         </Box>

//         {/* Contact Form Section */}
//         <section id="contact">
//           <Container>
//             <Box
//               sx={{
//                 padding: 3,
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 alignItems: { xs: "center", md: "center" },
//                 backgroundColor: "#FFF",
//                 boxShadow: "none",
//               }}
//             >
//               <Box
//                 sx={{
//                   width: { xs: "100%", md: "50%" },
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   boxShadow: "none",
//                 }}
//               >
//                 <img
//                   src={contactFormImg}
//                   alt="Working Professional"
//                   style={{ width: "100%", borderRadius: "8px" }}
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   width: { xs: "100%", md: "50%" },
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <form
//                   onSubmit={handleSubmit(onSubmit)}
//                   style={{ width: "100%", padding: "10px" }}
//                 >
//                   <Box
//                     sx={{
//                       width: "100%",
//                       display: "flex",
//                       flexDirection: { xs: "column", sm: "row" },
//                       gap: 2,
//                     }}
//                   >
//                     <Controller
//                       name="name"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: "First name is required" }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label="First Name"
//                           variant="standard"
//                           fullWidth
//                           error={!!errors.name}
//                           helperText={errors.name ? errors.name.message : ""}
//                         />
//                       )}
//                     />

//                     <Controller
//                       name="phone"
//                       control={control}
//                       defaultValue=""
//                       rules={{
//                         required: "Phone number is required",
//                         pattern: {
//                           value: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
//                           message: "Invalid phone number",
//                         },
//                       }}
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           label="Phone Number"
//                           variant="standard"
//                           fullWidth
//                           error={!!errors.phone}
//                           helperText={errors.phone ? errors.phone.message : ""}
//                         />
//                       )}
//                     />
//                   </Box>
//                   <Controller
//                     name="email"
//                     control={control}
//                     defaultValue=""
//                     rules={{
//                       required: "Email is required",
//                       pattern: {
//                         value:
//                           /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                         message: "Invalid email address",
//                       },
//                     }}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Email"
//                         variant="standard"
//                         fullWidth
//                         margin="normal"
//                         error={!!errors.email}
//                         helperText={errors.email ? errors.email.message : ""}
//                       />
//                     )}
//                   />
//                   <Controller
//                     name="subject"
//                     control={control}
//                     defaultValue=""
//                     rules={{ required: "Subject is required" }}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Subject"
//                         variant="standard"
//                         fullWidth
//                         margin="normal"
//                         error={!!errors.subject}
//                         helperText={
//                           errors.subject ? errors.subject.message : ""
//                         }
//                       />
//                     )}
//                   />
//                   <Controller
//                     name="feedback"
//                     control={control}
//                     defaultValue=""
//                     rules={{ required: "Message is required" }}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Message"
//                         variant="standard"
//                         fullWidth
//                         margin="normal"
//                         multiline
//                         rows={4}
//                         error={!!errors.feedback}
//                         helperText={
//                           errors.message ? errors.message.message : ""
//                         }
//                       />
//                     )}
//                   />
//                   <ReCAPTCHA
//                     sitekey={SITE_KEY}
//                     onChange={(value) => {
//                       console.log("Captcha value:", value);
//                     }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ marginTop: "10px", borderRadius: "10px" }}
//                     type="submit"
//                     disabled={loading}
//                   >
//                     {loading ? <CircularProgress size={24} /> : "Submit"}
//                   </Button>
//                 </form>
//               </Box>
//             </Box>
//           </Container>
//         </section>
//       </Container>
//     </Box>
//   );
// };

// export default Faq;
