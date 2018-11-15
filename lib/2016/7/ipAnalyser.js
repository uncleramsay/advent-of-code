const _ = require('lodash');

module.exports = class IpAnalyser {
  constructor() {
    this.ips = [];
  }

  parseIps(ips) {
    this.ips = ips.split('\n');
  }

  countTlsIps() {
    let count = 0;

    _.each(this.ips, (ip) => {
      const components = ip.split(/\[|\]/);
      let increment = 0;

      for (let i = 0; i < components.length; i++) {
        if (i % 2 !== 0) {
          // Bracketed component
          if (IpAnalyser.componentContainsAbba(components[i])) {
            increment = 0;
            return;
          }

          continue;
        }

        if (IpAnalyser.componentContainsAbba(components[i])) {
          increment = 1;
        }
      }

      count += increment;
    });

    return count;
  }

  countSslIps() {
    let count = 0;

    for (const ip of this.ips) {
      const components = ip.split(/\[|\]/);
      let abas = new Set();
      let babs = new Set();

      for(let i = 0; i < components.length; i++) {
        const componentAbas = IpAnalyser.getComponentAbas(components[i]);
        if (!componentAbas) {
          continue;
        }

        if (i % 2 !== 0) {
          // Bracketed component
          for (const aba of componentAbas) {
            babs.add(IpAnalyser.abaToBab(aba));
          }
          continue;
        }

        for (const aba of componentAbas) {
          abas.add(aba);
        }
      }

      let increment = 0;
      for (const aba of abas) {
        if (babs.has(aba)) {
          increment = 1;
        }
      }

      count += increment;
    }

    return count;
  }

  static componentContainsAbba(component) {
    const regex = /^.*(.)(.)\2\1.*$/;
    const matches = component.match(regex);
    return matches && (matches[1] !== matches[2]);
  }

  static getComponentAbas(component) {
    let rval = [];

    const regex = /((.)([^\2])\2)/g;
    while (component.length > 0) {
      const matches = component.match(regex);
      if (matches) {
        rval = _.concat(rval, matches);
      }

      component = component.substr(1);
    }

    return rval;
  }

  static abaToBab(aba) {
    return aba[1] + aba[0] + aba[1];
  }
}
