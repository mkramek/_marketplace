import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider, MenuItem, TextField, Button, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { list } from './api-product.js';
import Products from './Products';
import { useStyles } from '../styles';
import theme from '../theme';

export default function Search(props) {
    const classes = useStyles(theme);
    const [values, setValues] = useState({
        category: '',
        search: '',
        results: [],
        searched: false
    });
    const handleChange = name => event => {
        setValues({
            ...values, [name]: event.target.value,
        })
    };
    const search = () => {
        if (values.search) {
            list({
                search: values.search || undefined, category: values.category
            }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setValues({ ...values, results: data, searched: true })
                }
            })
        }
    };
    const enterKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            search()
        }
    };
    return (
        <div>
            <Card className={classes.search_card}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.search_container}>
                            <TextField
                                id="select-category"
                                select
                                label="Kategoria"
                                className={classes.search_field}
                                value={values.category}
                                onChange={handleChange('category')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.search_menu,
                                    },
                                }}
                                variant={'outlined'}
                            >
                                <MenuItem value="All">
                                    Wszystkie
                                </MenuItem>
                                {props.categories.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.search_container}>
                            <TextField
                                id="search"
                                label="Szukaj..."
                                type="search"
                                onKeyDown={enterKey}
                                onChange={handleChange('search')}
                                className={classes.search_field}
                                variant={'outlined'}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.search_container}>
                            <Button variant="contained" color={'primary'} size={'large'} onClick={search} startIcon={<SearchIcon />}>
                                Szukaj
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Products products={values.results} searched={values.searched} />
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
Search.propTypes = {
    categories: PropTypes.array.isRequired
};