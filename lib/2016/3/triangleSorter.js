const _ = require('lodash');
const Triangle = require('./triangle');

module.exports = class TriangleSorter {
  constructor() {
    this.triangles = [];
  }

  parseSpecRows(specs) {
    specs = specs.split('\n');
    _.each(specs, (spec) => {
      const matches = spec.match(/^\s*(\d+)\s*(\d+)\s*(\d+)$/);

      const a = parseInt(matches[1], 10);
      const b = parseInt(matches[2], 10);
      const c = parseInt(matches[3], 10);
      this.triangles.push(new Triangle(a, b, c));
    });
  }

  parseSpecCols(specs) {
    specs = specs.split('\n');

    let triangleSpecs = [
      [],
      [],
      []
    ];

    _.each(specs, (spec) => {
      const matches = spec.match(/^\s*(\d+)\s*(\d+)\s*(\d+)$/);

      const col0 = parseInt(matches[1], 10);
      const col1 = parseInt(matches[2], 10);
      const col2 = parseInt(matches[3], 10);

      triangleSpecs[0].push(col0);
      triangleSpecs[1].push(col1);
      triangleSpecs[2].push(col2);

      if (triangleSpecs[0].length === 3) {
        _.each(triangleSpecs, (triangleSpec) => {
          this.triangles.push(new Triangle(triangleSpec[0], triangleSpec[1], triangleSpec[2]));
        })

        triangleSpecs = [
          [],
          [],
          []
        ];
      }
    });
  }

  getTriangles() {
    return this.triangles;
  }

  getValidTriangles() {
    let validTriangles = [];

    _.each(this.triangles, (triangle) => {
      if (triangle.isValid()) {
        validTriangles.push(triangle);
      }
    });

    return validTriangles;
  }
}
