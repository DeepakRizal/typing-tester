const typingContent = document.querySelector(".typing-content");
const inputElement = document.querySelector(".type-input");
const timerElement = document.querySelector(".timer");
const wpmElement = document.querySelector(".w-p-m");

console.log(wpmElement); //Fix: Correct variable name

const alphabets = "abcdefghijklmnopqrstuvwxyz";
let totalTime = 60;
let correctWords = 0;
let timer;
let typingFinished = false; //New flag to check if typing is completed

function getRandomLetter() {
  return alphabets[Math.trunc(Math.random() * alphabets.length)];
}

function getRandomWords(wordsLength = 3 + Math.trunc(Math.random() * 5)) {
  let word = "";
  for (let i = 0; i < wordsLength; i++) {
    word += getRandomLetter();
  }
  return word;
}

function getRandomSentence(
  sentencesLength = 5 + Math.trunc(Math.random() * 5)
) {
  let words = [];
  for (let i = 0; i < sentencesLength; i++) {
    words.push(getRandomWords());
  }
  return words.join(" ");
}

function getRandomParagraph(sentenceCount = 3 + Math.trunc(Math.random() * 5)) {
  let paragraph = [];
  for (let i = 0; i < sentenceCount; i++) {
    paragraph.push(getRandomSentence());
  }
  return paragraph.join(" ");
}

// Start Timer
function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      timerElement.textContent = totalTime;
    } else {
      clearInterval(timer);
      timer = null;
      typingFinished = true; // Mark typing as finished
      updateWPM(); // Call WPM update ONLY when time is up
    }
  }, 1000);
}

// Generate Random Text
document.addEventListener("DOMContentLoaded", () => {
  typingContent.textContent = getRandomParagraph();
});

function updateWPM() {
  let timeElapsed = (60 - totalTime) / 60;
  let wpm = timeElapsed > 0 ? Math.round(correctWords / timeElapsed) : 0;
  wpmElement.textContent = `WPM: ${wpm}`;
}

// Handle Typing Input
inputElement.addEventListener("input", () => {
  if (typingFinished) return; //Prevent updates after time is up

  const inputValue = inputElement.value;
  const originalText = typingContent.textContent;
  let updatedHTML = "";

  let originalWords = originalText.split(" ");
  let typedWords = inputValue.trim().split(" ");

  // Correctly count correct words
  correctWords = typedWords.filter(
    (word, index) => word === originalWords[index]
  ).length;

  for (let i = 0; i < originalText.length; i++) {
    if (i < inputValue.length) {
      updatedHTML +=
        originalText[i] === inputValue[i]
          ? `<span class="correct">${originalText[i]}</span>`
          : `<span class="incorrect">${originalText[i]}</span>`;
    } else {
      updatedHTML += originalText[i];
    }
  }

  typingContent.innerHTML = updatedHTML;
});

// Start Timer When Typing Starts
inputElement.addEventListener("focus", () => {
  startTimer();
});
