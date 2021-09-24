import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}));

export default function ResetPassword(props) {
    const location = useLocation();
    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        password_confirm: '',
        error: '',
        redirectToReferrer: false
    });

    const clickSubmit = () => {
        if (values.password !== values.password_confirm) {
            setValues({ ...values, error: 'Hasła się nie zgadzają' });
        } else {
            const urlParams = new URLSearchParams(location.search);
            axios.post('/api/password/change', {
                email: urlParams.get('email'),
                password_token: urlParams.get('token'),
                password: values.password
            }).then((response) => {
                const { data } = response;
                if (!data.error) {
                    Swal.fire('Sukces', 'Hasło zostało zmienione', 'success')
                } else {
                    Swal.fire('Błąd', `Treść błędu: ${data.error}`, 'error');
                }
            });
        }
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    };

    const { from } = props.location.state || {
        from: {
            pathname: '/'
        }
    };
    const { redirectToReferrer } = values;
    if (redirectToReferrer) {
        return (<Redirect to={from} />)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" className={classes.title}>
                    Zresetuj hasło
                </Typography>
                <TextField id="password" type="password" label="Nowe hasło" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" /><br />
                <TextField id="confirm_password" type="password" label="Potwierdź hasło" className={classes.textField} value={values.password_confirm} onChange={handleChange('password_confirm')} margin="normal" /><br />
                <br /> {
                values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                </Typography>)
            }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Zmień hasło</Button>
            </CardActions>
        </Card>
    )
}


