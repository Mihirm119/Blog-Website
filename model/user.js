const mogoose = require('mongoose')
const schema = mogoose.Schema;
    const USER = new schema({
        username:{
            type:String,
            unique:true,
            required:[true,"please Enter a username"],
        },
        password:{
            type: String,
            required:[true,"please Enter a password"],
            // match:[/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Please Enter a Strong Password']
        }
    })

const MODEL = mogoose.model('project-24',USER)

module.exports = MODEL;