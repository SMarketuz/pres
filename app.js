const express = require('express')
const app = express();
const config = require('config')
require('./server/db')()
require('./server/apis')(app)

console.log(config.get('server_name'));
console.log(config.get('token_key'));

const port = process.env.PORT || 9090;
app.listen(port , () => {
    console.log(`${port} chi port ishga tushdi`);
})