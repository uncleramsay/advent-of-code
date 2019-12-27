import { readFileSync } from 'fs';
import { set } from 'lodash';
import Layer from './Layer';

const IMAGE_WIDTH = 25;
const IMAGE_HEIGHT = 6;

class Solution {
  private input: string;
  private layers: Layer[] = [];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private chunkify(values: number[], chunkSize: number): Array<number[]> {
    const rval: Array<number[]> = [];

    for (let i = 0, j = values.length; i < j; i += chunkSize) {
      rval.push(values.slice(i, i + chunkSize));
    }

    return rval;
  }

  private processData(): void {
    const numberLayerPixels = IMAGE_HEIGHT * IMAGE_WIDTH;
    const layerPixels = this.chunkify(
      this.input.split('').map(pixel => parseInt(pixel, 10)),
      numberLayerPixels,
    );

    for (const pixels of layerPixels) {
      const rows = this.chunkify(pixels, IMAGE_WIDTH);
      this.layers.push(new Layer(rows));
    }
  }

  public part1() {
    let minLayerIndex = Number.MIN_SAFE_INTEGER;
    let minZeros = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < this.layers.length; i++) {
      const layer = this.layers[i];
      const numZeros = layer.countPixelsWithValue(0);

      if (numZeros < minZeros) {
        minZeros = numZeros;
        minLayerIndex = i;
      }
    }

    const minLayer = this.layers[minLayerIndex];
    return minLayer.countPixelsWithValue(1) * minLayer.countPixelsWithValue(2);
  }

  public part2() {
    const pixels: Array<number[]> = [];

    for (const layer of this.layers) {
      const rows = layer.getRows();

      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
          if (pixels[rowIndex] && pixels[rowIndex][colIndex] !== undefined) {
            continue;
          }

          const pixel = rows[rowIndex][colIndex];
          if (pixel === 0 || pixel === 1) {
            set(pixels, [rowIndex, colIndex], pixel);
          }
        }
      }
    }

    let border = '█';
    for (let i = 0; i < IMAGE_WIDTH; i++) {
      border += '█';
    }
    border += '█';
    console.log(border);

    for (const row of pixels) {
      let output = '█';
      for (const pixel of row) {
        if (pixel === 0) {
          output += '█';
        } else {
          output += ' ';
        }
      }
      output += '█';
      console.log(output);
    }

    console.log(border);

    return 'CYKBY';
  }
}

export default Solution;
