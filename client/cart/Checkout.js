import React, { useEffect, useState } from 'react';

import Card from '@material-ui/core/Card';
import { useStyles } from '../styles';
import { TextField, Typography, Icon, Button, Grid } from '@material-ui/core';
import { Elements } from 'react-stripe-elements';
import auth from './../auth/auth-helper';
import cart from './cart-helper.js';
import PlaceOrder from './PlaceOrder';
import P24 from '../assets/images/przelewy24.png';
import Przelewy24 from "../payment/Przelewy24";

export default function Checkout() {

    useEffect(() => {
        console.log(cart.getCart());
    }, []);

    const classes = useStyles();
    const user = auth.isAuthenticated().user;
    const [values, setValues] = useState({
        checkoutDetails: {
            products: cart.getCart(),
            customer_name: user.name,
            customer_email: user.email,
            delivery_address: { street: '', city: '', state: '', zipcode: '', country: '' }
        },
        error: ''
    });

    const handleCustomerChange = name => event => {
        let checkoutDetails = values.checkoutDetails;
        checkoutDetails[name] = event.target.value || undefined;
        setValues({ ...values, checkoutDetails: checkoutDetails })
    };

    const handleAddressChange = name => event => {
        let checkoutDetails = values.checkoutDetails;
        checkoutDetails.delivery_address[name] = event.target.value || undefined;
        setValues({ ...values, checkoutDetails: checkoutDetails })
    };

    const handleP24Transaction = (event) => {
        let checkoutDetails = values.checkoutDetails;
        const p24 = new Przelewy24();
        const { products } = checkoutDetails;
        let sum = 0;
        for (const product of products) {
            sum += product.product.price * product.quantity;
        }
        sum *= 100;
        p24.registerTransaction({
            amount: parseInt(sum.toFixed()),
            email: checkoutDetails.customer_email,
            address: checkoutDetails.delivery_address.street,
            zip: checkoutDetails.delivery_address.zipcode,
            city: checkoutDetails.delivery_address.city,
            client: checkoutDetails.customer_name
        });
    };

    return (
        <Card className={classes.cartitems_card}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography align="center" type="title" variant="h5" className={classes.cart_title}>Podsumowanie zamówienia</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth variant="outlined" id="name" label="Nazwa użytkownika" value={values.checkoutDetails.customer_name} onChange={handleCustomerChange('customer_name')} /><br />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth variant="outlined" id="email" type="email" label="Email" value={values.checkoutDetails.customer_email} onChange={handleCustomerChange('customer_email')} /><br />
                </Grid>
                <Grid item xs={12}>
                    <Typography type="subheading" component="h3" className={classes.cartitems_subheading}>Adres dostawy</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" id="street" label="Adres" value={values.checkoutDetails.delivery_address.street} onChange={handleAddressChange('street')} /><br />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth variant="outlined" id="city" label="Miasto" value={values.checkoutDetails.delivery_address.city} onChange={handleAddressChange('city')} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth variant="outlined" id="state" label="Województwo" value={values.checkoutDetails.delivery_address.state} onChange={handleAddressChange('state')} /><br />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth variant="outlined" id="zipcode" label="Kod pocztowy" value={values.checkoutDetails.delivery_address.zipcode} onChange={handleAddressChange('zipcode')} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth variant="outlined" id="country" label="Kraj" value={values.checkoutDetails.delivery_address.country} onChange={handleAddressChange('country')} />
                </Grid>
                <br /> {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                }
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <Button
                                className={classes.cart_p24btn}
                                onClick={handleP24Transaction}
                                size="large"
                            >
                                <Grid spacing={1} container direction="row" justifyContent="center" alignItems="center">
                                    <Grid item>
                                        <span>Złóż zamówienie z</span>
                                    </Grid>
                                    <Grid item>
                                        <img src={P24} className={classes.cart_p24img} alt="Przelewy24" />
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}