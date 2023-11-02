const axios = require ("axios");
require('dotenv').config();

const createToken = async (req, res, next) =>{

    const secret =process.env.secret;
    const consumer =process.env.consumer;
    const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");


    await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers :{
                authorization :`Basic ${auth}`,
            },
        }
        )
        .then ((data) => {
            token =data.data.access_token
            console.log(data.data)
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err.message)
        })
}

const stkPush = async (req,res) =>{
    const shortCode= 174379
    const phone=req.body.phone.substring(1)
    const amount =req.body.amount
    const passkey=process.env.passkey;
    const url="https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    const Date =new Date();
    const timestamp = getTimestamp();

    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")
const data = {
    "BusinessShortCode": process.env.shortcode,
                    "Password": password,
                    "Timestamp": timestamp,
                    "TransactionType": "CustomerPayBillOnline",
                    "Amount": amount,
                    "PartyA": `+254${phone}`,
                    "PartyB": process.env.shortCode,
                
                    "PhoneNumber": `+254${phone}`,
                    "CallBackURL": "",
                    "AccountReference": "Test 2",
                    "TransactionDesc": "Testing stk push"
};
await axios.post(url,data, {
    headers: {
        authorization:`Bearer ${token}`,
    }
}).then((data)=>{
    console.log(data);
    res.status(200).json(data.data)
    .catch((err) => {
        console.log(err)
        res.status(200).json(err.message)
    })

})
}

module.exports={createToken , stkPush}