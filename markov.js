/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== '');
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "hat": [null]} */

  makeChains() {
    // TODO
    let wordsMap = new Map();
    for (let i = 0; i < this.words.length; i++) {
      if (wordsMap.get(this.words[i])) {
        wordsMap.get(this.words[i]).push(this.words[i + 1]);
      } else {
        wordsMap.set(this.words[i], [this.words[i + 1]]);
      }
    }
    this.wordChain = wordsMap;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let currWord = this.words[Math.floor(Math.random() * this.words.length)];
    let output = [];
    for (let i = 0; i < numWords; i++) {
      if (currWord === undefined) break;
      let currWordArray = this.wordChain.get(currWord);
      currWord =
        currWordArray[Math.floor(Math.random() * currWordArray.length)];
      output.push(currWord);
    }
    return output.join(' ').trim();
  }
}

let mm = new MarkovMachine('the cat in the hat');
mm.makeText();

module.exports = {
  MarkovMachine
};
