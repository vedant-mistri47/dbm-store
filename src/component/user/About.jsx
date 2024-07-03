// import React, { useEffect, useRef, useState } from "react";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Grid,
//   Box,
//   IconButton,
//   Modal,
// } from "@mui/material";
// import img1 from "../image/anydesk.png";
// import img2 from "../image/imagea2.png";
// import img3 from "../image/imagea3.png";
// import teslaLogo from "../image/480px-Tesla_logo 1.png";
// import coronaLogo from "../image/corona-logo-2 1.png";
// import imgv from "../image/Scan.png";
// import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
// import { Link } from "react-router-dom";
// import img5 from "../image/logo (1).png";
// import ReCAPTCHA from "react-google-recaptcha";
// const SITE_KEY = "6LcNLbMpAAAAAHT-3b_fICQjCcUEivSg53-srBQn";
// import axiosInstance from "../../util/axiosInstance";
// ("../../util/axiosInstance");

// const logos = [
//   { src: teslaLogo, alt: "Tesla Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
//   { src: teslaLogo, alt: "Tesla Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
//   { src: teslaLogo, alt: "Tesla Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
//   { src: teslaLogo, alt: "Tesla Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
//   { src: coronaLogo, alt: "Corona Logo" },
// ];

// const About = () => {
//   const handleEmailClick = () => {
//     window.location.href = "mailto:info@digibulkmarketing.com";
//   };

//   const handlePhoneClick = () => {
//     window.location.href = "tel:18008898358";
//   };

//   const [setRecaptchaValue] = useState("");
//   const captchaRef = useRef();

//   const onChange = (value) => {
//     console.log(value);
//     setRecaptchaValue(value);
//   };

//   const [youtubeID] = useState("2nsRe8ct_I8");
//   const [open, setOpen] = useState(false);
//   const [aboutUs, setAboutUs] = useState([]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(
//           "app/store/626f85e0544a264104223e37"
//         );
//         setAboutUs(response.data.storeSettings.aboutUs);
//         console.log("About-->", response.data.storeSettings.aboutUs);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <Container sx={{ bgcolor: "#F4F4F4", padding: 4 }}>
//       {aboutUs?.map((section, index) => (
//         <Grid container spacing={4} alignItems="center" key={section._id}>
//           <Grid item xs={12} md={7}>
//             <CardContent>
//               <Typography variant="subtitle" gutterBottom fontWeight={600}>
//                 {section.title}
//               </Typography>
//               <Box display={"flex"} flexDirection={"column"}>
//                 <Typography
//                   variant="body"
//                   gutterBottom
//                   color={"#1783FE"}
//                   margin={"10px 0"}
//                 >
//                   {section.subtitle}
//                 </Typography>
//                 <Typography
//                   variant="body"
//                   gutterBottom
//                   align="justify"
//                   margin={"20px 0px"}
//                 >
//                   {section.description}
//                 </Typography>
//               </Box>
//               {index === 0 && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: {
//                       xs: "center",
//                       sm: "center",
//                       md: "flex-end",
//                     },
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     sx={{ margin: " 30px 0 " }}
//                     color="primary"
//                     href="https://anydesk.com/en/downloads/windows"
//                     target="_blank"
//                   >
//                     Download Anydesk
//                   </Button>
//                 </Box>
//               )}
//             </CardContent>
//           </Grid>
//           <Grid item xs={12} md={5}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 margin: "auto",
//                 width: { xs: "80%", sm: "100%", md: "100%" },
//               }}
//             >
//               <img
//                 src={section.image}
//                 alt="Section Image"
//                 style={{ maxWidth: "100%" }}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//       ))}
//       <Card
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 2,
//           mt: 4,
//           color: "white",
//           borderRadius: "20px",
//         }}
//       >
//         <Grid container spacing={4} justifyContent="center">
//           {[
//             {
//               title: "Free Update",
//               description: "No Any Pay For Update",
//             },

