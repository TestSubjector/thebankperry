var natural = require("natural");
var stemmer = natural.PorterStemmer;
var Weight = natural.TfIdf;
var weight = new Weight();
stemmer.attach();
var sentences = [
    "Please get me my bank statement",
    "What is the statement of my bank.",
    "What is my bank statement.",
    "statement please",
    "bank statement please",
    "I want the Bank Statement",
    "I don't want the bank statements.",
    "I want to see my banking records",
    "I want to see my transaction history",
    "idk. Google Search."
];

var keywords = "statement,bank statement,transaction history,history,bank record,transaction".split(',');
sentences.forEach(function (elem) {
    elem = elem.tokenizeAndStem(true);
    var sentence = "";
    elem.forEach(function (word) {
        sentence = sentence + word + " ";
    })
    weight.addDocument(elem);
})
var print = function (index, measure) {
    //console.log("\t" + measure + ' - ' + sentences[index] );
    score[index] = score[index] || 0;
    score[index] += measure;
}


function evalSentence(sentence) {
    var score = 0;
    var print = function (index, measure) {
        //console.log("\t" + measure + ' - ' + sentences[index] );
        score += measure;
    }
    sentence = sentence.tokenizeAndStem(true);
    var sen = "";
    sentence.forEach(function (word) {
        sen = sentence + word + " ";
    })
    var weight = new Weight();
    weight.addDocument(sen);
    keywords.forEach(function (elem, index) {
        //console.log(index,elem);
        elem = stemmer.stem(elem);
        weight.tfidfs(elem, print);
    })
    return score;
}
