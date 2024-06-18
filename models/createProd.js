const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    trecCode: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Product = mongoose.model('Product' , productSchema);
exports.Product = Product