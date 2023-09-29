



// # // stopwords
const stopWords0 = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];



// const Spellchecker = require("hunspell-spellchecker");
const chatBody = document.querySelector(".chatBody");
const txtInput = document.querySelector(".in");
const send = document.querySelector(".send");
const startBot = document.querySelector(".start-bot");
const doc = document.querySelector(".dr-1");
const contD = document.querySelector(".eleg");
const link = document.querySelector(".collageName");
// import spellchecker from "../chatbot";
// const spellchecker = require("hunspell-spellchecker")
// const output = require('./brain');
send.addEventListener("click", () => renderUserMessage());
link.addEventListener("click", () => window.location.href="https://nmcoe.org.in/");


// copy text button
 const copyText = (event)=>{
  navigator.clipboard.writeText(chatBody.children[event].textContent);
 }

 const badthumb = (event)=>{
  var xhr = new XMLHttpRequest();
  var url = "/downthumb";
  var data = JSON.stringify({userInput:chatBody.children[event-1].textContent,botResponce:chatBody.children[event].textContent});
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json.response);
    }
  };
  xhr.send(data);
 }

 const goodThumb = (event)=>{
  var xhr = new XMLHttpRequest();
  var url = "/upthumb";
  var data = JSON.stringify({userInput:chatBody.children[event-1].textContent,botResponce:chatBody.children[event].textContent});
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status ===200){
      let json = JSON.parse(xhr.responseText);
    }
  };
  xhr.send(data);
 }
// Caste Selection

// const load1 = document.createElement("div");
// var string ="<div class='circle circle-1'></div><div class='circle circle-2'></div><div class='circle circle-3'></div>";
// load1.innerHTML = string.trim();
// checking.appendChild(load1);
// const load2 = document.createElement("div");
// var string2 = "<h1>Hello Brother</h1>"
// load2.innerHTML = string2.trim();
// checking.replaceChild(load2,checking.lastChild);

// const checkSpell = new tds();
const booleanValue = true;

const userInputArray = [];
txtInput.addEventListener("keyup",(event)=>{
  // prompt("hey");
  // if(event.keyCode == 38){
  //   console.log("arrow up");
  //   if (index > 3) {
  //     txtInput.value = userInputArray[index];
  //     index = index - 2;
  //     console.log("index from arroe up:- "+index);
  //   }
  // }
  if(event.keyCode === 13){
    for(let i = 0; i < chatBody.children.length;i++){
      userInputArray.push(chatBody.children[i]);
    }
    // index =  userInputArray.length;
    // console.log(index);
    renderUserMessage();
  }
})

const upPointer = ()=>{
  txtInput.value = userInputArray[i--];

}


const renderUserMessage = (txt) => {
  // console.log("first")
  // var isRight = checkSpell.suggest("thiss",1);
  // console.log(isRight);\
  const userInput = txtInput.value.trim();
  renderMessageEle(userInput,"user");
// Code for toogle loading
          const load = document.createElement("div");
          load.classList.add("loading");
          var string ="<div class='circle circle-1'></div><div class='circle circle-2'></div><div class='circle circle-3'></div>";
          load.innerHTML = string;
          chatBody.appendChild(load);
          setScrollPosition();
          console.log(chatBody.lastChild);
// toggleLoading(false);
  setTimeout(() => {
    renderBotMessage(userInput);
    // toggleLoading(true);
  }, 1500);
  txtInput.value="";
};

const renderBotMessage = (txt) => {
    // var str = stopWords(txt.toLowerCase())
    console.log( "get bot response :- "+txt);
    getBotResponse(txt.toLowerCase());
};

// // create a element

//Stop Words
const stopWords= (userInput) => {
  var arr = userInput.split(" ");
  var txtarr = [];
  arr.forEach((element) => {
   if(!stopWords0.includes(element)){
     txtarr.push(element);
   }
  });
  console.log(txtarr);
  return txtarr.join(" ");
}


