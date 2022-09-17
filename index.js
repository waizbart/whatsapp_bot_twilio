const express = require('express');
const bodyParser = require('body-parser');

const MessageController = require('./app/controllers/MessageController');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', MessageController.post);


app.listen(3000, function () {
    console.log('Servidor ativo na porta 3000!');
})

