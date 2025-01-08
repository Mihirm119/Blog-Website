const mogoose = require('mongoose')
const schema = mogoose.Schema;
    const USER = new schema({
        title:String,
        image:String,
        date:String,
        month:String,
        year:String,
        category:String,
        information:String,
    })

const News = mogoose.model('blog_news',USER)

module.exports = News;







//============================================================//

// {
//     title : "Tech Industry Reaches New Heights in 2024",
//     date : "2024-12-05",
//     month : "December",
//     year : 2024,
//     category : "Technology",
//     information : "Global investment in AI and renewable energy surges.",
//     image : "https://example.com/images/tech-news.jpg",
// },
// {
//     title : "Healthcare Innovations for 2024",
//     date : "2024-12-02",
//     month : "December",
//     year : 2024,
//     category : "Health",
//     information : "New vaccines for emerging diseases show promise.",
//     image : "https://example.com/images/health-news.jpg",
// },
// {
//     title : "Economic Growth Steady Across Europe",
//     date : "2024-12-01",
//     month : "December",
//     year : 2024,
//     category : "Business",
//     information : "EU nations report increased GDP growth this quarter.",
//     image : "https://example.com/images/business-news.jpg",
// },
// {
//     title : "Digital Art Takes Center Stage",
//     date : "2024-11-29",
//     month : "November",
//     year : 2024,
//     category : "Culture",
//     information : "NFTs and blockchain art gain mainstream recognition.",
//     image : "https://example.com/images/culture-news.jpg",
// },
// {
//     title : "Cybersecurity Measures on the Rise",
//     date : "2024-11-27",
//     month : "November",
//     year : 2024,
//     category : "Technology",
//     information : "Global efforts to combat cyber threats intensify.",
//     image : "https://example.com/images/cyber-news.jpg",
// },
// {
//     title : "Electric Vehicles Dominate Auto Market",
//     date : "2024-11-25",
//     month : "November",
//     year : 2024,
//     category : "Technology",
//     information : "Electric vehicles surpass traditional cars in global sales.",
//     image : "https://example.com/images/ev-news.jpg",
// },
// {
//     title : "Space Tourism Grows in Popularity",
//     date : "2024-11-24",
//     month : "November",
//     year : 2024,
//     category : "Science",
//     information : "Thousands book trips to orbit Earth in 2025.",
//     image : "https://example.com/images/space-tourism.jpg",
// },
// {
//     title : "Agricultural Tech Advances in 2024",
//     date : "2024-11-23",
//     month : "November",
//     year : 2024,
//     category : "Environment",
//     information : "Smart farming tools help reduce water usage by 40%.",
//     image : "https://example.com/images/agriculture-news.jpg",
// },

// {
//     title : "AI Assists in Wildlife Conservation",
//     date : "2024-11-21",
//     month : "November",
//     year : 2024,
//     category : "Environment",
//     information : "AI-powered drones help track and protect endangered species.",
//     image : "https://example.com/images/conservation-news.jpg",
// },
//============================================================//