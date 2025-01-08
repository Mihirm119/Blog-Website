const mogoose = require('mongoose')
const schema = mogoose.Schema;
    const USER = new schema({
        topic:String,
        topicname:String,
        details:String,
        mainimage:String,   
        secoundimage:String,   
        name:String,   
    })

const SECA = mogoose.model('sec_first',USER)

module.exports = SECA;


