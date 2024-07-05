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
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import teslaLogo from "../image/480px-Tesla_logo 1.png";
import coronaLogo from "../image/corona-logo-2 1.png";
import imgv from "../image/Scan.png";
import { Image } from "../../../lib";

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

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

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
      return (
        <Container>
          <Grid
            container
            sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
          >
            <Grid item xs={12} md={7} mt={5}>
              <CardContent sx={{ textAlign: "left" }}>
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
                  margin="20px 0px"
                >
                  {section.description}
                </Typography>

                {index === 2 &&(
                  <Box width={150} margin={'30px 0 0 0'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', cursor: "pointer" }}>
                  <Typography bgcolor={'#1783FE'} height={'50px'} width={'50px'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={'50%'} >
                    <PlayArrowOutlinedIcon fontSize='large' color='white' />
                  </Typography>
                  <Typography>
                    Our Story
                  </Typography>
                </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
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
            <Grid item xs={12} md={4} mt={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: { md: "0 100px", sm: "0 10px", xs: "0 40px" },
                  width: { xs: "80%", sm: "100%", md: "90%" },
                }}
              >
                <img
                  src={Image(section.image)}
                  alt="Section Image"
                  style={{ maxWidth: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      );
    } else {
      return (
        <>
          <Grid item xs={12} md={5} mt={5}>
            {section.image && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  width: { xs: "60%", sm: "80%", md: "80%" },
                }}
              >
                <img
                  src={Image(section.image)}
                  alt="Section Image"
                  style={{ maxWidth: "100%" }}
                />
              </Box>
            )}
            <Grid container direction="column" spacing={2} mt={2}>
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
            <CardContent sx={{ textAlign: "left" }}>
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
                margin="20px 0px"
              >
                {section.description}
              </Typography>
              {index === 1 && (
                <Box width={150} margin={'30px 0 0 0'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around',cursor: "pointer" }}>
                <Typography bgcolor={'#1783FE'} height={'50px'} width={'50px'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderRadius={'50%'} >
                  <PlayArrowOutlinedIcon fontSize='large' color='white' />
                </Typography>
                <Typography>
                  Our Story
                </Typography>
              </Box>
              )}
            </CardContent>
          </Grid>
        </>
      );
    }
  };

  return (
    <Container sx={{ bgcolor: "#F4F4F4", padding: 0 }}>
      {aboutUs.map((section, index) => (
        <Grid container spacing={4} alignItems="flex-start" key={section._id}>
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
                <Typography variant="body">{item.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};

export default About;
