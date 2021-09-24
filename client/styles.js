import { makeStyles } from '@material-ui/core';
import { Constants } from './constants';

export const useStyles = makeStyles((theme) => ({
    // Global
    global_formcontrol: {
        margin: theme.spacing(1),
        minWidth: 160
    },
    // Menu
    menu_toolbar_dropdown: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: '1em'
    },
    menu_dropdown_btn: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'black'
    },
    menu_dropdown_btn_label: {
        marginLeft: 10
    },
    // Search
    search_card: {
        padding: theme.spacing(2),
        backgroundColor: '#DDE7C8'
    },
    search_menu: {
        width: '100%',
    },
    search_field: {
        width: '100%',
    },
    search_container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // Cart
    cart_root: {
        flexGrow: 1,
        margin: 30,
    },
    cart_card: {
        padding: 16,
        backgroundColor: '#80808017'
    },
    cart_title: {
        fontWeight: 'bold',
        color: theme.palette.openTitle
    },
    cart_subheading: {
        color: 'rgba(88, 114, 128, 0.87)',
        marginTop: "20px",
    },
    cart_addressfield: {
        marginTop: "4px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "45%"
    },
    cart_streetfield: {
        marginTop: "4px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "93%"
    },
    cart_textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "90%"
    },
    cart_p24img: {
        maxWidth: "80px"
    },
    cart_p24btn: {
        backgroundColor: "white",
        margin: '0 auto'
    },
    // CartItems
    cartitems_card: {
        margin: 12,
        padding: 16,
        backgroundColor: '#80808017'
    },
    cartitems_price: {
        color: theme.palette.text.secondary,
        display: 'inline'
    },
    cartitems_textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    cartitems_producttitle: {
        fontSize: '1.15em',
        marginBottom: '5px'
    },
    cartitems_subheading: {
        color: 'rgba(88, 114, 128, 0.67)',
        padding: '8px 10px 0',
        cursor: 'pointer',
        display: 'inline-block'
    },
    cartitems_cart: {
        padding: Constants.CARD_PADDING
    },
    cartitems_details: {
        display: 'inline-block',
        width: "100%",
        padding: "4px"
    },
    cartitems_content: {
        flex: '1 0 auto',
        padding: '16px 8px 0px'
    },
    cartitems_cover: {
        width: 160,
        height: 125,
        margin: '8px'
    },
    cartitems_itemtotal: {
        float: 'right',
        marginRight: '40px',
        fontSize: '1.5em',
        color: 'rgb(72, 175, 148)'
    },
    cartitems_checkout: {
        float: 'right',
        margin: '24px'
    },
    cartitems_total: {
        fontSize: '1.2em',
        color: 'rgb(53, 97, 85)',
        textAlign: 'center',
        fontWeight: '600',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    cartitems_continuebtn: {
        marginLeft: '10px'
    },
    cartitems_itemshop: {
        display: 'block',
        fontSize: '0.90em',
        color: '#78948f'
    },
    cartitems_removebutton: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    },
    cartitem_image: {
        maxWidth: '100%'
    }
}));