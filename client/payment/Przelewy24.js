import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import auth from '../auth/auth-helper';
import config from '../../config/config';
import { v5 as uuid5 } from 'uuid';
import crypto from 'crypto';

export default class Przelewy24 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
    }

    registerTransaction(data) {
        const now = new Date().toISOString();
        const sessID = uuid5(now, '0ce45a44-bc74-5fab-8b4c-560188650874');
        const hash = crypto.createHash('sha384');
        const hashData = {
            sessionId: sessID,
            merchantId: config.p24_merchant_id,
            amount: data.amount,
            currency: "PLN",
            crc: config.p24_crc
        };
        const generatedSign = hash.update(JSON.stringify(hashData)).digest("hex");
        const transaction = {
            merchantId: config.p24_merchant_id,
            posId: config.p24_pos_id,
            description: `Zamówienie ${now}`,
            language: "PL",
            currency: "PLN",
            country: "PL",
            urlReturn: `${config.url}?payment_sent=true`,
            sessionId: sessID,
            sign: generatedSign,
            ...data
        };
        axios.post(`${config.p24_api_url}/transaction/register`, transaction, {auth: { username: config.p24_pos_id, password: config.p24_api_key }}).then(response => {
            const res = response.data;
            if (res.responseCode === 0) {
                this.setState({ token: res.data.token });
                console.log(res.data.token);
                window.open(`${config.p24_url}/trnRequest/${res.data.token}`);
            }
            localStorage.setItem('p24_order', JSON.stringify({ name: data.name, ...transaction }));
        });
    }

    getRedirectURL() {
        return `${config.p24_url}/trnRequest/${this.state.token}`;
    }

    verifyTransaction(data) {
        let verified = false;
        const transaction = {};
        return axios.put(`${config.p24_api_url}/transaction/verify`, transaction).then(response => {
            const { data } = response;
            verified = data.responseCode === 0 && data.data.status === 'success';
            return verified;
        });
    }
}
