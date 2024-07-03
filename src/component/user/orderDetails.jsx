import { Box, Grid, Typography, Badge, Divider } from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../util/axiosInstance';
import { CURRENCIES_SYMBOL } from '../currency/currency';
import { useSelector } from 'react-redux';

const OrderDetails = ({ onClose, orderId, onClick }) => {
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const currencySymbol = CURRENCIES_SYMBOL[currency]

  const steps = ['Order Confirmed', 'Shipping', 'To Deliver'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.post('/orders/order-by-id', { order_id: orderId });
        setOrder(response.data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError(error.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    fetchOrder();
    fetchProducts();
  }, [orderId]);

  const orderItems = order?.items

  return (
    <Box sx={{ width: { xs: 250, md: 350 }, p: 3 }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={3}>
        <NavigateBeforeRoundedIcon
          fontSize="large"
          cursor="pointer"
          onClick={onClose}
        />
        <Typography fontWeight={600}>Order Details</Typography>
      </Grid>

      <Typography>Order Id:</Typography>
      <Typography variant='h6'>{orderId}</Typography>

      <Divider sx={{ my: 1 }} />

      <Grid container justifyContent='space-between'>
        <Grid item xs={12} md={5} textAlign='left'>
          <Typography>Created At:</Typography>
          <Typography variant='h6'>{order ? formatDate(order.createdAt) : ''}</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid container item xs={12} md={3} textAlign='center' sx={{ flexDirection: { xs: "row", md: "column" }, alignItems: 'center' }}>
          <Typography>Payment:</Typography>
          <Badge badgeContent={order?.paymentStatus} color='error' sx={{ my: 2, mx: { xs: 4, md: 0 } }} />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={12} md={3} textAlign='center' container sx={{ flexDirection: { xs: "row", md: "column" }, alignItems: 'center' }}>
          <Typography>Status:</Typography>
          <Badge badgeContent={order?.status} color='primary' sx={{ my: 2, mx: { xs: 5, md: 0 } }} />
        </Grid>
      </Grid>

      <Divider sx={{ my: 1 }} />

      <Grid>
        <Typography variant='h6'>Items:</Typography>
        {orderItems?.map(item => {
          const orderItem = products.find(itm => itm.id === item.product_id)
          return (
            <Grid container key={item.id} my={2} sx={{ cursor: "pointer" }} onClick={onClick}>
              <Grid item xs={3} textAlign='start'>
                <img width={50} height={50} src={orderItem?.image} alt="Product" />
              </Grid>
              <Grid item xs={5} textAlign='center'>
                <Typography>{orderItem?.name}</Typography>
              </Grid>
              <Grid item xs={1} textAlign='center'>
                <Typography>{item.quantity}</Typography>
              </Grid>
              <Grid item xs={3} textAlign='end'>
                <Typography>{currencySymbol}{(orderItem?.rates?.find(itm => itm._id === item.variation_id).price * exchangeRates).toFixed(2)}</Typography>
              </Grid>
            </Grid>
          )
        })}
      </Grid>

      <Grid container alignItems="center">
        <Grid item xs={12} container justifyContent='space-between'>
          <Typography sx={{ color: '#818181de' }}>Product Total</Typography>
          <Typography>{currencySymbol}{(order?.orderTotal * exchangeRates).toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent='space-between'>
          <Typography sx={{ color: '#818181de' }}>Discount</Typography>
          <Typography></Typography>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        <Grid item xs={12} container justifyContent='space-between'>
          <Typography fontWeight={600}>Final Price</Typography>
          <Typography fontWeight={600}>{currencySymbol}{(order?.orderTotal * exchangeRates).toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Box >
  );
};

export default OrderDetails;
