const express = require('express');
const router = express.Router();
const { UserRegister } = require('../models/register')
const bcrypt = require('bcrypt');
// const auth = require('../middleware/tokenVer');

router.post('/create', async (req, res) => {
    
    try {
        const { phoneNumber, password, gender, name } = req.body;
        const validUser = await UserRegister.findOne({phoneNumber})
        const dataLenght = await UserRegister.find()

        const user = await UserRegister({
            phoneNumber,
            password: await bcrypt.hash(password , 10),
            gender,
            name,
            userId: dataLenght.length == 0 ? 1 : dataLenght.length
        })
        await user.save()

        if (!phoneNumber || !password || !gender || !name)
            return res.status(400).json({
                status: false,
                message: "Ma'lumot to'lq emas"
            })

        
        if(name.length < 3) 
            return res.status(400).json({
                status: false,
                massage: "Ism juda kichik"
            })

        if (validUser)
            return res.status(400).json({
                status: false,
                message: "Bunday telefon raqam mavjud"
            })
      
        res.json({
            status: true,
            message: "Foidalanuvchi ro'yxatdan o'tdi",
        })

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