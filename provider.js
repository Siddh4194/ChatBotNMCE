const fs = require('fs');
const jsonString = fs.readFileSync('verified-wikipedia-dev.json', 'utf8');

// Parse the JSON data
const triviaData = JSON.parse(jsonString);
    // Load TriviaQA data
    // let triviaData = await fetch( "/verified-wikipedia-dev.json" ).then( r => r.json() );
    let data = triviaData.Data;
    // console.log(data);

//     // Process all QA to map to answers
    let questions = data.map( qa => qa.Question );

    let bagOfWords = {};
    let allWords = [];
    let wordReference = {};
    questions.forEach( q => {
        let words = q.replace(/[^a-z ]/gi, "").toLowerCase().split( " " ).filter( x => !!x );
        words.forEach( w => {
            if( !bagOfWords[ w ] ) {
                bagOfWords[ w ] = 0;
            }
            bagOfWords[ w ]++; // Counting occurrence just for word frequency fun
        });
    });

    allWords = Object.keys( bagOfWords );
    allWords.forEach( ( w, i ) => {// for word key is 'w' and for the key letter is 'i'
        wordReference[ w ] = i + 1;
    });




      fs.writeFile("data.js",JSON.stringify(wordReference) , function(err) {
          if (err) {
              console.log(err);
          } else {
              console.log("File created successfully!");
          }
      });
      
