const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { UserRegister } = require('../models/register');
const jwt = require('jsonwebtoken');
const config = require('config')

router.post('/login', async (req, res) => {
    const {phoneNumber, password} = req.body

    if (!phoneNumber || !password)
        return res.status(400).json({
            status: false,
            message: "Ma'lumot to'lq emas"
        })

    try {
        const user = await UserRegister.findOne({ phoneNumber })
        
        const validPassword = await bcrypt.compare(password, user.password)

        if (!user)
            return res.status(400).json({
                status: false,
                message: "Parol yoki Username xato"
            });


        if (!validPassword)
            return res.status(400).json({
                status: false,
                message: "Parol yoki Username xato"
            });

        const token = jwt.sign({ user: user._id }, config.get('token_key'), { expiresIn: '30d' })
        res.json({
            status: true,
            message: "Foidalanuvchi profilga kirdi",
            token: token,
            user_id: user._id,
            userId: user.userId
        })

    } catch (error) {
        return res.json({
            status: false,
            message: "Parol yoki Username xato"
        })
    }





})






module.exports = router