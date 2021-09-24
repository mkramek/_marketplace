import mailCtrl from './mail.controller';

const verifyPayment = (req, res) => {
    const { body } = req;

    const mailParams = {
        //TODO: Mail params for payment verification
    }
    
    //TODO: Call for sending email after payment verification
    res.status(200).send();
}

export default {
    verifyPayment
}
