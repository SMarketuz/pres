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
            message: "Bunday Tovar mavjud"
        })
  
    res.json({
        status: true,
        message: "Tovar qo'shildi",
        data: product,
    })
    try {

    } catch (err) {
        res.status(500).json({
            message: "Serverda muammo mavjud"
        })
    }
}) 

router.get('/get',auth, async (req , res) => {
    const data = await (await Product.find()).reverse()
    .select({__v: 0})
    .populate('userId')
    res.json({data, massage: "Barcha tovarlar"})
})

router.delete('/delete/:id',auth, async (req , res) => {
    const data = await Product.deleteOne({_id: req.params.id})
    res.json({data, massage: "Tovar ochirildi"})
})

module.exports = router