; import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, Grid, CardContent, CardMedia, Button, TextField, Typography, Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from '../styles';
import theme from '../theme';
import cart from './cart-helper.js';
import auth from './../auth/auth-helper';

export default function CartItems(props) {
    const classes = useStyles(theme);
    const [cartItems, setCartItems] = useState(cart.getCart());

    const handleChange = index => event => {
        let updatedCartItems = cartItems;
        if (event.target.value == 0) {
            updatedCartItems[index].quantity = 1
        } else {
            updatedCartItems[index].quantity = event.target.value
        }
        setCartItems([...updatedCartItems]);
        cart.updateCart(index, event.target.value)
    };

    const getTotal = () => {
        return cartItems.reduce((a, b) => {
            let price = a + (b.quantity * b.product.price);
            return Math.ceil((price + Number.EPSILON) * 100) / 100;
        }, 0).toFixed(2)
    };

    const getItemTotal = (item) => {
        let price = item.quantity * item.product.price;
        const roundedPrice = Math.ceil((price + Number.EPSILON) * 100) / 100;
        return roundedPrice.toFixed(2);
    };

    const removeItem = index => event => {
        let updatedCartItems = cart.removeItem(index);
        if (updatedCartItems.length == 0) {
            props.setCheckout(false)
        }
        setCartItems(updatedCartItems)
    };

    const openCheckout = () => {
        props.setCheckout(true)
    };

    return (
        <Card className={classes.cartitems_card}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography align="center" type="title" variant="h5" className={classes.cart_title}>Twój koszyk</Typography>
                </Grid>
                <Grid item xs={12}>
                    {cartItems.length > 0 ? (
                        <Grid container>
                            {cartItems.map((item, i) => {
                                return (
                                    <Grid item xs={12} key={i}>
                                        <Card className={classes.cartitems_cart}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={4}>
                                                    <CardMedia
                                                        className={classes.cover}
                                                        children={<img className={classes.cartitem_image} src={`/api/product/image/${item.product._id}`} />}
                                                        title={item.product.name}
                                                    />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            <CardContent>
                                                                <Link to={'/product/' + item.product._id}>
                                                                    <Typography type="title" component="h3" className={classes.cartitem_producttitle} color="primary">{item.product.name}</Typography>
                                                                </Link>
                                                                <div>
                                                                    <Typography type="subheading" component="h3" className={classes.cartitem_price} color="primary">{item.product.price} PLN</Typography>
                                                                    <span className={classes.cartitem_itemtotal}>razem {getItemTotal(item)} PLN</span><br />
                                                                    <span className={classes.cartitem_itemshop}>Sklep: {item.product.shop.name}</span>
                                                                </div>
                                                            </CardContent>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container justifyContent={'center'} alignItems={'center'}>
                                                                <Grid item xs={8}>
                                                                    <TextField
                                                                        label="Ilość"
                                                                        variant={"outlined"}
                                                                        value={item.quantity}
                                                                        onChange={handleChange(i)}
                                                                        type="number"
                                                                        inputProps={{
                                                                            min: 1
                                                                        }}
                                                                        className={classes.cartitems_textfield}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <Button className={classes.cartitems_removebutton} size="large" color="primary" onClick={removeItem(i)}>x Usuń</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        <Divider />
                                    </Grid>
                                );
                            })
                            }
                            <Grid item xs={12}>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={12} className={classes.cartitems_total}>
                                        <Typography variant="h5">Suma: {getTotal()} PLN</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {!props.checkout && (auth.isAuthenticated() ?
                                            <Button color="secondary" variant="contained" onClick={openCheckout} fullWidth>Podsumowanie</Button>
                                            :
                                            <Link to="/signin">
                                                <Button color="primary" variant="contained" fullWidth>Zaloguj się aby zrealizować zamówienie</Button>
                                            </Link>)}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Link to='/' className={classes.continueBtn}>
                                            <Button variant="contained" fullWidth>Kontynuuj Zakupy</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) :
                        <Typography variant="subtitle1" component="h3" color="primary">Koszyk jest pusty.</Typography>
                    }
                </Grid>
            </Grid>
        </Card>
    )
}

CartItems.propTypes = {
    checkout: PropTypes.bool.isRequired,
    setCheckout: PropTypes.func.isRequired
};
