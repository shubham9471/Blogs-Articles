// here we are gonna put all of our routes directly related to articles

//a form only allows us to get/post, so inorder to delete we are gonna use somethig called 
// Method override allows us to override the methods form passes
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

// if we dont pass {articles: new Article()} at line 9 then everytime we cancel and try to cick on new article utton then it would say undefined articles error so everytime new is clicked a new default page if generated for new article  
router.get('/new',  (req, res)=> {
    res.render('articles/new', {articles: new Article()})
})

router.get('/edit/:id',  async(req, res)=> {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {articles: article})
})

router.get('/:slug', async (req, res)=> {
    const article = await Article.findOne({slug : req.params.slug})

    //------------validation-------------- 

    if (article == null) res.redirect('/')
    res.render('articles/show', {articles: article})
    
})

// {articles: article}) mind it here the article is not the article of routes 

// next says go to next func i.e saveArticleAndRedirect()
router.post('/',async (req, res, next) =>{    
    req.article = new Article()
    next()
 
}, saveArticleAndRedirect('new'))


router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
  }, saveArticleAndRedirect('edit'))


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})



// as we might notice that our post and put router are almost identical so we are gonna put them inside 
// as sepearte function & this is onna take a path either its edit or post

// it actually return us a set of middleware

// IT KIND OF ACTS LIKES A MIDDLEWARE AS ALL THE THINGS THAT WE DID ABOVE FOR PUT AND POST IS DONE HERE
function saveArticleAndRedirect(path) {
    return  async (req, res) =>{
        let article = req.article
        article.title = req.body.title
        article.description =  req.body.description
        article.markdown =  req.body.markdown
        
        
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        
        }
        catch(err){ 
            console.log(err)
            res.render(`articles/${path}`, {articles: article})
        }
    }

}


module.exports = router










