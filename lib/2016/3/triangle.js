module.exports = class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  isValid() {
    return (this.a + this.b) > this.c &&
           (this.a + this.c) > this.b &&
           (this.b + this.c) > this.a;
  }
}