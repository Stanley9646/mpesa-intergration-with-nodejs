const router =require('express').Router();

const {createToken, stkPush} = require('../controller/token')

router.post('/', createToken,stkPush)

module.exports=router;