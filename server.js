const express = require("express");
const articleRouter = require("./routes/article");
const mongoose = require("mongoose");
const app = express();
const Article = require("./models/article");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/blogDB");


app.set('view engine' , 'ejs');


app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.get("/",function(req,res){
	 Article.find({} , function(err , result){
		if(!err){
		res.render('articles/index' , {articles : result
		});
		}else {
	      	res.redirect('/');
		}

	}).sort({
		date: "desc"
	});
});











app.listen("3000" , function(){
	console.log("server is running...");
});
app.use('/articles', articleRouter);