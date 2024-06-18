const { default: mongoose } = require("mongoose");

const userRegisterSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    userId: {
        type: Number,
        required: true
    }
});

const UserRegister = mongoose.model('userRegisterSchema' , userRegisterSchema);
exports.UserRegister = UserRegister