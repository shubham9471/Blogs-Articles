const express = require('express')
const app = express() //this is how we can create our app var
const articlesRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
// if dont pass useNewUrlParser:true then it will throw an warning saying current url is string parser and can be removed in a future version. so mongoose suggest to use newparseurl
mongoose.connect('mongodb://localhost/blog')



//since the below code is simple and so we want it to print out html 
// to do that we are gonna use view engine
//Viewengine is the combination of HTML tags, Server Controls and a programming
// language and works inside the application for rendering view to the browser or to the user.

app.set('view engine', 'ejs') // we are setting it up with ejs coz we are gonna write all our view using ejs and then our view engine is gonna convert that ejs code in HTML 

app.use(express.urlencoded({ extended: false })) // this means we can access all the stuffs for creating our model(like title , description and etc)


// MIND IT THE ABOVE ROUTER IS USING THE ROUTER THAT WE EXPORTED FROM articlesRouter
// THE CODE BELOW ISN'T 

app.use(methodOverride('_method'))
//setting up our route
// ('/') -> this is our main index route
//.sort({createdAt : 'desc'} this will sort the articles based on when ther were created the newer ones comes first
app.get('/', async(req, res) =>{
    const articles = await Article.find().sort({createdAt : 'desc'})
    res.render('articles/index', {articles: articles}) // passing an object article so that we can render it on index. We can pass any object here and it will be available at our index.js

})
app.use('/articles',articlesRouter) // so every router we create will add at end of the /articles 

app.listen(5000) // this means our browser will be hosted on 5000