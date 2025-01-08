const mogoose = require('mongoose')
const schema = mogoose.Schema;
    const USER = new schema({
        name:String,
        email:String,
        message:String,
        status:String,
    })

const Contact = mogoose.model('sec_b_contact',USER)

module.exports = Contact;