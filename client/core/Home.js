import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Suggestions from './../product/Suggestions';
import { listLatest, listCategories } from './../product/api-product.js';
import Search from './../product/Search';
import Categories from './../product/Categories';
import { withRouter } from 'react-router-dom';
import { useStyles } from '../styles';
import { read as readShop } from '../shop/api-shop';
import { read as readUser } from '../user/api-user';
import Swal from "sweetalert2";
import axios from 'axios';
import auth from "../auth/auth-helper";
import theme from "../theme";

function Home(props) {
    const classes = useStyles(theme);
    const [suggestionTitle, setSuggestionTitle] = useState("Najnowsze Produkty");
    const [categories, setCategories] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        listLatest(signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setSuggestions(data)
            }
        });
        return function cleanup() {
            abortController.abort()
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        listCategories(signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setCategories(data)
            }
        });
        return function cleanup() {
            abortController.abort()
        }
    }, []);
    useEffect(() => {
        const jwt = auth.isAuthenticated();
        const abortController = new AbortController();
        const signal = abortController.signal;
        const cart = JSON.parse(localStorage.getItem('cart'));
        let summary = {};
        const postOrder = async () => {
            let counter = 0;
            while (counter < cart.length) {
                const item = cart[counter];
                const {product} = item;
                const shopData = await readShop({shopId: product.shop._id}, signal);
                const userData = await readUser({userId: shopData.owner._id}, {t: jwt.token}, signal);
                console.log(userData);
                const { email } = userData;
                console.log(shopData);
                if (typeof summary[shopData.owner._id] === "undefined") {
                    summary[shopData.owner._id] = {
                        email: email,
                        shop: shopData.name,
                        name: shopData.owner.name,
                        items: []
                    };
                }
                summary[shopData.owner._id].items = [...summary[shopData.owner._id].items, item];
                counter++;
            }
        };
        let htmlItemList = "";

    	const urlParams = new URLSearchParams(props.location.search);
        if (urlParams.get("payment_sent")) {
            const transaction = JSON.parse(localStorage.getItem('p24_order'));
            axios.post('/api/mail/send', {
                recipient: transaction.email,
                subject: 'Rozpoczęcie procesu płatności',
                content: `<h1>Witaj, ${transaction.name}!</h1><p>Rozpoczęto płatność za Twoje zamówienie. Po otrzymaniu środków wyślemy Ci maila ze szczegółami.</p><p>Dziękujemy za zakupy!<br />GreenDeal</p>`
            });
            postOrder().then(() => {
                console.log(summary);
                for (const [ownerId, data] of Object.entries(summary)) {
                    let items = [];
                    for (const item of data.items) {
                        items = [...items, {
                            name: item.product.name,
                            qty: item.quantity,
                            unit: item.product.unit,
                            shop: data.shop,
                            price: item.product.price
                        }];
                    }
                    for (const item of items) {
                        htmlItemList += `(${item.shop}, ${data.email}) ${item.name}: ${item.qty}${item.unit}, suma: ${(item.qty * item.price).toFixed(2)}<br />`;
                    }
                }
                Swal.fire("Płatność wysłana", `<p>Szczegóły:</p>${htmlItemList}`, "success");
            });
        }
    }, []);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Search categories={categories} />
                    <Categories categories={categories} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Suggestions products={suggestions} title={suggestionTitle} />
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Home);