//  render message to the bot for the bot or 
var copy = 3,bad = 3,good = 3;
const renderMessageEle = (txt,type)=>{
  var msg_ele = document.createElement("div");
  if(type !== 'user' && type!== "bot"){
    msg_ele.classList.remove("loading","hide");
    msg_ele.classList.add("bot-message");
    msg_ele.innerHTML = txt+"<div class ='botToggle'> <button onclick='copyText("+ Math.floor(copy = copy + 2) +")'><i class='fa-solid fa-clipboard'></i></button><button class='goodthumb''><i class='fa-solid fa-thumbs-up'></i></button><button class='badthumb' onclick='badthumb("+ Math.floor(good = good + 2) +")'><i class='fa-solid fa-thumbs-down'></i></i></button></div>";
    chatBody.replaceChild(msg_ele,chatBody.lastChild);
    setScrollPosition();
  } else  if(type === "bot"){
    msg_ele.classList.add("bot-message");
    msg_ele.innerHTML = txt.trim()+"<div class ='botToggle'> <button onclick='copyText("+ Math.floor(copy = copy + 2) +")'><i class='fa-solid fa-clipboard'></i></button><button class='goodthumb'><i class='fa-solid fa-thumbs-up'></i></button><button class='badthumb' onclick='badthumb("+ Math.floor(good = good + 2) +")'><i class='fa-solid fa-thumbs-down'></i></i></button></div>";
    chatBody.append(msg_ele);
    setScrollPosition();
  } 
  else {
    msg_ele.classList.add("user-message");
    var textEle = document.createTextNode(txt);
    msg_ele.append(textEle);
    chatBody.append(msg_ele);
    setScrollPosition();
  }
}


// get response from the bot

const getBotResponse =(userInput) => {
  const str = userInput.toString();
  var tensor = [];
  var strings = str.replace(/[^a-z ]/gi, "").toLowerCase().split(" ").filter( x => !!x );
  for (let i = 0; i < 30; i++){
    if(strings[i]){
      if(response[strings[i]]){
        tensor.push(response[strings[i]]);
      }
      else{
        tensor.push(0);
      }
    } else {
      tensor.push(0);
    }
  }
  console.log(tensor);
  var xhr = new XMLHttpRequest();
  var url = "/predict";
  var data = JSON.stringify({input:tensor});
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      if(json.response[1] > 0.40){
        console.log("recieved from the server : \n predQue : " + json.response[0]+ " accuracy : " +json.response[1]);
        console.log("values for the prediction"+ renderPred.Data[json.response[0]].Answer.Value);
        renderMessageEle(renderPred.Data[json.response[0]].Answer.Value[Math.floor(Math.random() * renderPred.Data[json.response[0]].Answer.Value.length)]);
      }
      else{
        // Incorrect answer is sended to the database
        wrongAnswer(json.response,userInput);
      }
    }
  };
  xhr.send(data);

}


// Wrong data goes to the database

const wrongAnswer = (respond,userdata) =>{
  const xhr = new XMLHttpRequest();
  const data = JSON.stringify({predQue:respond[0],accuracy:respond[1],userInput:userdata});
  xhr.open("POST",'/wrongAnswer')
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      let json = JSON.parse(xhr.responseText);
      // you response is taken 
      console.log("wrong answer response: -"+json.response);
      renderMessageEle("<div class='bot'><h3>"+json.response+"</h3></div>");
    }
  };
  xhr.send(data);
}

// Student Data ADdd on

