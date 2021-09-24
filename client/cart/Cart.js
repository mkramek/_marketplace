import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../styles';
import CartItems from './CartItems';
import { StripeProvider } from 'react-stripe-elements';
import config from './../../config/config';
import Checkout from './Checkout';
import P24Logo from '../assets/images/przelewy24.png';

export default function Cart() {
    const classes = useStyles();
    const [checkout, setCheckout] = useState(false);

    const showCheckout = val => {
        setCheckout(val)
    };

    return (<div className={classes.card_root}>
        <Grid container>
            <Grid item xs={12} md={6}>
                <CartItems checkout={checkout}
                    setCheckout={showCheckout} />
            </Grid>
            {checkout &&
                <Grid item xs={12} md={6}>
                    {/* <StripeProvider apiKey={config.stripe_test_api_key}> */}
                        <Checkout />
                    {/* </StripeProvider> */}
                </Grid>}
        </Grid>
    </div>)
}
