import React, { useEffect, useState } from "react";
import hiringImage from "../image/Image.png";
import Carousel from "react-multi-carousel";
import { makeStyles } from "@mui/styles";
import "react-multi-carousel/lib/styles.css";
import zomatoImg from "../image/google-map-extractor-7 1.png";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { styled } from "@mui/system";
import axiosInstance from "../../util/axiosInstance";
import { CURRENCIES_SYMBOL } from "../currency/currency";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  carousel: {
    padding: "100px 0 50px 0",
    textAlign: "center",
  },
  dotList: {
    display: "flex",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    listStyle: "none",
  },
  customDot: {
    width: 40,
    height: 5,
    borderRadius: "20%",
    backgroundColor: "#1783FE",
    margin: "0 5px",
    cursor: "pointer",
    "&.active": {
      backgroundColor: "#7C7979",
    },
  },
});

const StyledBadge = styled(Badge)(({ transform }) => ({
  "& .MuiBadge-badge": {
    right: 12,
    top: 12,
    padding: "20px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "large",
    transform,
  },
}));

const arrowStyle = {
  border: 1,
  p: 1,
  borderRadius: "50%",
  ml: 2,
  cursor: "pointer",
};

const transformations = ["rotate(-8deg)", "rotate(12deg)", "rotate(12deg)"];

const Featured = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const currencySymbol = CURRENCIES_SYMBOL[currency];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/app/discount/product", {
          master_reseller_id: "626f85e0544a264104223e37",
          phone: "+919898989899",
          auth_type: "phone",
          otp: "123123",
        });
        if (response) {
          console.log(response);
          setProducts(response.data.products.slice(0, 3));
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server Error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request Error:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error:", error.message);
        }
      }
    };

    fetchProducts();
  }, []);

  const multiCarouselResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1.8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1.8,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomButtonGroup = ({ next, previous }) => {
    return (
      <Box
        position="absolute"
        top={20}
        right={30}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ArrowBackRoundedIcon onClick={previous} sx={arrowStyle} />
        <ArrowForwardRoundedIcon onClick={next} sx={arrowStyle} />
      </Box>
    );
  };

  const CustomDot = ({ onClick, active }) => {
    return (
      <li
        className={`${classes.customDot} ${active ? "active" : ""}`}
        onClick={onClick}
      />
    );
  };

  return (
    <Box sx={{ background: "#f4f4f4" }}>
      <Container>
        <Carousel
          showDots
          customDot={<CustomDot />}
          customButtonGroup={<CustomButtonGroup />}
          arrows={false}
          swipeable={false}
          responsive={multiCarouselResponsive}
          containerClass={classes.carousel}
          dotListClass={classes.dotList}
        >
          <Card
            sx={{
              width: "90%",
              textAlign: "center",
              borderRadius: "15px",
              p: 2,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={7}>
                <img src={hiringImage} alt="" width={300} />
              </Grid>
              <Grid item xs={12} md={5} align="left">
                <Typography
                  sx={{ my: "10px" }}
                  variant="title"
                  fontWeight={600}
                >
                  20% OFF
                </Typography>
                <Typography sx={{ my: "10px" }} variant="h5">
                  Special Christmas Day Offer
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: "10px", py: 1, mt: 5 }}
                >
                  Discover Now
                  <ArrowForwardRoundedIcon />
                </Button>
              </Grid>
            </Grid>
          </Card>
          <Card
            sx={{
              width: "90%",
              textAlign: "center",
              borderRadius: "15px",
              p: 2,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={7}>
                <img src={hiringImage} alt="" width={300} />
              </Grid>
              <Grid item xs={12} md={5} align="left">
                <Typography
                  sx={{ my: "10px" }}
                  variant="title"
                  fontWeight={600}
                >
                  20% OFF
                </Typography>
                <Typography sx={{ my: "10px" }} variant="h5">
                  Special Christmas Day Offer
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: "10px", py: 1, mt: 5 }}
                >
                  Discover Now
                  <ArrowForwardRoundedIcon />
                </Button>
              </Grid>
            </Grid>
          </Card>
          <Card
            sx={{
              width: "90%",
              textAlign: "center",
              borderRadius: "15px",
              p: 2,
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={7}>
                <img src={hiringImage} alt="" width={300} />
              </Grid>
              <Grid item xs={12} md={5} align="left">
                <Typography
                  sx={{ my: "10px" }}
                  variant="title"
                  fontWeight={600}
                >
                  20% OFF
                </Typography>
                <Typography sx={{ my: "10px" }} variant="h5">
                  Special Christmas Day Offer
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: "10px", py: 1, mt: 5 }}
                >
                  Discover Now
                  <ArrowForwardRoundedIcon />
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Carousel>

        <Typography
          fontWeight={700}
          my={2}
          sx={{
            background: "#f4f4f4",
            fontSize: { xs: "20px", sm: "30px", md: "45px" },
          }}
        >
          Flash sale for
          <Box
            component="span"
            sx={{
              color: "primary.main",
              mx: 1,
            }}
          >
            best
          </Box>
          sellers
        </Typography>
        <Grid
          container
          sx={{
            justifyContent: {
              md: "space-between",
              sm: "center",
              xs: "center",
            },
            alignItems: "center",
          }}
          display="flex"
        >
          {products.map((product, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              display="flex"
              justifyContent="center"
            >
              <StyledBadge
                badgeContent={`${20}% Off`}
                transform={transformations[index % transformations.length]}
              >
                <Card
                  sx={{
                    borderRadius: "15px",
                    p: 2,
                    position: "relative",
                    maxWidth: 300,
                    m: 2,
                  }}
                >
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ cursor: "pointer" }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{
                        borderRadius: "15px",
                        backgroundColor: "#FBF5EC",
                        textAlign: "center",
                      }}
                    >
                      <img
                        width={200}
                        height={200}
                        src={product.image}
                        alt={product.title}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      justifyContent="space-between"
                      my={3}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          fontWeight={600}
                          sx={{ textAlign: "center", fontSize: "16px" }}
                        >
                          {product.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="subtitle2"
                          sx={{ textAlign: "center", mt: 1, fontSize: "16px" }}
                        >
                          {currencySymbol}
                          {(
                            product.rates.reduce(
                              (min, rate) => Math.min(min, rate.price),
                              Infinity
                            ) * exchangeRates
                          ).toFixed(2)}{" "}
                          - {currencySymbol}
                          {(
                            product.rates.reduce(
                              (max, rate) => Math.max(max, rate.price),
                              -Infinity
                            ) * exchangeRates
                          ).toFixed(2)}
                        </Typography>
                        <Grid
                          container
                          justifyContent="center"
                          gap="10px"
                          mt="5px"
                        >
                          <Rating readOnly value={5} />
                          <Typography>99+ Reviews</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </StyledBadge>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Featured;
