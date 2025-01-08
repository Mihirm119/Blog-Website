const mogoose = require('mongoose')
const schema = mogoose.Schema;
const USER = new schema({
    name: String,
    comment: String,
    blogId: {
        type: mogoose.Schema.Types.ObjectId,
        ref: 'ADDBLOG',
    },
    date: {
        type: String,  // Store date as a string
        default: () => moment().format('DD MMM YYYY'),  // Format the date as '17 SEP 2020'
    },
    time: {
        type: String,  // Store time separately (optional)
        default: () => moment().format('HH:mm:ss'),  // Format time as 'HH:mm:ss'
    }
})

const commentBlog = mogoose.model('comment_blog', USER)

module.exports = commentBlog;