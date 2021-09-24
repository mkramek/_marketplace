import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, Typography, ImageList, ImageListItem, ImageListItemBar, withWidth, isWidthDown } from '@material-ui/core';
import AddToCart from './../cart/AddToCart';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        textAlign: 'left',
        padding: '0 8px'
    },
    container: {
        minWidth: '100%',
        paddingBottom: '14px'
    },
    ImageList: {
        width: '100%',
        minHeight: 200,
        padding: '16px 0 10px'
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        width: '100%'
    },
    tile: {
        textAlign: 'center'
    },
    image: {
        height: '100%'
    },
    tileBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        textAlign: 'left'
    },
    tileTitle: {
        fontSize: '1.1em',
        marginBottom: '5px',
        color: 'rgb(189, 222, 219)',
        display: 'block'
    }
}));

function Products(props) {
    const classes = useStyles();

    const getColsByWidth = () => {
        if (isWidthDown('md', props.width)) {
            return 1;
        }
        return 3;
    };

    return (
        <div className={classes.root}>
            {props.products.length > 0 ?
                (<div className={classes.container}>
                    <ImageList rowHeight={200} className={classes.ImageList} cols={getColsByWidth()}>
                        {props.products.map((product, i) => (
                            <ImageListItem key={i} className={classes.tile}>
                                <Link to={"/product/" + product._id}><img className={classes.image} src={'/api/product/image/' + product._id} alt={product.name} /></Link>
                                <ImageListItemBar className={classes.tileBar}
                                    title={<Link to={"/product/" + product._id} className={classes.tileTitle}>{product.name}</Link>}
                                    subtitle={<span>zł {product.price}</span>}
                                    actionIcon={
                                        <AddToCart item={product} />
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList></div>) : props.searched && (<Typography variant="subheading" component="h4" className={classes.title}>No products found! :(</Typography>)}
        </div>)
}

export default withWidth()(Products);

Products.propTypes = {
    products: PropTypes.array.isRequired,
    searched: PropTypes.bool.isRequired
};
