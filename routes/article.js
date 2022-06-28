const express = require("express");
const Article = require("./../models/article");

const router = express.Router();

router.get("/new",(req,res) => {
	res.render("articles/new", {articles : new Article()} );
});
router.get("/edit/:id", async (req,res) => {
	const articles = await Article.findById(req.params.id);
	res.render("articles/edit", {articles : articles} );
});


router.post("/", async (req,res, next) => {
	req.article = new Article();
	next();
}, saveAndRedirect("new"));

router.get("/:slug",async (req,res) => {
	const article = await Article.findOne({slug : req.params.slug});
	if (article == null) {
		res.redirect("/");
	}
	res.render("articles/show",{article : article});
});


router.put("/:id", async (req,res, next) => {
	req.article = await Article.findById(req.params.id);
	next();
}, saveAndRedirect("edit"));


router.delete("/:id" ,async(req,res) => {
	await Article.findByIdAndDelete(req.params.id);
	res.redirect('/');
});


function saveAndRedirect(path) {
	return async(req , res) => {
		let article = req.article
			
			article.title = req.body.title;
			article.description = req.body.description;
			article.markdown = req.body.markdown;
			article.date = req.body.date;

		try {
			article = await article.save();
			res.redirect("/articles/"+article.slug);
		} catch (e) {
				console.log(e);
				res.render(`articles/${path}` , {articles : article});
		}
	}
}

module.exports = router;