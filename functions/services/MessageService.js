const database = require('./firebase.js')
const { ref, get, set } = require("firebase/database")
const moment = require('moment')

const getHorarios = async () => {
    const horariosRef = ref(database, 'horarios');

    let horarios = await get(horariosRef)

    return horarios.val()
}

const setHorario = async (data) => {
    const horariosRef = ref(database, 'horarios/' + data.data + '/' + data.horario);

    await set(horariosRef, data)
}

const getHorariosByPhone = async (phone) => {
    const horariosRef = ref(database, 'horarios');

    let horarios = await get(horariosRef)

    horarios = horarios.val()

    let horariosArr = []

    Object.keys(horarios).map((data) => {
        Object.keys(horarios[data]).map((hora) => {
            //---------------------------------------------Pega somente horários a partir de hoje
            console.log
            if (horarios[data][hora].telefone === phone && moment(`${data} ${hora}`, 'DD-MM-YYYY HH:mm').isAfter(moment().subtract(3, 'hours')) && horarios[data][hora].confirmado) {
                horariosArr.push(horarios[data][hora])
            }
        })
    })

    return horariosArr
}

const deleteNotConfirmedByPhone = async (phone) => {
    const horariosRef = ref(database, 'horarios');

    let horarios = await get(horariosRef)

    horarios = horarios.val()

    Object.keys(horarios).map((data) => {
        Object.keys(horarios[data]).map((hora) => {
            if (horarios[data][hora].telefone === phone && !horarios[data][hora].confirmado) {
                set(ref(database, 'horarios/' + data + '/' + hora), null)
            }
        })
    })
}

const confirmByPhone = async (phone) => {
    const horariosRef = ref(database, 'horarios');

    let horarios = await get(horariosRef)

    horarios = horarios.val()

    Object.keys(horarios).map((data) => {
        Object.keys(horarios[data]).map((hora) => {
            if (horarios[data][hora].telefone === phone && !horarios[data][hora].confirmado) {
                set(ref(database, 'horarios/' + data + '/' + hora + '/confirmado'), true)
            }
        })
    })
}

module.exports = {
    getHorarios,
    setHorario,
    getHorariosByPhone,
    deleteNotConfirmedByPhone,
    confirmByPhone
}