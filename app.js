// v 1.0.1
// *** //
// use keyboard next time
// remove reloading feature
// add scores
// add hint
// or use all words in a field
// *** //
const guessInput = document.querySelector(".guess");
const alphabets = document.querySelectorAll(".alphabets > ul > li");
const lives = document.querySelector(".lives > h3");
const livesContainer = document.querySelector(".lives");
const gameOver_div = document.querySelector(".game-over-content");
const bodyContainer = document.querySelector(".body-container");
const hintBtn = document.getElementById("hint");

// ?create p elemnts as input
function createInputElement() {
  const para = document.createElement("p");
  guessInput.appendChild(para);
}

// ?words to be guessed
const words = [
 {word: "africa", hint: "It's a continent's name."},
  {word: "jean", hint: "What we wear often."},
  {word: "santa", hint: "Only comes on Christmas Eve"},
  {word: "second", hint: "Used to record time"},
  {word: "matter", hint: "A major aspect of Chemistry"},
  {word: "primary", hint: "A major part of usually two stages"},
  {word: "loveworld", hint: "A church headquartered in Nigeria"},
  {word: "amnesia", hint: "Loss of memory"},
  {word: "physics", hint: "A subject in science"},
  {word: "sick", hint: "Word used to describe ill people"},
  {word: "christ", hint: "A savior"},
  {word: "teevo", hint: "A most read book by teenagers"},
  {word: "rhapsody", hint: "Second most distributed book after the bible"},
  {word: "juanita", hint: "Spanish name for ladies, starts with a j"},
  {word: "barcelona", hint: "a big football team in spain"},
  {word: "coding", hint: "what made this game"},
  {word: "javascript", hint: "most used programming language for web development"}
];

// ?pick words in random
let selectedWord, selectedIndex;
function randomWords() {
  const selected = words[Math.floor(Math.random() * words.length)];
  selectedWord = selected.word
  selectedIndex = words.indexOf(selected);
}
randomWords();

// ?loop selected words inyo dashes
function loopSelectedWords() {
  for (let i = 0; i < selectedWord.length; i++) {
    createInputElement();
  }
}
loopSelectedWords();

// ?para dom collection
const dashes = document.querySelectorAll(".guess > p");

const inputArray = [];
function theWord(letter) {
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] == letter) {
      dashes.forEach((all, index) => {
        if (index === i) {
          all.innerText = selectedWord[i];
        }
      });
      checkResult();
    }
  }
}

function checkResult() {
  dashes.forEach((all) => {
    // ?push final input to an empty array
    inputArray.push(all.innerText);
  });

  const inputArrayString = inputArray.join("");
  // ?compare empty array with original selected word
  const answer = inputArrayString.substr(
    -selectedWord.length,
    inputArrayString.length
  );
  if (answer === selectedWord) {
  		 correct();
  }
}

function alertInfo(header, text, btnText, btnEvent) {
gameOver_div.querySelector("h3").innerText = header;	gameOver_div.querySelector("p").innerHTML = text;
gameOver_div.querySelector("button").innerText = btnText;
}

let hintProof = false;

function displayHint() {
		openModal()
	const hintMsg = words[selectedIndex].hint;
	hintProof = true;
	alertInfo("Hint", hintMsg, "Close")
}

function correct() {
	openModal();
  
const message = `You guessed the word correctly: <b>"${selectedWord}"</b>`;
alertInfo("Correct", message, "Continue");
hintProof = false;
}

function failedAttempt() {
		openModal();
		const failedMsg = `You've exhausted all remaining lives!: <br> The Word: <b>"${selectedWord}"</b>`;
		alertInfo("Wrong", failedMsg, "Try again");
		hintProof = false;
}

function openModal() {	gameOver_div.classList.add("active");
  bodyContainer.classList.add("active");
}

function closeModal() {
		gameOver_div.classList.remove("active");
  bodyContainer.classList.remove("active");
}

// ?lives counting
let live = selectedWord.length + 2;
const livePoint = selectedWord.length + 2;
lives.innerText = live;

function checkSpareLives() {
  live--;
  lives.innerText = live;
  if (live <= 0) {
    failedAttempt();
  }

  if (live <= Math.floor(livePoint / 2)) {
  		livesContainer.classList.add("limited");
  	}
}

// testing if clicked letter is in selected words
function checkAuth(letter) {
  // ?use regex to test for correct and incorrect clicked action
  const validate = /[\selectedWord]/gi;
  console.log(validate.test(letter));
}

// ?alphabets click event / function
function gameOn() {
  alphabets.forEach((letter) => {
    letter.addEventListener("click", function () {
      const letterPicked = this.innerText;
      this.classList.add("contains");
      const classname = this;
      /*	checkAuth(letterPicked, classname);*/
      theWord(letterPicked);
      checkSpareLives();
    });
  });
}
gameOn();
// ?hint button
hintBtn.addEventListener("click", displayHint);

gameOver_div.querySelector("button").addEventListener("click", () => {
		if (hintProof) {
				return closeModal()
			} else {
					return location.reload();
			}
		});
		













