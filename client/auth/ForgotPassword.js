import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import swal from 'sweetalert';

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

export default function ForgotPassword(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        password_confirm: '',
        error: '',
        redirectToReferrer: false
    });

    const clickSubmit = () => {
        axios.post('/api/password', { email: values.email }).then((response) => {
            const { data } = response;
            if (data.user.length > 0 || data.password_token.length > 0) {
                axios.post('/api/mail/send', {
                    recipient: values.email,
                    subject: 'Resetowanie hasła',
                    content: `Twój link do resetowania hasła: http://192.248.144.207/password-reset?user=${data.user.email || data.email}&token=${data.user.password_token || data.password_token}`
                }).then((emailResponse) => {
                    if (!emailResponse.data.error) {
                        swal('Link wysłany', 'Na podany adres e-mail został wysłany link do zresetowania hasła.', 'success');
                    } else {
                        swal('Błąd', 'Wystąpił błąd podczas próby wysłania e-maila.', 'error');
                    }
                });
            }
        })
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
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
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


