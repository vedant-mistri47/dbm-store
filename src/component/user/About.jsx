// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Grid,
//   Box,
//   Modal,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import axiosInstance from "../../util/axiosInstance";
// import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";

// import imgv from "../image/Scan.png";
// import { Image } from "../../../lib";

// const chunkArray = (array, chunkSize) => {
//   const result = [];
//   for (let i = 0; i < array.length; i += chunkSize) {
//     result.push(array.slice(i, i + chunkSize));
//   }
//   return result;
// };

// const About = () => {
//   const [aboutUs, setAboutUs] = useState([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(
//           "app/store/626f85e0544a264104223e37"
//         );
//         setAboutUs(response.data.storeSettings.aboutUs);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const renderContent = (section, index) => {
//     if (index % 2 === 0) {
//       return (
//         <Container>
//           <Grid
//             container
//             spacing={3}
//             direction={isMobile ? "column-reverse" : "row"}
//           >
//             <Grid item xs={12} md={index % 2 === 0 ? 7 : 5}>
//               <CardContent sx={{ textAlign: "left" }}>
//                 <Typography
//                   variant={isMobile ? "h6" : "h5"}
//                   gutterBottom
//                   fontWeight={600}
//                 >
//                   {section.title}
//                 </Typography>
//                 <Typography
//                   variant="body"
//                   gutterBottom
//                   color="#1783FE"
//                   display={'flex'}
//                   sx={{ margin: "10px 0" }}
//                 >
//                   {section.subtitle}
//                 </Typography>
//                 <Typography
//                   variant="body"
//                   gutterBottom
//                   display={'flex'}
//                   align="justify"
//                   sx={{ margin: "20px 0px" }}
//                 >
//                   {section.description}
//                 </Typography>
//                 {(index === 1 || index === 2) && (
//                   <Box
//                   width={150}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-around",
//                     cursor: "pointer",
//                   }}
//                   onClick={handleOpen}
//                 >
//                   <Typography
//                     bgcolor={"#1783FE"}
                   
//                     height={"50px"}
//                     width={"50px"}
//                     display={"flex"}
//                     alignItems={"center"}
//                     justifyContent={"center"}
//                     borderRadius={"50%"}
//                   >
//                     <PlayArrowOutlinedIcon fontSize="large" color="white" />
//                   </Typography>
//                   <Typography>Our Story</Typography>
//                 </Box>
//                 )}
//                 {index === 0 && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     href="https://anydesk.com/en/downloads/windows"
//                     target="_blank"
//                     sx={{ marginTop: 2, width: isMobile ? "100%" : "auto" }}
//                   >
//                     Download Anydesk
//                   </Button>
//                 )}
//               </CardContent>
//             </Grid>
//             <Grid item xs={12} md={index % 2 === 0 ? 5 : 7}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   width: "100%",
//                 }}
//               >
//                 <img
//                   src={Image(section.image)}
//                   alt="Section Image"
//                   style={{
//                     maxWidth: "100%",
//                     height: "auto",
//                     maxHeight: isMobile ? "300px" : "400px",
//                   }}
//                 />
//               </Box>
//               {section.logo && (
//                 <Grid container spacing={2} sx={{ marginTop: 2 }}>
//                   {chunkArray(section.logo, 3).map((logoRow, rowIdx) => (
//                     <Grid container item spacing={2} key={rowIdx}>
//                       {logoRow.map((item, idx) => (
//                         <Grid item xs={4} key={idx}>
//                           <img
//                             src={Image(item)}
//                             alt="Logo"
//                             style={{ maxWidth: "100%", height: "auto" }}
//                           />
//                         </Grid>
//                       ))}
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </Grid>
//           </Grid>
//         </Container>
//       );
//     } else {
//       return (
//         <>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={index % 2 === 0 ? 5 : 5} mt={5}>
//               {section.image && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     width: { xs: "100%", sm: "100%", md: "100%" },
//                   }}
//                 >
//                   <img
//                     src={Image(section.image)}
//                     alt="Section Image"
//                     style={{
//                       maxWidth: "350px",
//                       maxHeight: "800px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   />
//                 </Box>
//               )}
//               <Grid container direction="column" spacing={1} mt={0}>
//                 {section.logo &&
//                   chunkArray(section.logo, 3).map((logoRow, rowIdx) => (
//                     <Grid container item spacing={2} key={rowIdx}>
//                       {logoRow.map((item, idx) => (
//                         <Grid item xs={4} key={idx}>
//                           <img
//                             src={Image(item)}
//                             alt="Logo"
//                             style={{ maxWidth: "100%" }}
//                           />
//                         </Grid>
//                       ))}
//                     </Grid>
//                   ))}
//               </Grid>
//             </Grid>
//             <Grid item xs={12} md={7} mt={3}>
//               <CardContent sx={{ textAlign: "start" }}>
//                 <Typography variant="subtitle" gutterBottom fontWeight={600}>
//                   {section.title}
//                 </Typography>
//                 <Typography
//                   variant="body"
//                   gutterBottom
//                   display="flex"
//                   flexDirection="column"
//                   color="#1783FE"
//                   margin="10px 0"
//                 >
//                   {section.subtitle}
//                 </Typography>
//                 <Typography
//                   variant="body"
//                   gutterBottom
//                   display="flex"
//                   align="justify"
//                 >
//                   {section.description}
//                 </Typography>
//                 {index === 1 && (
//                   <Box
//                     width={150}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-around",
//                       cursor: "pointer",
//                     }}
//                     onClick={handleOpen}
//                   >
//                     <Typography
//                       bgcolor={"#1783FE"}
                     
