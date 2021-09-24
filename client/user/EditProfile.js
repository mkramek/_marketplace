import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import auth from './../auth/auth-helper';
import { read, update } from './api-user.js';
import {Divider} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  }
}))

export default function EditProfile({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    seller: false,
    company_name: '',
    company_tax_id: '',
    company_address_line_1: '',
    company_address_line_2: '',
    accept_newsletter: false,
    redirectToProfile: false,
    error: ''
  })
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values,
          name: data.name,
          email: data.email,
          seller: data.seller,
          company_name: data.company_name,
          company_tax_id: data.company_tax_id,
          company_address_line_1: data.company_address_line_1,
          company_address_line_2: data.company_address_line_2,
          accept_newsletter: data.accept_newsletter,
        })
      }
    })
    return function cleanup() {
      abortController.abort()
    }

  }, [match.params.userId])

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      seller: values.seller || undefined,
      accept_newsletter: values.accept_newsletter || false
    }
    update({
      userId: match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error })
      } else {
        auth.updateUser(data, () => {
          setValues({ ...values, userId: data._id, redirectToProfile: true })
        })
      }
    })
  }
  const handleChange = name => event => {
    if (event.target.hasOwnProperty('checked')) {
      setValues({...values, [name]: event.target.checked})
    } else {
      setValues({...values, [name]: event.target.value})
    }
  }
  const handleCheck = (event, checked) => {
    setValues({ ...values, 'seller': checked })
  }

  if (values.redirectToProfile) {
    return (<Redirect to={'/user/' + values.userId} />)
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edytuj Profil
        </Typography>
        <TextField id="name" label="Nazwa" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
        <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
        <TextField id="password" type="Hasło" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" />
        <Divider />
        <TextField id="company_name" label="Nazwa firmy" className={classes.textField} value={values.company_name} onChange={handleChange('company_name')} margin="normal" />
        <TextField id="company_tax_id" label="Numer NIP" className={classes.textField} value={values.company_tax_id} onChange={handleChange('company_tax_id')} margin="normal" />
        <TextField id="company_address_line_1" label="Adres firmy" className={classes.textField} value={values.company_address_line_1} onChange={handleChange('company_address_line_1')} margin="normal" />
        <TextField id="company_address_line_2" label="Kod pocztowy i miasto" className={classes.textField} value={values.company_address_line_2} onChange={handleChange('company_address_line_2')} margin="normal" />
        <Typography variant="subtitle1" className={classes.subheading}>
          Konto Sprzedawcy
        </Typography>
        <FormControlLabel
          control={
            <Switch classes={{
              checked: classes.checked,
              bar: classes.bar,
            }}
              checked={values.seller}
              onChange={handleCheck}
            />}
          label={values.seller ? 'Active' : 'Inactive'}
        />
        <br /> {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Zatwierdź</Button>
      </CardActions>
    </Card>
  )
}
