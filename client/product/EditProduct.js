import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon, Avatar, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import auth from './../auth/auth-helper';
import FileUpload from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { read, update } from './api-product.js';
import theme from "../theme";


const useStyles = makeStyles(theme => ({
    card: {
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        maxWidth: 500,
        paddingBottom: theme.spacing(2)
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    error: {
        verticalAlign: 'middle'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
    },
    input: {
        display: 'none'
    },
    filename: {
        marginLeft: '10px'
    }
}));

export default function EditProduct({ match }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: '',
        category: '',
        quantity: '',
        price: '',
        unit: '',
        redirect: false,
        error: ''
    });

    const jwt = auth.isAuthenticated();
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        read({
            productId: match.params.productId
        }, signal).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, id: data._id, name: data.name, description: data.description, category: data.category, quantity: data.quantity, price: data.price, unit: data.unit })
            }
        });
        return function cleanup() {
            abortController.abort()
        }
    }, []);
    const clickSubmit = () => {
        let productData = new FormData();
        values.name && productData.append('nazwa', values.name);
        values.description && productData.append('opis', values.description);
        values.image && productData.append('obraz', values.image);
        values.category && productData.append('kategoria', values.category);
        values.quantity && productData.append('ilość', values.quantity);
        values.price && productData.append('cena', values.price);
        values.unit && productData.append('jednostka', values.unit);

        update({
            shopId: match.params.shopId,
            productId: match.params.productId
        }, {
            t: jwt.token
        }, productData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, 'redirect': true })
            }
        })
    };
    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[0]
            : event.target.value;
        setValues({ ...values, [name]: value })
    };
    const imageUrl = values.id
        ? `/api/product/image/${values.id}?${new Date().getTime()}`
        : '/api/product/defaultphoto';
    if (values.redirect) {
        return (<Redirect to={'/seller/shop/edit/' + match.params.shopId} />)
    }
    return (<div>
        <Card className={classes.card}>
            <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                    Edytuj produkt
                </Typography><br />
                <Avatar src={imageUrl} className={classes.bigAvatar} /><br />
                <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" color="secondary" component="span">
                        Zmień obraz
                        <FileUpload />
                    </Button>
                </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br />
                <TextField id="name" label="Imię" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
                <TextField
                    id="multiline-flexible"
                    label="Opis"
                    multiline
                    rows="3"
                    value={values.description}
                    onChange={handleChange('description')}
                    className={classes.textField}
                    margin="normal"
                /><br />
                <TextField id="category" label="Kategoria" className={classes.textField} value={values.category} onChange={handleChange('category')} margin="normal" /><br />
                <TextField id="quantity" label="Ilość" className={classes.textField} value={values.quantity} onChange={handleChange('quantity')} type="number" margin="normal" /><br />
                <TextField id="price" label="Cena" className={classes.textField} value={values.price} onChange={handleChange('price')} type="number" margin="normal" /><br />
                <FormControl>
                    <InputLabel style={{ marginLeft: theme.spacing(1) }} id="unit-label">Unit</InputLabel>
                    <Select
                        className={classes.textField}
                        margin="normal"
                        labelId="unit-label"
                        id="unit-select"
                        value={values.unit}
                        align="left"
                        onChange={handleChange('unit')}
                    >
                        <MenuItem value={''}>-</MenuItem>
                        <MenuItem value={'g'}>grams</MenuItem>
                        <MenuItem value={'dag'}>decagrams</MenuItem>
                        <MenuItem value={'kg'}>kilograms</MenuItem>
                        <MenuItem value={'pcs'}>pieces</MenuItem>
                    </Select>
                </FormControl>
                {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Aktualizuj</Button>
                <Link to={'/seller/shops/edit/' + match.params.shopId} className={classes.submit}><Button variant="contained">Anuluj</Button></Link>
            </CardActions>
        </Card>
    </div>)
}