//                       height={"50px"}
//                       width={"50px"}
//                       display={"flex"}
//                       alignItems={"center"}
//                       justifyContent={"center"}
//                       borderRadius={"50%"}
//                     >
//                       <PlayArrowOutlinedIcon fontSize="large" color="white" />
//                     </Typography>
//                     <Typography>Our Story</Typography>
//                   </Box>
//                 )}
//               </CardContent>
//             </Grid>
//           </Grid>
//         </>
//       );
//     }
//   };

//   return (
//     <Container sx={{ bgcolor: "#F4F4F4", padding: isMobile ? 2 : 4 }}>
//       {aboutUs.map((section, index) => (
//         <Box key={section._id} sx={{ marginBottom: 4 }}>
//           {renderContent(section, index)}
//         </Box>
//       ))}
//       <Card
//         sx={{
//           padding: 2,
//           mt: 4,
//           color: "white",
//           borderRadius: "20px",
//         }}
//       >
//         <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
//           {[
//             { title: "Free Update", description: "No Any Pay For Update" },
//             {
//               title: "Available In Store",
//               description: "DBM Available On Microsoft Store",
//             },
//             { title: "Secure Payment", description: "100% Secure Payment" },
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
//                   style={{
//                     maxWidth: "100%",
//                     height: "auto",
//                     maxHeight: "100px",
//                   }}
//                 />
//                 <Typography
//                   variant={isMobile ? "subtitle1" : "h6"}
//                   fontWeight={900}
//                   marginTop={2}
//                 >
//                   {item.title}
//                 </Typography>
//                 <Typography variant="body2">{item.description}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Card>
//       {/* Modal remains the same */}
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
  Modal,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axiosInstance from "../../util/axiosInstance";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import CloseIcon from "@mui/icons-material/Close";