const studentAdd = () => {
  const stName = document.querySelector(".in1");
  const whatsNO = document.querySelector(".in2");
  const email = document.querySelector(".in3");
  const form = document.querySelector(".form");
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) && /^(\+\d{1,3}[- ]?)?\d{10}$/.test(whatsNO.value)){
    // text border set to initial position
    console.log(stName.value);
      var xhr = new XMLHttpRequest();
      var url = "/post";
      var data = JSON.stringify({name:stName.value,no:whatsNO.value,mail:email.value});
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          console.log("recieved from the server : " + json.response);
        }
      };
      xhr.send(data);
      
    email.style.borderColor="rgb(101, 101, 101)";
    document.querySelector(".in1").value="";
    document.querySelector(".in2").value="";
    document.querySelector(".in3").value="";
  }
  else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))){
    email.style.borderColor="red";
    email.style.color="red";
    email.value = "Enter valid email address";
  }
  else{
    whatsNO.style.borderColor="red";
    whatsNO.style.color="red";
    whatsNO.value = "Enter valid mobile Number";
  }
  
}

// scroll position 

const setScrollPosition = () => {
  if(chatBody.scrollHeight > 0){
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

// animation loading
const bt = true;


const toggleLoading = () => {
  if(bt === true){
    chatButtun.classList.toggle("hide",true);
    main.classList.toggle("hide",false);
    bt = false;
  } else{
    but2.classList.toggle("hide",false);
    main.classList.toggle("hide",true)    
    bt = true;
  }
  
}



// chatbot toggle button


function hide() {
  var element = document.querySelector(".main");
  element.classList.toggle("hide");
}





// check the minimum incorrect key

function pass(a){
  switch (a) {
    case 1:
      renderMessageEle(
        "<div class='bot'><h3>Documents For OBC</h3><ul><li>12<sup>th</sup> Certificate</li><li>10<sup>th</sup> Certificate</li><li>Leaving Certificate</li><li>Domacile Certificate</li><li>Income Certificate</li><li>EWS Certificate if Applicable</li><li>CET/JEE MarkList</li><li>CAST Certificate</li><li>CAST Validity</li><li>NON Cremeliar</li></ul></div>",
        "bot")
      break;
    case 2:
      renderMessageEle(
        "<div class='bot'><h3>Documents For OPEN</h3><ul><li>12<sup>th</sup> Certificate</li><li>10<sup>th</sup> Certificate</li><li>Leaving Certificate</li><li>Domacile Certificate</li><li>Income Certificate</li><li>EWS Certificate if Applicable</li></ul></div>",
        "bot")
      break; 
    case 3:
      renderMessageEle(
        "<div class='bot'><ul><li>12<sup>th</sup> Certificate</li><li>10<sup>th</sup> Certificate</li><li>Leaving Certificate</li><li>Domacile Certificate</li><li>Income Certificate</li><li>EWS Certificate if Applicable</li><li>CET/JEE MarkList</li><li>CAST Certificate</li><li>CAST Validity</li><li>NON Cremeliar</li></ul></div>",
        "bot")
      break;
    
    default:
      break;
  }
  
    console.log("ASACH")
}

function main(a){
  switch(a){
    case 1:
      renderMessageEle(
        "<div class='criteria'><ul><li>12<sup>th</sup> Pass</li><li>Min 45% aggregate marks for Open <br>Min 40% aggregate marks for Catagori</li><li>Atleast One Entrance test appearance CET/JEE</li></ul></div>",
        "bot")
      break;
    default:
      break;
  }
}

doc.addEventListener("click",()=>{
  renderMessageEle(
    "<div class='buttons'><h3 class='bot-h3'>Choose You Caste.</h3><button onclick='pass(2)'>OPEN</button><button onclick='pass(1)'>OBC</button><button onclick='pass(3)'>SC</button><button onclick='pass(3)'>ST</button><button onclick='pass(3)'>NT</button></div>",
    "bot")
  }
);

contD.addEventListener("click",() => {
  renderMessageEle(
    "<div class='bot'><ul><li>12<sup>th</sup> Pass</li><li>Min 45% aggregate marks for Open <br>Min 40% aggregate marks for Catagori</li><li>Atleast One Entrance test appearance CET/JEE</li></ul></div>",
    "bot");
    console.log("yes");  }
)





const program = document.querySelector(".program");
const facility = document.querySelector(".facilities");
const library = document.querySelector(".libray");
const salient = document.querySelector(".salient");  
const affiliate = document.querySelector(".affiliate");
const acredited = document.querySelector(".acredition");
const scholarships = document.querySelector(".scholarship");
// program offered
    program.addEventListener("click", function () {
        renderMessageEle(
            "<div class='bot'><h3>Courses offered.</h3><br><p>From traditional undergraduate degrees to specialized graduate programs, there is a course for everyone.Colleges also offer a variety of extracurricular activities and opportunities for students to get involved and grow.<br>Go to Web Site </p><a class='institute' href='https://nmcoe.org.in/courses.php#'>Courses and TFWS Codes</a></div>"
            )
    })

acredited.addEventListener("click", function () {
  renderMessageEle(
      "<div class='bot'><h3>Accredited by NAAC</h3></div>"
      )
})

scholarships.addEventListener("click", function () {
  renderMessageEle(
      "<div class='bot'><h3>All government schemes applied in our collage.</h3><p>EBC,EWS,TFWS</p></div>"
      )
})
    // facilities offered

// library.addEventListener("click",function(){
// renderMessageEle(
//   "<div class='bot'> <h1 class='bot-h3'>facilities offered</h1> <p>The Central Library is our centre of Information hub with par excellence and has excellent facility with multiple copies of Latest Textbooks, Reference Books and Periodicals. For Needy students Book-Bank facility for Reserved Category Students is also available. Reference section, study rooms and Photocopying Facilities directs students easy and proper path of knowledge in pleasant atmosphere. A Computer Quick Reference is installed in the library. Internet connection is ready for accessing the information 24x7 to all branch students. The following is college asset.</p> <a class='bot-link' href='https://nmcoe.org.in/library.php'>Go to web site</a> </div>"
// )
// });

function facilities(n){
  switch (n) {
    case 1:
      //libray
      renderMessageEle(
        "<div class='bot'> <h1 class='bot-h3'>facilities offered</h1> <p>The Central Library is our centre of Information hub with par excellence and has excellent facility with multiple copies of Latest Textbooks, Reference Books and Periodicals. For Needy students Book-Bank facility for Reserved Category Students is also available. Reference section, study rooms and Photocopying Facilities directs students easy and proper path of knowledge in pleasant atmosphere. A Computer Quick Reference is installed in the library. Internet connection is ready for accessing the information 24x7 to all branch students. The following is college asset.</p> <a class='bot-link' href='https://nmcoe.org.in/library.php'>Go to web site</a> </div>",
        "bot")
      break;
    case 2:
      //libray
      renderMessageEle(
        "<div class='burrons'><button onclick='pass(3)'>Canteen</button><button onclick='pass(3)'>Hostel</button><button onclick='pass(3)'>Mess</button></div>",
        "bot")
      break;  
    default:
      break;
  }
  
}

facility.addEventListener("click",function(){
  renderMessageEle(
    "<div class='buttons'><h3 class='bot-h3'>Facilities.</h3><button onclick='facilities(1)'>Library</button><button><a href='https://nmcoe.org.in/facilities.php'>Other Facilities</a></button></div>"
  )
  })


  salient.addEventListener("click",function(){
    renderMessageEle(
      "<div class='bot'> <p>Each and every faculty, students of institute are contributing their best to achieve the success to enhance the reputation of institute within the society.</p> <li>Excellent infrastructure.</li> <li>1:15 Teacher-Student ratio.</li> <li>Special awards for meritorious students.</li> <li>Library  Facility– High text, reference books, e-journals etc.</li> <li>Hostel facilities for Boys and Girls.</li> <li>Bus Facility for students from various places.</li> <li>Programs on personality development, aptitude, communication skills, soft skills and body language.</li> <li>Programs on personality development, aptitude, communication skills, soft skills and body language.</li> <li>Well qualified and experienced teaching staff.</li> <li>All government scholarships.</li> <li>Industry standard laboratories and Workshops.</li> <li>Internet Facility with 50 mbps bandwidth.</li> <li>Training and Placement Cell.</li>  </div>"
    )
  })

  affiliate.addEventListener("click", function(){
    renderMessageEle(
      "<div class='bot'> <h3>'Our college is affiliated with the University of <span class='bot-underline'><a  href='https://dbatu.ac.in/'>Dr.Babasaheb Ambedkar Technological University</a></span> Lonere-402103 Tal-Mangaon Dist- Raigad (M.S.) India, which means that our students have access to the university's resources, such as its library, faculty, and research facilities.'</h3></div>"
    )
  })



  // feedback form section


const feedBack = document.querySelector('.feedBack1');
const feedbut = document.querySelector('.feedBack');
feedbut.addEventListener('click', () =>{
  if(feedBack.style.display == 'flex'){
    feedBack.style.display = 'none';
    console.log("yes");
  }else{
    feedBack.style.display = 'flex';
    console.log("no");
  }
  
  console.log("I'm clicked");
})

const smilies = document.querySelectorAll(".smile");

let smileCount = -1;
  smilies.forEach((smile)=>{
    smile.addEventListener('click', function(){   
    var rating = parseInt(smile.id.replace("smile",""),10);
    fillRating(rating);
    updateRating(rating);
    })
    //hover effect
    smile.addEventListener('mouseover', function(){
      var rating = parseInt(smile.id.replace("smile",""),10);
      fillRating(rating);
    })
    //remove hover effect
    smile.addEventListener('mouseleave', function(){
      var rating = parseInt(smile.id.replace("smile",""),10);
      fillRating(rating);
    })
  })

  function fillRating(num){
    // if(smileCount !== num){
    if(smileCount === num){
      smilies[num - 1].classList.add("select");
    } else{
      smilies[num - 1].classList.toggle("select");
    }
  }
  
  function updateRating(num){
    smilies.forEach((smile, index)=>{
      if(num-1 !== index){
        console.log(index);
        smile.classList.remove("select");
      }
    })
    smileCount=num;
  }

// catagory

const cat =document.querySelectorAll(".catag");
let catSubject = "";
let select = -1;
cat.forEach((catagory,index)=>{
  catagory.addEventListener("click",function(){
    catSubject = catagory.innerHTML;
    // fillIt(index);
    updateCat(index);
  })
  catagory.addEventListener('mouseover', function(){
    fillIt(index);
  })
  //remove hover effect
  catagory.addEventListener('mouseleave', function(){
    fillIt(index);
  })
})

function fillIt(num) {
  if(num === select ){
    cat[num].classList.add("selectCat");
  } else{
    cat[num].classList.toggle("selectCat");
  }
}

  function updateCat(num) {
    cat.forEach((catagory,index)=>{
      if(num !== index){
        cat[index].classList.remove("selectCat");
      }
    })  
      select = num;
  }

function sendFeed(){
  var xhr = new XMLHttpRequest();
  var url = "/feeddata"; 
  var data = JSON.stringify({rating:smileCount,catagory:catSubject,feedText: document.querySelector(".textarea").value})
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
      let json = JSON.parse(xhr.responseText);
      console.log(json.response);
    }
  }
  xhr.send(data);
  select = 0;
  smileCount = 0;
  document.querySelector(".textarea").value = "";
  feedBack.style.display = 'none';
}


// Good And Bad Thumb

const g1 =  document.querySelectorAll(".goodthumb");

g1.forEach((thumb,index)=>{
  thumb.addEventListener("click",()=>{
    thumb.style.color = "white";
    console.log("clicked");
    console.log(index);
  })
})

// const b1 =  document.querySelectorAll(".badthumb");

// b1.forEach((thumb)=>{
//   thumb.addEventListener("click",()=>{
//     thumb.style.color = "white";
//     console.log("clicked");
//   })
// })

// onclick='goodThumb("+ Math.floor(bad = bad + 2) +")