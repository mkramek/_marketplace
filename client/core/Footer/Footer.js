import React from 'react';
import frameLogo from '../../assets/logo/Frame_light.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paragraph: {
        margin: 5,
    },
    header: {
        marginTop: 5,
        marginBottom: 8
    }
}))

export default function Footer() {
    const classes = useStyles()
    return (
        <div style={{
            'background': 'radial-gradient(149.65% 300.38% at 61.77% 15.73%, rgba(113, 210, 117, 0.65) 0%, rgba(83, 171, 148, 0.39) 100%)',
            'display': 'flex', 'justifyContent': 'space-between', 'margin': '12px', 'backgroundImage': 'url(' + frameLogo + ')', 'backgroundSize': 'contain', 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center'
        }}>
            <div style={{
                'background': 'linear-gradient(270deg, rgba(223, 237, 228, 0.11) 53.54%, rgba(225, 233, 202, 0.96) 88.89%)', 'paddingLeft': '15px'
            }}>
                <h3 className={classes.header}>Green Deal</h3>
                <p className={classes.paragraph}>O nas</p>
                <p className={classes.paragraph}>Regulamin</p>
                <p className={classes.paragraph}>Cookies</p>
                <p className={classes.paragraph}>NewsLetter</p>
                <p className={classes.paragraph}>Polityka Prywatności</p>
            </div>

            <div style={{
                'background': 'linear-gradient(270deg, rgba(225, 233, 202, 0.96) 53.54%, rgba(223, 237, 228, 0.11) 88.89%)', 'paddingRight': '15px'
            }}>
                <h3 className={classes.header}>Help Center</h3>
                <p className={classes.paragraph}>Pomoc</p>
                <p className={classes.paragraph}>Kontakt</p>
                <p className={classes.paragraph}>Zglos Nadużycie</p>
                <p className={classes.paragraph}>Reklama</p>
            </div>
        </div>

    )
}

