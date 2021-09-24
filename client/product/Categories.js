import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, Typography, Divider, ImageList, ImageListItem, Icon, withWidth, isWidthDown } from '@material-ui/core';
import { list } from './api-product.js';
import Products from './Products';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
    },
    ImageList: {
        flexWrap: 'nowrap',
        width: '100%',
        transform: 'translateZ(0)',
    },
    tileTitle: {
        verticalAlign: 'middle',
        lineHeight: 2.5,
        textAlign: 'center',
        fontSize: '1.35em',
        margin: '0 4px 0 0',
        cursor: 'pointer',
    },
    card: {
        margin: 'auto',
        marginTop: 20
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        backgroundColor: '#80808024',
        fontSize: '1.1em'
    },
    icon: {
        verticalAlign: 'sub',
        color: '#738272',
        fontSize: '0.9em'
    },
    link: {
        color: '#4d6538',
        textShadow: '0px 2px 12px #ffffff',
        cursor: 'pointer'
    }
}));

function Categories(props) {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState('default'); // props.categories[0]
    const [allListing, setAllListing] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        list().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        });

        return function cleanup() {
            abortController.abort()
        }
    }, []);

    const listbyCategory = category => event => {
        setSelected(category);
        setAllListing(category === 'default');
        if (category === 'default') {
            list().then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setProducts(data)
                }
            });
        } else {
            list({
                category: category
            }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setProducts(data)
                }
            })
        }
    };

    const getColsByWidth = () => {
        if (isWidthDown('md', props.width)) {
            return 2;
        }
        return 4;
    };

    return (
        <div>
            <Card className={classes.card}>
                <Typography type="title" className={classes.title}>
                    Przeglądaj według kategorii
                </Typography>
                <div className={classes.root}>
                    <ImageList className={classes.ImageList} cols={getColsByWidth()}>
                        <ImageListItem onClick={listbyCategory('default')} key={-1} className={classes.tileTitle} style={{ height: 64, backgroundColor: allListing ? 'rgba(95, 139, 137, 0.56)' : 'rgba(95, 124, 139, 0.32)' }}>
                            <span className={classes.link}>Wszystko  <Icon className={classes.icon}>{allListing && 'arrow_drop_down'}</Icon></span>
                        </ImageListItem>
                        {props.categories.map((tile, i) => (
                            <ImageListItem onClick={listbyCategory(tile)} key={i} className={classes.tileTitle} style={{ height: '64px', backgroundColor: selected === tile ? 'rgba(95, 139, 137, 0.56)' : 'rgba(95, 124, 139, 0.32)' }}>
                                <span className={classes.link}>{tile}  <Icon className={classes.icon}>{selected === tile && 'arrow_drop_down'}</Icon></span>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <Divider />
                <Products products={products} searched={false} />
            </Card>
        </div>
    )
}

export default withWidth()(Categories);

Categories.propTypes = {
    categories: PropTypes.array.isRequired
};
