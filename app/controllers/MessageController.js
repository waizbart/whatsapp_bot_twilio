const twilio = require('twilio');

exports.post = (req, res) => {

    const msg = req.body.Body.toLowerCase();

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message("Seja bem vindo!");
    twiml.message("Selecione uma das opções:\n\n1 - Ver horários disponíveis\n2 - Fazer agendamento\n3 - Ver seus agendamentos");

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString())

    switch (msg) {
        case '1':
            
            break;

        default:
            const twiml = new twilio.twiml.MessagingResponse();
            twiml.message('Digite pedra, papel ou tesoura!')
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString())

            console.log('fallback intent');

            break;
    }
};