////////// packages -----------------------------------------------
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const tf = require('@tensorflow/tfjs-node');
const env = require('dotenv').config();
// tensorflow.js node model
// the value of predicted que no is returned
async function load_model(data) {
  // console.log(data);
  const m =  await tf.loadLayersModel('file:///react/chatbot/model/model.json');
  let prediction = await m.predict(tf.stack([tf.tensor1d(data)])).data();
  let score = Math.max(...prediction);
  const no = prediction.indexOf(Math.max(...prediction));
  console.log(no+":"+score);
  return Promise.resolve([no, score]);
}

// Brain.js Lerned model are getting in use

// const state = JSON.parse(fs.readFileSync('new.json'));
// const net1 = new brain.recurrent.LSTM();
// net1.fromJSON(state);


// local mongodb connection is extablished

// mongoose.connect('mongodb://127.0.0.1:27017/studentDatabase', {
//   useNewUrlParser: true
// });


var pass = process.env.DB_PASSWORD;

mongoose.connect(pass, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// student schema created

const studentSchema = new mongoose.Schema({
  name : String, //we can specify only true also  and [true,"check the entered data"] also like this
  whatsapp_no :{
    type : Number
  }, 
  email :String,
  added_AT:Date
});

const Student = mongoose.model("Student",studentSchema);


// Prediction insights
const collectionSchema = new mongoose.Schema({
  predictedQueNo : Number,
  accuracy:Number,
  userquestion:String,
  added_AT:Date
});

// wrong answers
const wrongAnswer = mongoose.model("WrongAnswer", collectionSchema);

const badResponceSchema = new mongoose.Schema({
  userInput1:String,
  botResponce1:String,
  added_AT:Date
});

// /bad responce
const badResponse = mongoose.model("BadResponse", badResponceSchema);

// good response
const goodResponceSchema = new mongoose.Schema({
  userInput:String,
  botResponce:String,
  added_AT:Date
});

const goodResponse = mongoose.model("GoodResponse", goodResponceSchema);

// Feedtext response

const feedbackSchema = new mongoose.Schema({
  Rating:Number,
  Catagory:String,
  feedText:String,
  added_AT:Date
});

const FeedBack = mongoose.model("FeedBack", feedbackSchema);
// initialized the express
const app = express();
app.use(
  express.urlencoded({ extended: true })
);
  
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

// initialize the view engine
app.set("view engine","ejs");
app.set('view options', {
	strict: true,
	destructuredLocals: ["user","timestamp"],
});


  
////////// server  -----------------------------------------------
// main page render


app.get("/",function(req,res){
  res.render("chatbot");
});

// student data is posted
app.post("/post",function(req,res){
  var name = req.body.name;
  var wpno = req.body.no;
  var email = req.body.mail;
  var newStudent = new Student({
    name:name,
    whatsapp_no:wpno,
    email:email,
    added_AT:new Date()
  });
  newStudent.save();
  res.send({response:"success"});
});


app.post("/downthumb",(req, res) => {
  var bad = new badResponse({
    userInput1:req.body.userInput,
    botResponce1:req.body.botResponce,
    added_AT:new Date()
  })
  bad.save();
  res.send({response:"success"});
});

app.post("/upthumb",(req, res) => {
  var good = new goodResponse({
    userInput:req.body.userInput,
    botResponce:req.body.botResponce,
    added_AT:new Date()
  });
  good.save();
  res.send({response:"success"});
});

app.post("/feeddata",(req, res) => {
  var feed = new FeedBack({
    Rating:req.body.rating,
    Catagory:req.body.catagory,
    feedText:req.body.feedText,
    added_AT:new Date()
  })
  feed.save();
  res.send({response:"success"});
})

//creating the file for nural network

// the user unput is fetched and give back the predictios.

app.post("/predict",(req,res) => {
  load_model(req.body.input).then(function(result) {
    console.log(result);
    res.send({response:result});
  });

});


app.post("/wrongAnswer",(req, res) => {
  var newQue = new wrongAnswer({
    predictedQueNo:req.body.predQue,
    accuracy:req.body.accuracy,
    userquestion:req.body.userInput,
    added_AT:new Date()
  });
  newQue.save();
    res.send({response:"Your Question is stored to process. I'll process it shortly."});
});


app.listen(3001 , function() {
    console.log("Server started on port 3000");
});