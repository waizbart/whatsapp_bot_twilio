const functions = require("firebase-functions");
const twilio = require('twilio');
const moment = require('moment');

const {
    getHorarios,
    setHorario,
    getHorariosByPhone,
    deleteNotConfirmedByPhone,
    confirmByPhone
} = require('./services/MessageService.js')

const { formatMessage } = require('./utils/formatMessage.js')

exports.message = functions.https.onRequest(async (req, res) => {

    var { Body: msg, From: fromNumber } = req.body;

    msg = msg.toLowerCase()

    const isSchedule = msg.includes('às') || msg.includes('as') || msg.includes('hoje') || msg.includes('amanhã') || msg.includes('amanha') || msg.includes('dia') || msg.includes('h ') || msg.includes(':')

    const twiml = new twilio.twiml.MessagingResponse();

    switch (msg) {
        case '1':
            twiml.message('Digite o *serviço* que deseja juntamente com o *dia* e *horário*:\n\n_*Exemplos*_:\n\n_Corte de cabelo hoje às 15h_\n_Corte de cabelo dia 15/09 às 10:00_');
            break;


        case '2':
            const horarios = await getHorariosByPhone(fromNumber)

            let message = '_Lista de horários agendados:_\n\n'

            console.log(horarios)

            if (horarios.length > 0) {
                horarios.forEach(horario => {
                    message += `*Serviço*: ${horario.servico}\n*Data*: ${horario.data}\n*Horário*: ${horario.horario}`
                })

                twiml.message(message)
            } else {
                twiml.message('Você não tem nenhum horário agendado.');
            }

            break;


        case 'sim':
            await confirmByPhone(fromNumber)
            twiml.message('Seu agendamento foi efetuado com sucesso!');
            break;


        case 'nao':
        case 'não':
            await deleteNotConfirmedByPhone(fromNumber)
            twiml.message('Seu agendamento foi cancelado.');


        default:
            if (isSchedule) {

                const msgObj = formatMessage(msg)
                console.log(msgObj)
                const horarios = await getHorarios()
                console.log(`${msgObj.data} ${msgObj.horario}`)

                let isBefore = moment(`${msgObj.data} ${msgObj.horario}`, 'DD-MM-YYYY HH:mm').isBefore(moment().subtract(3, 'hours'))
                console.log(moment().format('DD-MM-YYYY HH:mm'))
                let isValid = moment(`${msgObj.data} ${msgObj.horario}`, 'DD-MM-YYYY HH:mm').isValid()

                if (isBefore) {
                    twiml.message('Não é possível agendar para um horário que já passou.');
                    break;
                }

                if (!isValid) {
                    twiml.message('Data ou horário inválido.');
                    break;
                }

                if (horarios[msgObj.data]?.[msgObj.horario]) {
                    twiml.message('Horário indisponível, escolha outro horário.');
                    break
                }

                await setHorario({
                    ...msgObj,
                    confirmado: false,
                    telefone: fromNumber
                })

                twiml.message("Você deseja agendar o serviço de *" + msgObj.servico + "* para o dia *" + msgObj.data.replaceAll('/', '-') + "* às *" + msgObj.horario + "*?\n\nResponda com *sim* ou *não*");



            } else {
                twiml.message("Seja bem vindo à barbearia Araraquara!💇‍♂️\n\nSelecione uma das opções:\n\n[1] Fazer agendamento ⏰\n[2] Ver seus agendamentos 👤");
                //🔎 
            }

            break;
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString())
});
