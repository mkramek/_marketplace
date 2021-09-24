import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Search } from '@material-ui/icons';
import {
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Icon,
    Button,
    Typography,
    Divider,
    TextField,
    InputAdornment
} from '@material-ui/core';
import auth from './../auth/auth-helper';
import { listByOwner } from './api-shop.js';
import DeleteShop from './DeleteShop';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5)
    }),
    title: {
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    addButton: {
        float: 'right'
    },
    leftIcon: {
        marginRight: "8px"
    },
    searchInput: {
        paddingLeft: "16px"
    }
}))

export default function MyShops() {
    const classes = useStyles()
    const [limited, setLimited] = useState(false);
    const [shops, setShops] = useState([])
    const [prevShops, setPrevShops] = useState([]);
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()
    const handleSearch = (event) => {
        const shopName = event.target.value;
        setShops(prevShops.filter((shop) => {
            return shop.name.toLowerCase().includes(shopName.toLowerCase());
        }));
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        listByOwner({
            userId: jwt.user._id
        }, { t: jwt.token }, signal).then((data) => {
            if (data.error) {
                setRedirectToSignin(true)
            } else {
                if (data.length >= 1) {
                    setLimited(true)
                } else {
                    setLimited(false)
                }
                setShops(data)
                setPrevShops(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const removeShop = (shop) => {
        const updatedShops = [...shops]
        const index = updatedShops.indexOf(shop)
        updatedShops.splice(index, 1)
        setShops(updatedShops)
        setLimited(updatedShops.length > 0)
    }

    if (redirectToSignin) {
        return <Redirect to='/signin' />
    }
    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography type="title" className={classes.title}>
                    Twoje Sklepy
                    <TextField
                        className={classes.searchInput}
                        placeholder="Szukaj"
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <span className={classes.addButton}>
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={limited}
                            component={Link}
                            to={'/seller/shop/new'}
                        >
                            <Icon className={classes.leftIcon}>add_box</Icon>  Nowy sklep
                        </Button>
                    </span>
                </Typography>
                <List dense>
                    {shops.map((shop, i) => {
                        return <span key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar src={'/api/shops/logo/' + shop._id + "?" + new Date().getTime()} />
                                </ListItemAvatar>
                                <ListItemText primary={shop.name} secondary={shop.description} />
                                {auth.isAuthenticated().user && auth.isAuthenticated().user._id == shop.owner._id &&
                                    (<ListItemSecondaryAction>
                                        <Link to={"/seller/orders/" + shop.name + '/' + shop._id}>
                                            <Button aria-label="Orders" color="primary">
                                                Sprawdź Zamówienia
                                            </Button>
                                        </Link>
                                        <Link to={"/seller/shop/edit/" + shop._id}>
                                            <IconButton aria-label="Edit" color="primary">
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                        <DeleteShop shop={shop} onRemove={removeShop} />
                                    </ListItemSecondaryAction>)
                                }
                            </ListItem>
                            <Divider />
                        </span>
                    })}
                </List>
            </Paper>
        </div>)
}
