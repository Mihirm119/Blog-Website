const mogoose = require('mongoose')
const schema = mogoose.Schema;
    const USER = new schema({
        idnumber:Number,
        mainimage:String,   
        maintitle :String,
        firstparagraph :String,
        firsttitle :String,
        secoundparagraph :String,
        firstul :Array,
        secoundtitile :String,
        thiedparagraph :String,
        secoundul:Array,
    })

const SECB_READ = mogoose.model('sec_b_read',USER)

module.exports = SECB_READ;