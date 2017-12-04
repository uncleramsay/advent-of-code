module.exports = class Room {
  constructor(identifier) {
    const matches = identifier.match(/^(.+)-(\d+)\[(\w{5})\]$/)
    if (!matches) {
      throw 'Could not parse room input';
    }

    this.encryptedName = matches[1];
    this.sectorId = parseInt(matches[2], 10);
    this.checksum = matches[3];
  }

  getSectorId() {
    return this.sectorId;
  }

  isValid() {
    const charCounts = this._countChars();

    // Sort chars by their counts, then alphabetically
    const sortedChars = Object.keys(charCounts).sort((a, b) => {

      // If counts are the same, sort alphabetically
      if (charCounts[a] === charCounts[b]) {
        return a < b ? -1 : 1;
      }

      return -(charCounts[a] - charCounts[b]);
    });

    // Create calculated checksum
    let calculatedChecksum = '';
    for (let i = 0; i < 5; i++) {
      calculatedChecksum += sortedChars[i];
    }

    return calculatedChecksum === this.checksum;
  }

  getDecryptedName() {
    let decryptedName = '';

    for(let i = 0; i < this.encryptedName.length; i++) {
      const char = this.encryptedName[i];

      if (char === '-') {
        decryptedName += ' ';
        continue;
      }

      const charCode = char.charCodeAt();
      const shiftNumber = this.sectorId % 26;

      let newCharCode = charCode + shiftNumber
      // If greater than 'z', circle back round to 'a'
      if (newCharCode > 122) {
        newCharCode -= 26;
      }

      const decryptedChar = String.fromCharCode(newCharCode);
      decryptedName += decryptedChar;
    }

    return decryptedName;
  }

  _countChars() {
    let charCounts = {};

    for (let i = 0; i < this.encryptedName.length; i++) {
      const char = this.encryptedName[i];

      if (char === '-') {
        continue;
      }

      charCounts[char] = charCounts[char] ? charCounts[char] + 1 : 1;
    }

    return charCounts;
  }
}
