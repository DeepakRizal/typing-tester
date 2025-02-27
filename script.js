const typingContent = document.querySelector(".typing-content");
const inputElement = document.querySelector(".type-input");
const timerElement = document.querySelector(".timer");

const alphabets = "abcdefghijklmnopqrstuvwxyz";

let totalTime = 60;

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

//function to start timer on the screen
let timer;

function startTimer() {
  if (timer) return;
  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      timerElement.textContent = totalTime;
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

// Generate a random paragraph when the page loads
document.addEventListener("DOMContentLoaded", () => {
  typingContent.textContent = getRandomParagraph();
});

// Highlight correct and incorrect characters
inputElement.addEventListener("input", () => {
  const inputValue = inputElement.value;
  const originalText = typingContent.textContent;
  let updatedHTML = "";

  for (let i = 0; i < originalText.length; i++) {
    if (i < inputValue.length) {
      if (originalText[i] === inputValue[i]) {
        updatedHTML += `<span class="correct" >${originalText[i]}</span>`;
      } else {
        updatedHTML += `<span class="incorrect" >${originalText[i]}</span>`;
      }
    } else {
      updatedHTML += originalText[i];
    }
  }

  typingContent.innerHTML = updatedHTML;
});

inputElement.addEventListener("focus", () => {
  startTimer();
});
