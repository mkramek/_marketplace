import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, TextField, Typography, Icon, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { create } from './api-user.js';
import axios from 'axios';

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
        width: 300,
        textAlign: 'justify'
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    justified: {
        textAlign: 'justify'
    }
}))

export default function Signup() {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        company_name: '',
        company_tax_id: '',
        company_address_line_1: '',
        company_address_line_2: '',
        accept_terms: false,
        accept_newsletter: false,
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        if (event.target.hasOwnProperty('checked')) {
            setValues({...values, [name]: event.target.checked})
        } else {
            setValues({...values, [name]: event.target.value})
        }
    }

    const clickSubmit = () => {
        if (!values.accept_terms) {
            setValues({ ...values, error: 'Nie zaakceptowano Regulaminu'});
        } else {
            const user = {
                name: values.name || undefined,
                email: values.email || undefined,
                password: values.password || undefined,
                company_name: values.company_name || undefined,
                company_tax_id: values.company_tax_id || undefined,
                company_address_line_1: values.company_address_line_1 || undefined,
                company_address_line_2: values.company_address_line_2 || undefined,
                accept_newsletter: values.accept_newsletter || false
            }
            create(user).then((data) => {
                if (data.error) {
                    setValues({...values, error: data.error})
                } else {
                    axios.post('/api/mail/send', {
                        recipient: user.email,
                        subject: 'Utworzenie konta',
                        content: `<h1>Dzi??kujemy za utworzenie konta, ${user.name}!</h1><p>Nowe konto zosta??o utworzone. Mo??esz teraz <a href="http://192.248.144.207/signin">zalogowa?? si??</a> do sklepu i doda?? dane osobowe lub firmowe.</p><p>Udanych zakup??w!<br />GreenDeal</p>`
                    });
                    setValues({...values, error: '', open: true})
                }
            });
        }
    }
    return (<div>
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Zarejestruj Si??
                </Typography>
                <TextField id="name" label="Nazwa" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
                <TextField id="password" type="password" label="Has??o" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" /><br />
                <FormControlLabel
                    control={<Checkbox checked={values.is_company} onChange={handleChange('is_company')} name="gilad" />}
                    label="Konto firmowe?"
                /><br />
                {values.is_company && <>
                    <TextField id="company_name" label="Nazwa firmy" className={classes.textField} value={values.company_name} onChange={handleChange('company_name')} margin="normal" /><br />
                    <TextField id="company_tax_id" label="Numer NIP" className={classes.textField} value={values.company_tax_id} onChange={handleChange('company_tax_id')} margin="normal" /><br />
                    <TextField id="company_address_line_1" label="Adres firmy" className={classes.textField} value={values.company_address_line_1} onChange={handleChange('company_address_line_1')} margin="normal" /><br />
                    <TextField id="company_address_line_2" label="Kod pocztowy i miasto" className={classes.textField} value={values.company_address_line_2} onChange={handleChange('company_address_line_2')} margin="normal" /><br />
                </>}
                <div className={classes.justified}>
                    <FormControlLabel
                        style={{ display: "table", verticalAlign: "top" }}
                        control={<div style={{ display: 'table-cell' }}><Checkbox required={true} checked={values.accept_terms} onChange={handleChange('accept_terms')} name="accept_terms" /></div>}
                        label="(wymagane) Tak, uwa??nie zapozna??em si?? i akceptuj?? Regulamin serwisu i Polityk?? prywatno??ci, w tym zawart?? w niej Polityk?? cookies, obowi??zuj??ce u Administratora."
                    />
                    <FormControlLabel
                        style={{ display: "table", verticalAlign: "top" }}
                        control={<div style={{ display: 'table-cell' }}><Checkbox required={false} checked={values.accept_newsletter} onChange={handleChange('accept_newsletter')} name="accept_newsletter" /></div>}
                        label="Wyra??am zgod?? na otrzymywanie z&nbsp;Serwisu Green Deal bezp??atnego Newslettera zawieraj??cego informacje o promocjach i&nbsp;nowo??ciach i&nbsp;jednocze??nie o??wiadczam, ??e rozumiem, ??e w&nbsp;tym celu b??d?? przetwarzane moje dane osobowe (adres e-mail) przez Administratora Serwisu Green Deal czyli Mateusza Twarowskiego prowadz??cego dzia??alno???? gospodarcz?? pod firm?? ???Dietmat Mateusz Twarowski???. Jednocze??nie zosta??em poinformowany, ??e podanie przeze mnie danych osobowych jest dobrowolne oraz i?? zosta??em poinformowany o&nbsp;prawie ????dania dost??pu do moich danych osobowych, ich sprostowania (zmiany) oraz usuni??cia, ograniczenia przetwarzania oraz mo??liwo??ci odwo??ania udzielonej zgody w&nbsp;dowolnym momencie."
                    />
                </div>
                <br /> {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
        <Dialog open={values.open} disableBackdropClick={true}>
            <DialogTitle>Nowe Konto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Sukces! Nowe konto stworzone!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Link to="/signin">
                    <Button color="primary" autoFocus="autoFocus" variant="contained">
                        Zaloguj Si??
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    </div>
    )
}
