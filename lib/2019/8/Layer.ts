export default class Layer {
  public constructor(private pixels: Array<number[]>) {}

  public countPixelsWithValue(value: number) {
    let count = 0;

    for (const row of this.pixels) {
      count += row.filter((pixel: number) => pixel === value).length;
    }

    return count;
  }

  public getRows(): Array<number[]> {
    return this.pixels;
  }
}
