const mogoose = require('mongoose')
const schema = mogoose.Schema;
    const USER = new schema({
        topic:String,
        details:String,
        mainimage:String,   
    })

const SECB = mogoose.model('sec_b',USER)

module.exports = SECB;