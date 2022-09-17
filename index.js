const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/message', async function (req, res, next) {
    console.log('nova mensagem', req.body.Body);


    const opcoes = [
        'pedra', 'papel', 'tesoura'
    ];

    const perde = {
        'pedra': 'papel',
        'papel': 'tesoura',
        'tesoura': 'pedra'
    }

    const usuario = req.body.Body.toLowerCase();

    switch (usuario) {
        case 'pedra':
        case 'papel':
        case 'tesoura':
            // fazer a escolha do computador e responder quem ganhou
            const computador = opcoes[Math.floor(Math.random() * opcoes.length)];


            if (computador === usuario) {
                const twiml = new twilio.twiml.MessagingResponse();
                twiml.message('Ops, deu empate!');
                res.writeHead(200, { 'Content-Type': 'text/xml' });
                res.end(twiml.toString())
            } else {
                if (perde[computador] === usuario) {
                    const twiml = new twilio.twiml.MessagingResponse();
                    twiml.message(`Eu escolhi *${computador}*`);
                    twiml.message('Mas quero jogar de novoooo')
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                } else {

                    const twiml = new twilio.twiml.MessagingResponse();
                    twiml.message(`Eu escolhi *${computador}*`);
                    twiml.message('Ganhei! Ganhei!!!')
                    res.writeHead(200, { 'Content-Type': 'text/xml' });
                    res.end(twiml.toString());
                }
            }
            break;

        default:
            const twiml = new twilio.twiml.MessagingResponse();
            twiml.message('Digite pedra, papel ou tesoura!')
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString())

            console.log('fallback intent');

            break;
    }

});


app.listen(3000, function () {
    console.log('Servidor ativo na porta 3000!');
})

