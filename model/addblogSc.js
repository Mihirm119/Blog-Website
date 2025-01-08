const mogoose = require('mongoose')
const schema = mogoose.Schema;
    const USER = new schema({
        image:{
            type:String,
            required:[true,"please Enter a Image URL"],
        },
        name:{
            type:String,
            required:[true,"please Enter a Topic Name"]
        },
        month:
        {
            type:String,
            required:[true,"please Enter a Mounth"] 
        },
        date:{
            type:Number,
            required:[true,"please Enter a Date"] 
        },
        year:{
            type:Number,
            required:[true,"please Enter a Year"],  
        },
        technology:
        {
            type:Array,
            required:[true,"please Enter a Technology"] 
        },
        readmainimage:
        {
            type:String,
            required:[true,"please Enter a Readmainimage"] 
        },
        first_paragraph:
        {
            type:String,
            required:[true,"please Enter a first_paragraph"] 
        },
        secound_paragraph:
        {
            type:String,
            required:[true,"please Enter a secound_paragraph"] 
        },
        first_image:
        {
            type:String,
            required:[true,"please Enter a first_image"] 
        },
        secound_third:
        {
            type:String,
            required:[true,"please Enter a secound_third"] 
        },
    })

const ADDBLOG = mogoose.model('admin_addblog',USER)

module.exports = ADDBLOG;


