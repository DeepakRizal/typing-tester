const typingContent = document.querySelector(".typing-content");

const alphabets = "abcdefghijklmnopqrstuvwxyz";

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

document.addEventListener("DOMContentLoaded", () => {
  typingContent.textContent = getRandomParagraph();
});
