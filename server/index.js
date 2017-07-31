var express=require('express')
var path=require('path')
var bodyParser=require('body-parser')
var mongodb=require('mongodb')
require('dotenv').config()

var app=express()
var PORT=process.env.PORT || 3500
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../client/build')))


function validate(data){
	let errors={}
	if(data.title==='')errors.title="Title field can't be empty."
	if(data.director==='')errors.director="Director field can't be empty."
	if(data.released==='')errors.released="Released field can't be empty."
	if(data.description==='')errors.description="Description field can't be empty."
	if(data.poster==='')errors.poster="Poster URL can't be empty."
	const isValid=Object.keys(errors).length===0
	return {errors,isValid}
}

mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err,db){

	app.get('/api/movies',function(req,res){
		db.collection('movies').find({}).toArray(function(err,movies){
			if(err) throw err
			return res.json({movies})
		})
	})
	
	app.post('/api/movies',function(req,res){
		const {errors,isValid}=validate(req.body)
		if(isValid){
			const {title,director,released,description,poster}=req.body
			db.collection('movies').insert(
				{title,director,released,description,poster},
				function(err,result){
					if(err) throw err
					return res.json({movie:result.ops[0]})
				})
		}else{
			if(err) throw err
		}
	})
	
	app.put('/api/movies/:_id',function(req,res){
		const {errors,isValid}=validate(req.body)
		if(isValid){
			const {title,director,released,description,poster}=req.body
			db.collection('movies').findOneAndUpdate(
				{_id:new mongodb.ObjectId(req.params._id)},
				{$set:{title,director,released,description,poster}},
				{returnOriginal:false},
				function(err,result){
					if(err) throw err
					return res.json({movie:result.value})
			})
		}else{
			if(err) throw err
		}
	})
	
	app.get('/api/movies/:_id',function(req,res){
		db.collection('movies').findOne(
			{_id:new mongodb.ObjectId(req.params._id)},
			function(err,movie){
				if(err) throw err
				return res.json({movie})
		})
	})
	
	app.delete('/api/movies/:_id',function(req,res){
		db.collection('movies').deleteOne(
			{_id: new mongodb.ObjectId(req.params._id)},
			function(err,result){
				if(err) throw err
				return res.json({})
		})
	})
	
	
	app.use((req, res)=>{
		res.status(404).json({
			errors: {global: "Still working on it. Please try again later when we implement it"}
		})
	})


app.get('*', function(request,response){
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT,function(){
	console.log(`Listening on port ${PORT}`)
})

})

