const { MarkovMachine } = require('./markov');
const axios = require('axios');
const fs = require('fs');
const process = require('process');

async function makeText(type, source) {
  try {
    let text = await getData(type, source);
    let machine = new MarkovMachine(text);
    return machine.makeText();
  } catch (err) {
    console.log(err);
  }
}

async function getData(type, source) {
  if (type === 'url') {
    try {
      return (await axios.get(source)).data;
    } catch (err) {
      console.error(err);
    }
  } else {
    fs.readFile(source, 'utf8', (err, data) => {
      if (err) {
        throw 'err reading file';
      } else {
        return data;
      }
    });
  }
}

makeText(process.argv[2], process.argv[3]);