//             {
//               title: "Available In Store",
//               description: "DBM Available On Microsoft Store",
//             },
//             {
//               title: "Secure Payment",
//               description: "100% Secure Payment",
//             },
//           ].map((item, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 textAlign="center"
//               >
//                 <img
//                   src={imgv}
//                   alt={item.title}
//                   style={{ maxWidth: "100%", height: "auto" }}
//                 />
//                 <Typography variant="h6" fontWeight={900} marginTop={2}>
//                   {item.title}
//                 </Typography>
//                 <Typography variant="body1">{item.description}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Card>

//       <Grid container spacing={4} sx={{ padding: " 34px 0" }}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="title">Trust Is Earned, </Typography>
//           <Typography variant="title"> Not Given</Typography>
//           <Box>
//             <Typography align="justify" marginTop={"30px"} variant="body">
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s, when an unknown printer took a galley of
//               type and scrambled it to make a type Lorem Ipsum has been type
//             </Typography>
//           </Box>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           md={6}
//           container
//           justifyContent={{ xs: "center", md: "flex-start" }}
//           alignItems="center"
//         >
//           <Grid container spacing={2} justifyContent="center">
//             {logos.map((logo, index) => (
//               <Grid
//                 item
//                 xs={6}
//                 sm={4}
//                 md={4}
//                 key={index}
//                 style={{ textAlign: "center" }}
//               >
//                 <Box
//                   sx={{
//                     width: { md: "60%", sm: "40%", xs: "60%" },
//                     margin: "auto",
//                   }}
//                 >
//                   <img src={logo.src} alt={logo.alt} width="100%" />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default About;

// import React, { useState, useEffect } from "react";
// import { Container, Typography, Grid, Box, Modal, IconButton } from "@mui/material";
// import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

// const About = () => {
//   const [aboutUs, setAboutUs] = useState([]);
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     // Simulating data fetching
//     const fetchAboutUs = async () => {
//       const data = [
//         {
//           title: "Section 1 Title",
//           subtitle: "Section 1 Subtitle",
//           description: "Section 1 Description",
//           image: "url_to_image1",
//         },
//         {
//           title: "Section 2 Title",
//           subtitle: "Section 2 Subtitle",
//           description: "Section 2 Description",
//           image: "url_to_image2",
//         },
//         // Add more sections as needed
//       ];
//       setAboutUs(data);
//     };

//     fetchAboutUs();
//   }, []);