import imgv from "../image/Scan.png";
import { Image } from "../../../lib";

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const About = () => {
  const [aboutUs, setAboutUs] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderContent = (section, index) => {
    if (index % 2 === 0) {
      return (
        <Container>
          <Grid
            container
            spacing={3}
            direction={isMobile ? "column-reverse" : "row"}
          >
            <Grid item xs={12} md={index % 2 === 0 ? 7 : 5}>
              <CardContent sx={{ textAlign: "left" }}>
                <Typography
                  variant={isMobile ? "h6" : "subtitle"}
                  gutterBottom
                  fontWeight={600}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="body"
                  gutterBottom
                  color="#1783FE"
                  display="flex"
                  sx={{ margin: "10px 0" }}
                >
                  {section.subtitle}
                </Typography>
                <Typography
                  variant="body"
                  gutterBottom
                  display="flex"
                  align="justify"
                  sx={{ margin: "20px 0px" }}
                >
                  {section.description}
                </Typography>
                {(index === 1 || index === 2) && (
                  <Box
                    width={150}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      cursor: "pointer",
                    }}
                    onClick={handleOpen}
                  >
                    <Box
                      bgcolor="#1783FE"
                      height={"50px"}
                      width={"50px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"50%"}
                    >
                      <PlayArrowOutlinedIcon fontSize="large" color="white" />
                    </Box>
                    <Typography variant="body" sx={{ ml: 1 }}>Our Story</Typography>
                  </Box>
                )}
                {index === 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                  
                    href="https://anydesk.com/en/downloads/windows"
                    target="_blank"
                    sx={{ marginTop: 2, width: isMobile ? "100%" : "auto" }}
                  >
                    Download Anydesk
                  </Button>
                )}
              </CardContent>
            </Grid>
            <Grid item xs={12} md={index % 2 === 0 ? 5 : 7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <img
                  src={Image(section.image)}
                  alt="Section Image"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: isMobile ? "300px" : "400px",
                    borderRadius: "10px", // Rounded corners
                  }}
                />
              </Box>
              {section.logo && (
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {chunkArray(section.logo, 3).map((logoRow, rowIdx) => (
                    <Grid container item spacing={2} key={rowIdx}>
                      {logoRow.map((item, idx) => (
                        <Grid item xs={4} key={idx}>
                          <img
                            src={Image(item)}
                            alt="Logo"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      );
    } else {
      return (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={index % 2 === 0 ? 5 : 5} mt={5}>
              {section.image && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { xs: "100%", sm: "100%", md: "100%" },
                  }}
                >
                  <img
                    src={Image(section.image)}
                    alt="Section Image"
                    style={{
                      maxWidth: "350px",
                      maxHeight: "800px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              )}
              <Grid container direction="column" spacing={1} mt={0}>
                {section.logo &&
                  chunkArray(section.logo, 3).map((logoRow, rowIdx) => (
                    <Grid container item spacing={2} key={rowIdx}>
                      {logoRow.map((item, idx) => (
                        <Grid item xs={4} key={idx}>
                          <img
                            src={Image(item)}
                            alt="Logo"
                            style={{ maxWidth: "100%" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={7} mt={3}>
              <CardContent sx={{ textAlign: "start" }}>
                <Typography variant="subtitle" gutterBottom fontWeight={600}>
                  {section.title}
                </Typography>
                <Typography
                  variant="body"
                  gutterBottom
                  display="flex"
                  flexDirection="column"
                  color="#1783FE"
                  margin="10px 0"
                >
                  {section.subtitle}
                </Typography>
                <Typography
                  variant="body"
                  gutterBottom
                  display="flex"
                  align="justify"
                >
                  {section.description}
                </Typography>
                {index === 1 && (
                  <Box
                    width={150}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      cursor: "pointer",
                    }}
                    onClick={handleOpen}
                  >
                    <Box
                      bgcolor="#1783FE"
                      height={"50px"}
                      width={"50px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"50%"}
                    >
                      <PlayArrowOutlinedIcon fontSize="large" color="white" />
                    </Box>
                    <Typography variant="body" sx={{ ml: 1 }}>Our Story</Typography>
                  </Box>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </>
      );
    }
  };

  return (
    <Container sx={{ bgcolor: "#F4F4F4", padding: isMobile ? 2 : 4 }}>
      {aboutUs.map((section, index) => (
        <Box key={section._id} sx={{ marginBottom: 4 }}>
          {renderContent(section, index)}
        </Box>
      ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "60%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-title" variant="h6" component="h2">
            Our Story
          </Typography>
          <Box
            component="div"
            sx={{
              position: "relative",
              paddingTop: "56.25%", 
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/2nsRe8ct_I8?si=O_PT36fIEbkm6mww"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "10px", // Rounded corners
              }}
            ></iframe>
          </Box>
        </Box>
      </Modal>
      <Card
        sx={{
          padding: 2,
          mt: 4,
          color: "white",
          borderRadius: "20px",
        }}
      >
        <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
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
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "100px",
                  }}
                />
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  fontWeight={900}
                  marginTop={2}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};

export default About;
