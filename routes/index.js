var express = require('express');
var router = express.Router();
var session = require('express-session');
const MODEL = require('../model/user')
const SECA = require('../model/sectiorA')
const SECB = require('../model/sectionB')
const SECB_READ = require('../model/sectionB-read')
const Contact = require('../model/contact')
const ADDBLOG = require('../model/addblogSc')
const commentBlog = require('../model/comment')
const News = require('../model/news')
const moment = require('moment');

const bcrypt = require('bcrypt');
// const nodemailer = require("nodemailer");


/* GET home page. */

router.use(session({
  secret: "your_secret_key",  // Change this secret key for better security
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Use 'secure: true' for HTTPS
}));

//=================================================================================//


router.get('/', async function (req, res, next) {
  const check = await SECA.find();
  const newcheck = await SECB.find()
  const SENDBLOG = await ADDBLOG.find()
  const AI = await ADDBLOG.find({ technology: "AI" })
  const DESIGN = await ADDBLOG.find({ technology: "Design" })
  const BUSINESS = await ADDBLOG.find({ technology: "Business" })
  const MobileDevelopment = await ADDBLOG.find({ technology: "Mobile-Development" })
  const CustomSoftwareDevelopment = await ADDBLOG.find({ technology: "Custom Software Development" })
  const FINTECH = await ADDBLOG.find({ technology: "Fintech" })
  const Consulting = await ADDBLOG.find({ technology: "Consulting" })
  const News = await ADDBLOG.find({ technology: "News" })
  const Outstaffing = await ADDBLOG.find({ technology: "Outstaffing" })
  const TechTrends = await ADDBLOG.find({ technology: "Tech Trends" })
  const IoT = await ADDBLOG.find({ technology: "IoT" })
  const Construction = await ADDBLOG.find({ technology: "Construction" })
  const Blockchain = await ADDBLOG.find({ technology: "Blockchain" })
  const Ecommerce = await ADDBLOG.find({ technology: "Ecommerce" })
  const Hospitality = await ADDBLOG.find({ technology: "Hospitality" })


  res.render('project', {
    checkdata: check,
    newdata: newcheck,
    sendblog: SENDBLOG,
    AI, DESIGN, BUSINESS, MobileDevelopment, CustomSoftwareDevelopment, FINTECH, Consulting, News, Outstaffing, TechTrends, IoT, Construction, Blockchain, Ecommerce, Hospitality,
    sessionUser: req.session.username
  });
})





// router.get('/', async function (req, res, next) {
//   const check = await SECA.find();
//   const newcheck = await SECB.find()
//   const SENDBLOG = await ADDBLOG.find()

//   res.render('project', {
//     checkdata: check,
//     newdata: newcheck,
//     sendblog: SENDBLOG,
//     sessionUser: req.session.username
//   });
// })


router.get('/readmore', async function (req, res, next) {
  const idnumber = req.query.idnumber; // Accessing the query parameter
  const newcheck_read = await SECB_READ.findOne({ idnumber: idnumber });


  res.render('readmore', { newread: newcheck_read });
});


router.post('/readmore', async function (req, res, next) {

  const { msg, name, email } = req.body;

  await comments.create(req.body);

});



router.get('/sign-up', function (req, res, next) {
  res.render('sign-up');
});

router.post('/sign-up', async function (req, res, next) {
  const { username, password } = req.body;

  try {
    const hashpass = await bcrypt.hash(password, 10);
    await MODEL.create({ username, password: hashpass });
    return res.redirect('/sign-up')
  } catch (error) {
    let errorMessage;

    // Check for validation errors
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
    }

    res.render('error', { message: "Username Is already Exists" });
  }
})




router.get('/log-in', function (req, res, next) {
  res.render('log-in');
});

router.post('/log-in', async function (req, res, next) {
  try {
    const { newusername, newpassword } = req.body;

    if (!newusername) throw new Error('Please Enter a Username')
    if (!newpassword) throw new Error('Please Enter a Password')


    const check = await MODEL.findOne({ username: newusername })
    if (!check) throw new Error('Username is Not Exists')

    const compare = await bcrypt.compare(newpassword, check.password);
    if (!compare) throw new Error('Incorrect Password');

    req.session.username = check.username;

    // main()

    return res.redirect('/');

  } catch (error) {

    return res.render('error', { message: error.message });
  }

});


router.get('/log-out', (req, res) => {
  // Destroy session and redirect to home
  req.session.destroy((err) => {
    if (err) {
      return res.render('error', { message: 'Error logging out' });
    }
    res.redirect('/');
  });
});

//==================================================================================//


//================================Admin_Panel==================================================//

router.get('/adminpanel', async function (req, res, next) {
  if (!req.session.isLoggedIn) {
    return res.redirect('/adminpanel/login')
  }

  const admincheck = await MODEL.find(); // Assuming you're fetching data here
  res.render('adminpanel', { newdata: admincheck });
});

