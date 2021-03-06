(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Importing the functions from what you did in part 1.
const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election');

/**
 * 1 - Write a Voter class modelling a member of the population who votes in the election.
 */ 
 class Voter {
	constructor(name,age,votingCard) {
		this.name = name;
		this.age = age;
		this.votingCard = votingCard;
	}
 };


/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */
class Candidate extends Voter {
	constructor(name,age,votingCard,party,id) {
		super(name,age,votingCard);
		this.party = party;
    this.id = id;
		this.numVotes = 0;
	}
};


/**
 * 3 - Write an Election class which models the election.
 */
 class Election {
 	constructor(validVoters,candidates) {
 		this.validVoters = validVoters;
 		this.candidates = candidates;
 		this.winner = '';
 	};

 	runElection() {
 		this.candidates = runElection(this.validVoters, this.candidates);
    this.getWinner();
 	}
 	
 	getWinner() {
 		this.winner = getWinner(this.candidates);
 	};

 	printWinnerMessage() {
 		return winnerMessage(this.winner);
 	}

 }

const fetchElectionData = function(){
  const dataJSON = 'https://www.mocky.io/v2/5a55224b2d000088425b1ed8';
  fetch(dataJSON)
  .then(response => response.json())
  .then(data => getData(data)) 
  // .then(() => arrayToObject(candidatesArr,'id'))
  // .then((candidatesArr) => getCandidatesObj(candidatesArr))
  .then(() => updateVariables())
  .then(() => createCandidatesList(candidates))
  .then(() => createVotersList(votingPopulation))
  // .then(() => runElectionButton())
  .catch(err => console.log(err))
}

fetchElectionData();

let votingPopulation = [];
let candidates = [];
let allVoters;
let validVoters;
let election;

const getData = function(allData) {
  allData.voters.forEach(function(person) {
    votingPopulation.push(new Voter(person.name,person.age,person.votingCard));
  });
  allData.candidates.forEach(function(person){
    candidates.push(new Candidate(person.name,person.age,person.votingCard,person.party,person.id));
  });
  // console.log(candidates);
  // console.log(votingPopulation);
};

// const arrayToObject = (arr, keyField) =>
//   Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));


// const getCandidatesObj = (candidatesArr) =>
//   let candidates = arrayToObject(candidatesArr,'id')
//   console.log(candidates);






              // CREATE HTML INTERFACE 

// Include your votingPopulation array here.
// let votingPopulation = [
// 	new Voter('Jane Finnegan', 19, [1, 3]),
// 	new Voter('Norman Beracha', 35, [3, 4]),
// 	new Voter('Wei Li',  19, [1, 2]),
// 	new Voter('Sam MacKinnon', 59, [1, 4]),
//   new Voter('Salome Kadek', 22, [2,1,3])
// ];


// Include your candidates array here.
// let candidates = {
// 	1: new Candidate('Tamara Faiza', 46, [1,1], 'Pizza Party'),
// 	2: new Candidate('Aylin Duke', 39, [2,2], 'Foam Party'),
// 	3: new Candidate('Clay Roderick', 54, [3,4], 'Flat Earth Party'),
// 	4: new Candidate('Nour al-Din', 32, [4,1], 'Pizza Party')
// };


// let allVoters = votingPopulation.concat(candidatesObjToArray(candidates)); 


// let allVoters = votingPopulation.concat(candidates); 

// let validVoters = filterInvalidVoters(allVoters);

// let election = new Election(validVoters, candidates);


const updateVariables = function() {
  allVoters = votingPopulation.concat(candidates); 
  validVoters = filterInvalidVoters(allVoters);
  election = new Election(validVoters, candidates);

  // console.log(allVoters);
}

// const createValidVoters = function() {
//   let validVoters = filterInvalidVoters(allVoters);
//   console.log(validVoters);
//   return validVoters;
// }

// const createElection = function() {
//   let election = new Election(validVoters, candidates);
//   console.log(election);
//   return election;


// election.runElection(); // Example of how runElection() can be called.
// console.log(election.candidates);
// election.getWinner();
// console.log(election.winner);
// console.log(election.printWinnerMessage());
// Example of how the winner message can be printed.




// Create list of candidates
const createCandidatesList = (candidatesObj) => {
  var classC = document.querySelector('.candidates');
  for (candidate in candidatesObj) {
    let li = document.createElement('li');
    li.setAttribute('class', 'candidate');
    let text = document.createTextNode(candidatesObj[candidate].name);
    li.appendChild(text);
    classC.appendChild(li);
  };
};
// createCandidatesList(candidates);

//  Create lists of voters 
const createVotersList = (votersArray) => {
  let classV = document.querySelector('.voters');
  votersArray.forEach(function(voter) {
    let li = document.createElement('li');
    li.setAttribute('class', 'voter');
    let text = document.createTextNode(voter.name);
    li.appendChild(text);
    classV.appendChild(li);
  });
};
// createVotersList(votingPopulation);



//Add event listener on button
const runElectionButton = function() {
let runButton = document.querySelector('.run');
let messageP = document.querySelector('.winner-message');


runButton.addEventListener("click", function handler() {
  election.runElection();
    console.log(candidates);
  // election.getWinner();
  messageP.innerHTML = election.printWinnerMessage();
  this.removeEventListener("click", handler);

});
};

runElectionButton();


},{"./election":2}],2:[function(require,module,exports){
/**
* CYF JS core 3 election project
*/

/**
 * 1 - Convert candidates object to array
 */
function candidatesObjToArray(candidates) {
  var array = Object.keys(candidates).map(function (key) {
    return candidates[key]; 
  });
  return array;
}

/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
*/
function filterInvalidVoters(voters) {
  var validVoters = voters.filter(function(person) {
    if (person.votingCard.length <= 2) {
      if (person.votingCard[0] != person.votingCard[1]) {
        return person;  
      }
    }
  });
 return validVoters;  
}

/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */
function runElection(voters, candidates) {
  var score = 1;
  voters.forEach(function(voter) {
    for (var i = 1; i <= candidates.length; i++) {
      if (voter.votingCard[0] === i) {
        candidates[i-1].numVotes += score;    // candidate 1 in the array will have index 0,thats why
      } else if (voter.votingCard[1] === i) {
        candidates[i-1].numVotes += score/2;
      }
    }
  })
  return candidates;
}

/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
function getWinner(candidates) {
  var arr = Object.keys(candidates).map(function ( key ) { return candidates[key].numVotes });
  var maxVote = Math.max.apply(null,arr);
  var count = 0;
  for (candidate in candidates) {
    if (candidates[candidate].numVotes === maxVote) {
      count += 1;
      var winner = candidates[candidate];
    }
  }  
  if (count === 1) {
    return winner;
  } else {
    return null;
  }
}

/**
 * 5 - Return a message including the name of the winner, and how many votes
 * he/she received
 */
function winnerMessage(winner) {
    if (winner === null) {
    return "The election was a draw";
  } else {
    // return (`winner.${name} + has won the election with + winner.${numVotes} + votes`);
    return (winner.name + ' has won the election with ' + winner.numVotes + ' votes!');
  }
}

// A sample population of a small number of voters, stored as an array
// let votingPopulation = [
//     {name: 'Jane Finnegan', age: 19, votingCard: [1,3]},
//     {name: 'Norman Beracha', age: 35, votingCard: [3,4]},
//     {name: 'Salome Kadek', age: 22, votingCard: [2,1,3]},
//     {name: 'Wei Li', age: 19, votingCard: [1,2]},
//     {name: 'Sam MacKinnon', age: 59, votingCard: [1,4]}
// ];

// The election candidates, stored as an object where each object key is the candidate ID, and the object
// value is the candidate object itself.
// let candidates = {
//     1: {name: 'Tamara Faiza', age: 46, votingCard: [1,1], party: 'Pizza Party', numVotes: 0},
//     2: {name: 'Aylin Duke', age: 39, votingCard: [2,2], party: 'Foam Party', numVotes: 0},
//     3: {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
//     4: {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
// };

// let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

// let validVoters = filterInvalidVoters(allVoters);

// candidates = runElection(validVoters, candidates);

// let winner = getWinner(candidates);

module.exports = {
  candidatesObjToArray,
  filterInvalidVoters,
  runElection,
  getWinner,
  winnerMessage
}


},{}]},{},[1]);