//   return (
//     <Container sx={{ bgcolor: "#F4F4F4", padding: 4 }}>
//       {aboutUs.map((section, index) => (
//         <Grid container spacing={4} alignItems="center" sx={{ marginTop: index > 0 ? 4 : 0 }} key={index}>
//           {index % 2 === 0 ? (
//             <>
//               <Grid item xs={12} md={7}>
//                 <Box>
//                   <Typography variant="h6" gutterBottom fontWeight={600}>
//                     {section?.title}
//                   </Typography>
//                   <Typography variant="subtitle1" gutterBottom color={"#1783FE"}>
//                     {section?.subtitle}
//                   </Typography>
//                   <Typography variant="body1" gutterBottom>
//                     {section?.description}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={5}>
//                 <Box display="flex" justifyContent="center" alignItems="center">
//                   <img src={section?.image} alt="Section Image" style={{ maxWidth: "100%" }} />
//                 </Box>
//               </Grid>
//             </>
//           ) : (
//             <>
//               <Grid item xs={12} md={5}>
//                 <Box display="flex" justifyContent="center" alignItems="center">
//                   <img src={section.image} alt="Section Image" style={{ maxWidth: "100%" }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={7}>
//                 <Box>
//                   <Typography variant="h6" gutterBottom fontWeight={600}>
//                     {section?.title}
//                   </Typography>
//                   <Typography variant="subtitle1" gutterBottom color={"#1783FE"}>
//                     {section?.subtitle}
//                   </Typography>
//                   <Typography variant="body1" gutterBottom>
//                     {section?.description}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </>
//           )}
//         </Grid>
//       ))}
//       <Box width={150} margin="30px 0 0 0" display="flex" alignItems="center" justifyContent="space-around" cursor="pointer" onClick={handleOpen}>
//         <Typography bgcolor="#1783FE" height="50px" width="50px" display="flex" alignItems="center" justifyContent="center" borderRadius="50%">
//           <IconButton sx={{ color: "white" }}>
//             <PlayArrowOutlinedIcon fontSize="large" />
//           </IconButton>
//         </Typography>
//         <Typography fontWeight={600} sx={{ textDecoration: "none", color: "#000", cursor: "pointer" }}>
//           Our Story
//         </Typography>
//       </Box>
//       <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Box width="80%" maxWidth={700} bgcolor="background.paper" borderRadius={2} boxShadow={24} p={4}>
//           <iframe width="100%" height="400" src="https://www.youtube.com/embed/2nsRe8ct_I8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default About;

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
} from "@mui/material";
import axiosInstance from "../../util/axiosInstance";
import img1 from "../image/anydesk.png";
import img2 from "../image/imagea2.png";
import img3 from "../image/imagea3.png";
import teslaLogo from "../image/480px-Tesla_logo 1.png";
import coronaLogo from "../image/corona-logo-2 1.png";
import imgv from "../image/Scan.png";

const logos = [
  { src: teslaLogo, alt: "Tesla Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
  { src: teslaLogo, alt: "Tesla Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
  { src: teslaLogo, alt: "Tesla Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
  { src: teslaLogo, alt: "Tesla Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
  { src: coronaLogo, alt: "Corona Logo" },
];

const About = () => {
  const [aboutUs, setAboutUs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "app/store/626f85e0544a264104223e37"
        );
        setAboutUs(response.data.storeSettings.aboutUs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const renderContent = (section, index) => {
    if (index % 2 === 0) {
      // Even index: text first, then image
      return (
        <>
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color={"#1783FE"}
                margin={"10px 0"}
              >
                {section.subtitle}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                align="justify"
                margin={"20px 0px"}
              >
                {section.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                {index === 0 && (
                  <Button
                  
                    variant="contained"
                    color="primary"
                    href="https://anydesk.com/en/downloads/windows"
                    target="_blank"
                  >
                    Download Anydesk
                  </Button>
                )}
              </Box>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                width: { xs: "80%", sm: "100%", md: "100%" },
              }}
            >
              <img
                src={section.image}
                alt="Section Image"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Grid>
        </>
      );
    } else {
      // Odd index: image first, then text
      return (
        <>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                width: { xs: "80%", sm: "100%", md: "100%" },
              }}
            >
              <img
                src={`https://api.digibulkmarketing.com${section?.image1}`}
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color={"#1783FE"}
                margin={"10px 0"}
              >
                {section.subtitle}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                align="justify"
                margin={"20px 0px"}
              >
                {section.description}
              </Typography>
            </CardContent>
          </Grid>
        </>
      );
    }
  };

  return (
    <Container sx={{ bgcolor: "#F4F4F4", padding: 4 }}>
      {aboutUs?.map((section, index) => (
        <Grid container spacing={4} alignItems="center" key={section._id}>
          {renderContent(section, index)}
        </Grid>
      ))}
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          mt: 4,
          color: "white",
          borderRadius: "20px",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: "Free Update", description: "No Any Pay For Update" },
            {
              title: "Available In Store",
              description: "DBM Available On Microsoft Store",
            },
            { title: "Secure Payment", description: "100% Secure Payment" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
              >
                <img
                  src={imgv}
                  alt={item.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <Typography variant="h6" fontWeight={900} marginTop={2}>
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

    </Container>
  );
};

export default About;
