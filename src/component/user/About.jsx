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
