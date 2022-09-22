const database = require('./firebase.js')
const { ref, get } = require("firebase/database")

const getHorarios = async () => {
    const horariosRef = ref(database, 'horarios');

    let horarios = await get(horariosRef)

    return horarios.val()
}

module.exports = {
    getHorarios
}