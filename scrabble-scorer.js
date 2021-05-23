// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";
function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   word = (input.question("Enter a word to score: "));
   console.log(oldScrabbleScorer(word));
  return word;
};

const simpleScore = (word) => {
  let wordScore = 0;
  for (let i = 0; i < word.length; i++) {
    wordScore++;
  }
  // console.log(wordScore);
  return wordScore;
}
const vowelBonusScore = (word) => {
  word = word.toUpperCase();
  let totalScore = 0;
  // testing alt ways?
for (let i = 0; i < (word.length); i++) {
    if (word[i].includes("A") || word[i].includes("E") || word[i].includes("I") || word[i].includes("O") || word[i].includes("U")) {
      totalScore += Number(3);
      // console.log({totalScore});}
  }
      else {
        totalScore++;
        totalScore = Number(totalScore)
      }
    }
    // console.log(totalScore);
    return totalScore;
  }

const scrabbleScore = (word, newPointStructure) => {
  // console.log(newPointStructure);
  word = word.toLowerCase();
  let wordScore = 0;
  for (let i = 0; i < word.length; i++) {
    // console.log(newPointStructure[word[i]]);
    wordScore = wordScore + newPointStructure[word[i]];
  }
return wordScore
}

const scoringAlgorithms = [
  simpleScoreDet = {
    name: "Simple Score",
    description: "Each Letter is worth 1 point.",
    scoringFunction: simpleScore
  },
  bonusScoreDet = {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore
  },
  oldScrabbleScorerDet = {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: scrabbleScore
  }
];

function scorerPrompt() {
  let ruleChoice;
  console.log("Which scoring algorithm would you like to use?\n");
  while (ruleChoice < 0 || ruleChoice > 2 || isNaN(ruleChoice)){
    for(i in scoringAlgorithms){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
    }
    ruleChoice = Number(input.question("Enter your choice: "));
  }
  return ruleChoice;
}


function transform(oldPointStructure) {
  let pointStructure = {};

  for(const key in oldPointStructure){
    let letterArray = oldPointStructure[key]
    for(i = 0; i < letterArray.length; i++){
      // console.log(oldPointStructure[key][i])
      pointStructure[letterArray[i].toLowerCase()] = Number(key);
    }
  }
  return pointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  console.clear();
   let wordChoice = initialPrompt();
   simpleScore(wordChoice);
   vowelBonusScore(wordChoice);
   let ruleChoice = scorerPrompt();
  console.log(ruleChoice); // what is ruleChoice? -> 0, 1, 2
  console.log(scoringAlgorithms[ruleChoice].name);
  // console.log(scoringAlgorithms[ruleChoice].descripton); // what does this do?
  console.log(`Score for '${wordChoice}': ${scoringAlgorithms[ruleChoice].scoringFunction(wordChoice, newPointStructure)}`);
   // this is going log to the console the name property of their choice
// console.log(newPointStructure);
  
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

