import React, { useState } from 'react';
import {
    Badge, Box, Button, Drawer, Grid, Rating, Typography , CircularProgress
} from '@mui/material';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const buttonStyle = {
    p: 0.1,
    boxShadow: '0 0 10px #eee',
    cursor: 'pointer',
};



const ShopDetails = ({ onClose, product, color, cartDrawer }) => {
    const [count, setCount] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!product) {
        return null;
    }

    const toggleExpanded = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const handleCounter = (change) => {
        setCount((prevCount) => Math.max(1, prevCount + change));
    };

    const handleAddToCart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }
    return (
        <Box sx={{ width: { xs: 250, md: 350 }, p: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between" mb={3}>
                <KeyboardBackspaceRoundedIcon
                    fontSize="large"
                    cursor="pointer"
                    onClick={onClose}
                />
                <Typography fontWeight={600}>Detail Product</Typography>
                {cartDrawer}
            </Grid>

            <Grid
                container
                sx={{ borderRadius: '15px' }}
                p={2}
                my={5}
                boxShadow="0 0 10px #eee"
                justifyContent="space-between"
            >
                <Grid item xs={12} md={4} sx={{ borderRadius: '15px', backgroundColor: color, textAlign: 'center' }}>
                    <img width={100} height={100} src={product.image} alt="Product" />
                </Grid>
                <Grid item xs={12} md={7} container direction="column" justifyContent="space-between">
                    <Typography>{product.name}</Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#818181de' }}>Price</Typography>
                            <Typography fontWeight={600}>${product.store[product.store.length - 1].price * count}</Typography>
                        </Grid>
                        <Grid item xs={6} container alignItems="center" justifyContent="space-evenly">
                            <RemoveOutlinedIcon sx={buttonStyle} onClick={() => handleCounter(-1)} />
                            <Typography>{count}</Typography>
                            <AddOutlinedIcon fontSize='small' sx={buttonStyle} onClick={() => handleCounter(1)} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container my={5}>
                <Grid item xs={12} sx={{ borderRadius: '15px', backgroundColor: color, textAlign: 'center', p: '7px 0' }}>
                    <img width="80%" src={product.image} alt="Product" />
                </Grid>
            </Grid>

            <Box>
                <Badge badgeContent="NEW" color="primary" sx={{ ml: 2 }} />
                <Grid container alignItems="flex-end">
                    <Grid item xs={8}>
                        <Typography sx={{ my: '10px', fontWeight: 'bold' }}>
                            {product.name}
                        </Typography>
                        <Grid container justifyContent="space-between">
                            <Rating readOnly value={5} />
                            <Typography>99+ Reviews</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                        <Typography sx={{ color: '#818181de' }}>Price</Typography>
                        <Typography fontWeight={600}>${product.store[product.store.length - 1].price * count}</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ my: 5 }}>
                <Typography fontWeight="bold">Descriptions</Typography>
                <Typography noWrap={!expanded}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dignissimos dolores numquam maiores mollitia quo debitis nam cupiditate magnam eos dolor assumenda molestias, quas quos sed nostrum veritatis corrupti consequatur. Autem, magni.
                </Typography>
                <Typography
                    onClick={toggleExpanded}
                    sx={{ cursor: 'pointer', color: '#1783FE', textDecoration: 'underline' }}
                >
                    {expanded ? 'Read less' : 'Read more'}
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="black"
                sx={{ color: '#fff', borderRadius: '10px', p: 2 }}
                fullWidth
                onClick={handleAddToCart}
            >
                {loading ? <CircularProgress size={24} color='white' /> : "Add to Cart"}
            </Button>
        </Box>
    );
};

export default ShopDetails;