router.get('/adminpanel/login', async function (req, res, next) {
  res.render('admin-login');
});



router.post('/adminpanel', async function (req, res, next) {
  try {
    const { newusername, newpassword } = req.body;

    if (!newusername) throw new Error('Please Enter a Username');
    if (!newpassword) throw new Error('Please Enter a Password');

    const check = await MODEL.findOne({ username: newusername });
    if (!check) throw new Error('User not found'); // Handle case if no user is found

    if (newusername !== "Mihir") throw new Error('Invalid Username');

    const compare = await bcrypt.compare(newpassword, check.password);
    if (!compare) throw new Error('Incorrect Password');

    req.session.isLoggedIn = true;

    return res.redirect('/adminpanel');

  } catch (error) {
    return res.render('admin-error', { message: error.message });
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }

    res.redirect('/adminpanel');
  });
});



router.get('/adminpanel/addblog', async (req, res) => {
  const SENDBLOG = await ADDBLOG.find()
  const { update, Delete } = req.query;
  let newjson = {};

  if (update) {
    newjson = await ADDBLOG.findById(update);
  }

  if (Delete) {
    await ADDBLOG.findByIdAndDelete(Delete)
    return res.redirect('/adminpanel/addblog');
  }

  res.render('addblog', { sendblog: SENDBLOG, data: newjson });
});



router.post('/adminpanel/addblog', async (req, res) => {

  const { up } = req.body;

  try {
    if (up) {
      await ADDBLOG.findByIdAndUpdate(up, req.body)
    }
    else {
      await ADDBLOG.create(req.body)

    }
    return res.redirect('/adminpanel/addblog')

  } catch (error) {
    return res.render('error-addblog', { message: error.message });
  }

});


router.get('/readmoreblog/:id', async (req, res) => {


  try {
    const READBLOG = await ADDBLOG.findById(req.params.id)
    const FINDBLOG = await ADDBLOG.find({ technology: READBLOG.technology[0] });

    // const findcomment = await commentBlog.find({ blogId: READBLOG._id }).populate('blogId');
    const findcomment = await commentBlog.find({ blogId: READBLOG._id });
    
    return res.render('readmoreblog', { READBLOG, FINDBLOG, findcomment })

  } catch (error) {
    return res.render('error', { message: error.message })
  }

})

router.post('/readmoreblog/:id', async (req, res) => {

  try {

    const READBLOG = await ADDBLOG.findById(req.params.id)
    const FINDBLOG = await ADDBLOG.find({ technology: READBLOG.technology[0] })

    const date = moment().format('DD MMM YYYY');
    const time = moment().format('HH:mm:ss');

    const { comment, name } = req.body;
     await commentBlog.create({
      name:name,
      comment:comment,
      blogId:READBLOG._id,
      date:date,
      time:time,
    });

    return res.redirect(`/readmoreblog/${req.params.id}`);

  } catch (error) {
    return res.render('error', { message: error.message })
  }

})

//================================Admin_Panel_End==================================================//



//================================CONTACT-PAGE==================================================//

router.get('/contact', async (req, res) => {
  try {

    return res.render('contact')

  } catch (error) {
    return res.render('error', { message: error.message })
  }

})

router.post('/contact', async (req, res) => {
  const CONTACT = await Contact.find()
  try {
    await Contact.create(req.body)
    return res.render('contact', { CONTACT })

  } catch (error) {
    return res.render('error', { message: error.message })
  }

})


//================================CONTACT-PAGE_End==================================================//


//================================ADMIN_CONTACT-PAGE==================================================//

router.get('/adminpanel/Contact', async (req, res) => {
  try {
    const CONTACT = await Contact.find()
    return res.render('admincontact', { CONTACT })

  } catch (error) {
    return res.render('error', { message: error.message })
  }

})
//================================ADMIN_CONTACT-PAGE_End==================================================//





//================================News==================================================//

router.get('/latestnews', async (req, res) => {
  try {
    const NEWS = await News.find();

    return res.render('newsblog', { NEWS })

  } catch (error) {
    return res.render('error', { message: error.message })
  }

})

//================================News_End==================================================//





//=====================================Nodemailer==================================================//

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: "makwanamihir201@gmail.com",
//     pass: "dfvmwtqneojspuxt",
//   },
// });

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '" INFORMATION TECHNOLOGY BLOG" <makwanamihir201@gmail.com>', // sender address
//     to: "semmymihir6@gmail.com", // list of receivers
//     subject: "IT BLOG", // Subject line
//     text: "Best regards Mihir",
//     html: "<b>Thank you for logging into INFORMATION TECHNOLOGY BLOG! We're excited to have you on board. Your account is now active, and you can explore all of our latest posts, updates, and content.</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);

//================================Nodemailer_End==================================================//



module.exports = router;

