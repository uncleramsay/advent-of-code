const _ = require('lodash');

module.exports = class DataFiller {
  constructor(diskSize) {
    this.diskSize = diskSize;
  }

  fillDisk(data) {
    this.data = data;

    while(this.data.length < this.diskSize) {
      const a = this.data;
      let b = a.split('').reverse().join('');
      b = DataFiller.invertData(b);
      this.data = a + '0' + b;

      this.displayDiskProgress();
    }

    this.data = this.data.substr(0, this.diskSize);
    this.displayDiskProgress();
    console.log();
  }

  getChecksum() {
    let checksum = this.data;

    while(checksum === this.data || checksum.length % 2 === 0) {
      let newChecksum = '';
      for (let i = 0; i < checksum.length; i += 2) {
        newChecksum += (checksum[i] === checksum[i+1]) ? '1' : '0';
      }
      checksum = newChecksum;
      this.displayChecksumProgress(checksum);
    }

    console.log();
    return checksum;
  }

  displayDiskProgress() {
    const percentage = (this.data.length / this.diskSize) * 100;

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Disk ${percentage.toFixed(0)}% full`);
  }

  displayChecksumProgress(checksum) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Checksum length: ${checksum.length}`);
  }

  static invertData(data) {
    let rval = '';
    _.each(data, (char) => {
      rval += char === '1' ? '0' : '1';
    });

    return rval;
  }
}
