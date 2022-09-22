const functions = require("firebase-functions");
const twilio = require('twilio');

const { getHorarios } = require('./services/MessageService.js')

exports.message = functions.https.onRequest(async (req, res) => {

    const msg = req.body.Body;

    const twiml = new twilio.twiml.MessagingResponse();

    switch (msg) {
        case '1':

            const horarios = await getHorarios()
            console.log('horarios', horarios)

            twiml.message('Segue a lista de horários disponíveis hoje: ')


            break;

        default:
            twiml.message("Seja bem vindo à barbearia Araraquara!💇‍♂️\n\nSelecione uma das opções:\n\n1 - Ver horários disponíveis 🔎\n2 - Fazer agendamento ⏰\n3 - Ver seus agendamentos 👤");
            break;
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString())
});
