const tf = require('@tensorflow/tfjs-node'); 

const fs = require('fs');

const stopWords0 = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];

async function data() {
    // Read the JSON file
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
            // if(!stopWords0.includes(w)){
            if( !bagOfWords[ w ] ) {
                bagOfWords[ w ] = 0;
            }
            bagOfWords[ w ]++; // Counting occurrence just for word frequency fun
        // }
    });
    });

    allWords = Object.keys( bagOfWords );
    allWords.forEach( ( w, i ) => {// for word key is 'w' and for the key letter is 'i'
        wordReference[ w ] = i + 1;
    });

    // Create a tokenized vector for each question
    const maxSentenceLength = 30;
    let vectors = [];
    questions.forEach( q => {
        let qVec = [];
        // Use a regex to only get spaces and letters and remove any blank elements
        let words = q.replace(/[^a-z ]/gi, "").toLowerCase().split( " " ).filter( x => !!x );
        for( let i = 0; i < maxSentenceLength; i++ ) {
            // if(!stopWords0.includes(words[i])){
            if( words[ i ] ) {
                qVec.push( wordReference[ words[ i ] ] );
            }
            else {
                // Add padding to keep the vectors the same length
                qVec.push( 0 );
            // }
        }
        }
        vectors.push( qVec );
    });

    let outputs = questions.map( ( q, index ) => {
        let output = [];
        for( let i = 0; i < questions.length; i++ ) {
            output.push( i === index ? 1 : 0 );
        }
        return output;
    });

    // Define our RNN model with several hidden layers
    const model = tf.sequential();
    // Add 1 to inputDim for the "padding" character
    const i = model.add(tf.layers.embedding( {inputDim: allWords.length + 1, outputDim: 128, inputLength: maxSentenceLength, maskZero: true } ) );
    model.add(tf.layers.simpleRNN( { units: 32} ) );
    // model.add(tf.layers.bidirectional( { layer: tf.layers.simpleRNN( { units: 32 } ), mergeMode: "concat" } ) );
    model.add(tf.layers.dense( { units: 50} ));
    model.add(tf.layers.dense( { units: 25} ) );
    model.add(tf.layers.dense( {
        units: questions.length,
        activation: "softmax"
    } ) );
    // Create an arbitrary graph of layers, by connecting them

    model.compile({
        optimizer: tf.train.adam(),
        loss: "categoricalCrossentropy",
        metrics: [ "accuracy" ]
    });

    const xs = tf.stack( vectors.map( x => tf.tensor1d( x ) ) );
    const ys = tf.stack( outputs.map( x => tf.tensor1d( x ) ) );
    await model.fit( xs, ys, {
        epochs: 500,
        callbacks: {
            onEpochEnd: ( epoch, logs ) => {
                console.log( `Training... Epoch #${epoch} (${logs.acc})` );
                console.log( "Epoch #", epoch, logs );
            }
        }
    }
    );
    await model.save('file:///react/chatbot/model')
    .then(()=>{
        console.log("model saved");
    })
    .catch((err)=>{
        console.log(err);
    })
}
data();