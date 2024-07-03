import { Badge, Box, Divider, Drawer, Grid, Typography } from '@mui/material'
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import zomatoImg from '../image/google-map-extractor-7 1.png';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../util/axiosInstance';
import OrderDetails from './orderDetails';
import { CURRENCIES_SYMBOL } from '../currency/currency';
import { useSelector } from 'react-redux';

const order = ({ onClose, orderDetails }) => {
    const [details, setDetails] = useState(false)
    const [orders, setOrders] = useState(null)
    const [id, setId] = useState(null)
    const {currency,exchangeRates} = useSelector((state) => state.currency);
    const currencySymbol = CURRENCIES_SYMBOL[currency]

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axiosInstance.post("/orders/orders");
                const data = response.data.orders;
                setOrders(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchOrder();
    }, []);

    const toggleOrderDetailsDrawer = (newOpen, id) => () => {
        setDetails(newOpen)
        setId(id)
    }

    return (
        <Box sx={{ width: { xs: 250, md: 350 }, p: 3 }}>
            <Grid container alignItems="center" justifyContent="space-between" mb={3}>
                <NavigateBeforeRoundedIcon
                    fontSize="large"
                    cursor="pointer"
                    onClick={onClose}
                />
                <Typography fontWeight={600}>Orders</Typography>
            </Grid>

            {orders?.map((item, index) => (
                <Grid
                    key={index}
                    container
                    sx={{ borderRadius: '15px', cursor: 'pointer' }}
                    p={1}
                    my={5}
                    boxShadow="5px 5px 10px #eee"
                    justifyContent="space-between"
                    onClick={toggleOrderDetailsDrawer(true, item.id)}
                >
                    <Grid item xs={12} container>
                        <Typography sx={{ color: '#818181de' }}>Order id : </Typography>
                        <Typography noWrap>{item.id}</Typography>
                    </Grid>
                    <Grid item xs={12} container >
                        <Typography>Status : <Badge badgeContent={item.status} color='primary' sx={{ ml: 5 }} /></Typography>
                        {/* <Typography></Typography> */}
                    </Grid>
                    <Grid item xs={12} container >
                        <Typography sx={{ color: '#818181de' }}>Date Purchase :</Typography>
                        <Typography>{formatDate(item.createdAt)}</Typography>
                    </Grid>
                    <Grid item xs={12} container>
                        <Typography sx={{ color: '#818181de' }}>Total :</Typography>
                        <Typography>{currencySymbol}{(item.orderTotal * exchangeRates).toFixed(2)}</Typography>
                    </Grid>
                </Grid>
            ))}

            <Drawer
                anchor="right"
                open={details}
                onClose={toggleOrderDetailsDrawer(false)}
            >
                <OrderDetails onClose={toggleOrderDetailsDrawer(false)} orderId={id} />
            </Drawer>
        </Box>
    )
}

export default order
