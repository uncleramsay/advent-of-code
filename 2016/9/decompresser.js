const _ = require('lodash');

module.exports = class Decompresser {
  constructor() {
    this.compressedLines = [];
    this.decompressedLines = [];
  }

  parseFile(file) {
    this.compressedLines = file.split('\n');
  }

  decompressV1() {
    _.each(this.compressedLines, (line) => {
      const decompressedLine = Decompresser.expandRepeatedBlock(line);
      this.decompressedLines.push(decompressedLine);
    });
  }

  getV2CharCount() {
    let count = 0;

    _.each(this.compressedLines, (line) => {
      count += Decompresser.countRepeatedBlock(line);
    });

    return count;
  }

  getCharCount() {
    let count = 0;

    _.each(this.decompressedLines, (line) => {
      const noWhitespace = line.replace(' ', '');
      count += noWhitespace.length;
    });

    return count;
  }

  static expandRepeatedBlock(line) {
    let rval = line;

    let matches = line.match(/\((\d+)x(\d+)\)/);
    if (matches) {
      const charsToRepeat = parseInt(matches[1], 10);
      const repeatAmount = parseInt(matches[2], 10);

      const markerIndex = line.indexOf(matches[0]);
      rval = line.substr(0, markerIndex);

      const sectionIndex = markerIndex + matches[0].length;
      const repeatedSection = line.substr(sectionIndex, charsToRepeat);
      for (let i = 0; i < repeatAmount; i++) {
        rval += repeatedSection;
      }

      const restOfLine = line.substr(sectionIndex + charsToRepeat);
      rval += Decompresser.expandRepeatedBlock(restOfLine);
    }

    return rval;
  }

  static countRepeatedBlock(line) {
    let count = 0;

    const regexStart = /^\((\d+)x(\d+)\)/;
    const regexAnywhere = /\((\d+)x(\d+)\)/;

    let remainingString = line;
    while (remainingString.length > 0) {

      const matches = remainingString.match(regexStart);
      if (matches) {
        const charsToRepeat = parseInt(matches[1], 10);
        const repeatAmount = parseInt(matches[2], 10);
        const sectionIndex = matches[0].length;
        const repeatedSection = remainingString.substr(sectionIndex, charsToRepeat);

        if (regexAnywhere.test(repeatedSection)) {
          count += repeatAmount * Decompresser.countRepeatedBlock(repeatedSection);
        } else {
          count += (charsToRepeat * repeatAmount);
        }

        remainingString = remainingString.substr(sectionIndex + charsToRepeat);
      } else {
        count += 1;
        remainingString = remainingString.substr(1);
      }
    }

    return count;
  }
}

