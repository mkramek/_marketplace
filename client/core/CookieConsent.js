import React from 'react';
import { Paper, Button, makeStyles, Grid } from '@material-ui/core';
import theme from '../theme';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
    cookie_consent_window: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: 'auto',
        minWidth: '20%',
        backgroundColor: 'white',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        flexFlow: 'row-reverse wrap',
    },
    cookie_consent_btn: {
        marginBottom: theme.spacing(1),
        width: '100%',
    }
}));

export default function CookieConsent(props) {
    const classes = useStyles(theme);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie_consent']);
    const [visible, setVisible] = React.useState(true);
    React.useEffect(() => {
        if (cookies.cookie_consent === "true") {
            setVisible(false);
        }
    }, []);
    const handleCookieConsent = () => {
        setCookie('cookie_consent', true, { path: '/' });
        setVisible(false);
    };
    return (
        <Paper elevation={5} className={classes.cookie_consent_window} style={{ display: visible ? 'flex' : 'none' }}>
            <Grid container>
                <Grid item xs={12}>
                    <p>Nasza strona używa plików cookies. Korzystając z&nbsp;niej akceptujesz naszą Politykę cookies zawartą w&nbsp;Polityce prywatności i&nbsp;wyrażasz zgodę na używanie plików cookies według aktualnych ustawień swojej przeglądarki. Poznaj szczegóły i&nbsp;możliwości ustawień w&nbsp;ustawieniach plików cookies.</p>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Button className={classes.cookie_consent_btn} variant="contained" color="primary" onClick={handleCookieConsent}>Wyrażam zgodę</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button className={classes.cookie_consent_btn} variant="outlined" color="secondary">Więcej</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}