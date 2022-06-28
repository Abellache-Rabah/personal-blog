const mongoose = require("mongoose");
const { marked } = require('marked');
const slugify = require("slugify");
const CreateDomPurifier = require("dompurify");
const {JSDOM}  = require("jsdom");
const date = new Date();


const dompurify = CreateDomPurifier(new JSDOM().window);

const articleSchema = new mongoose.Schema ({
	title : {
		type : String,
		required : true
	},
	description : {
		type : String
	},
	markdown : {
		type : String,
		required : true
	},
	date : {
		type : String,
		default : Date.now
	},
	slug :{
		type : String,
		required : true,
		unique : true
	},
	sanatized : {
		type : String,
		required : true
	}
});


articleSchema.pre('validate' , function(next){
	if (this.title) {
		this.slug = slugify(this.title, {lower: true, strict:true})
	}

	if (this.markdown) {
		this.sanatized = dompurify.sanitize(marked.parse(this.markdown));


	}



	next();
});

module.exports = mongoose.model("articles",articleSchema);