const express = require('express');
const router = express.Router();
const { Product } = require('../models/createProd');
const auth = require('../middleware/tokenVer');
// const auth = require('../middleware/tokenVer');

router.post('/create',auth, async (req, res) => {
    
    const { trecCode, productName } = req.body;
    const trecCodeGet = await Product.findOne({trecCode})
    // const dataLenght = await UserRegister.find()

    const product = await Product({
        trecCode,
        productName,
        userId: req.user
    })
    await product.save()

    if (!trecCode || !productName)
        return res.status(400).json({
            status: false,
            message: "Ma'lumot to'lq emas"
        })

    if (trecCodeGet)
        return res.status(400).json({
            status: false,
            message: "Bunday telefon raqam mavjud"
        })
  
    res.json({
        status: true,
        message: "Foidalanuvchi ro'yxatdan o'tdi",
        data: product,
    })
    try {

    } catch (err) {
        res.status(500).json({
            message: "Serverda muammo mavjud"
        })
    }
})

// router.get('/get',auth, async (req , res) => {
//     const data = await User.findById({_id: req.user._id})
//     .select({password: 0})
//     res.json(data)
// })

module.exports = router