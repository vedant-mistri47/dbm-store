import React from "react";
import "./App.css";
import { ThemeProvider, Box, createTheme , } from "@mui/material";
import Navbar from "./component/site/navbar";
import Home from "./component/user/Home";
import Shop from "./component/user/Shop";
import About from "./component/user/About";
import Faq from "./component/user/Faq";
import Featured from "./component/user/Featured";
import Footer from "./component/user/Footer";
import Header from "./component/user/Header";
import Card from "./component/user/cart";

// Define the theme directly inside App.js
const theme = createTheme({
  typography: {
    title: {
      fontFamily: "Montserrat, Arial, sans-serif",
      fontWeight: 600,
      fontSize: "1.5rem", // 30px base size for h3
      "@media (min-width:600px)": {
        fontSize: "2.5rem", // 40px for small screens and up
      },
      "@media (min-width:900px)": {
        fontSize: "3.125rem", // 50px for medium screens and up
      },
    },
    subtitle: {
      fontFamily: "Montserrat, Arial, sans-serif",
      fontSize: "30px",
      fontWeight: 600,
    },
    body: {
      fontFamily: "Montserrat, Arial, sans-serif",
      fontSize: "18px",
      align: "justify",
      fontWeight: "none",
      lineHeight: 1.5,
    },
  },
  palette: {
    white: {
      main: "#ffffff",
    },
    black: {
      main: "#000",
    },
    khaki: {
      main: "#8E8E8E",
    },
    mainBg: {
      main: "#F4F4F4",
    },
    gray: {
      main: "#adadaade",
    },
    green: {
      main: "#21E500",
    },
    mainBg: {
      main: "#0084FE",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#F4F4F4" }}>
        <Navbar />
        <section id="home">
          <Home />
        </section>
        <section id="shop">
          <Shop />
        </section>
        <section id="featured">
          <Featured />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="faq">
          <Faq />
        </section>
        <Footer />
      </Box>


      {/* <SnackbarProvider maxSnack={3}>
       <Card/>
             </SnackbarProvider> */}
  
    </ThemeProvider>



  );
}

export default App;
