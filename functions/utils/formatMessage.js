const moment = require('moment');

moment.locale('pt-br');

const formatMessage = (msg) => {
    let servico = (msg.includes('cabelo') && msg.includes('barba')) ? 'cabelo e barba' : msg.includes('cabelo') ? 'cabelo' : 'barba'
    let data = msg.search('/') > 0 ? msg.substring(msg.search('/') - 2, msg.search('/') + 3) : msg.includes('hoje') ? 'hoje' : msg.includes('amanhã') || msg.includes('amanha') ? 'amanhã' : 'hoje'
    let horario = msg.search('às') > 0 ? msg.substring(msg.search('às') + 3) : msg.search('as') > 0 ? msg.substring(msg.search('as') + 3) : msg.substring(msg.search(':') - 2, msg.search(':') + 2)
 
    horario = horario.replace(/[^\d:-]/g, '')

    if (!horario.includes(':')){
        horario = horario + ':00'
    }
    if (data.includes('/')){
        data = data.replace('/', '-') + '-' + moment().format('YYYY')
    }

    if (data === 'hoje') {
        data = moment().format('DD-MM-YYYY')
    }
    if (data === 'amanhã' || data === 'amanha') {
        data = moment().add(1, 'days').format('DD-MM-YYYY')
    }
    
    return {
        servico,
        data,
        horario
    }
}

module.exports = {
    formatMessage
}
