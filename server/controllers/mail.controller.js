import nodemailer from 'nodemailer';
import config from "../../config/config";

const EMAIL_FROM = 'contact@green-deal.app';

const sendEmail = (req, res) => {
    const { body } = req;
    const mailParams = {
        from: EMAIL_FROM,
        to: body.recipient,
        subject: body.subject,
        html: body.content
    };

    const transport = nodemailer.createTransport({
        service: 'SendGrid',
    	auth: {
    	    user: config.sendgrid_api_user,
    	    pass: config.sendgrid_api_key
    	}
    });

    return transport.sendMail(mailParams, (err, info) => {
        if (err) {
            return res.send({ sent: false, error: err.toString() });
        }
        return res.send({ sent: true, error: "", recipient: body.recipient });
    });
};

export default {
    sendEmail
}
