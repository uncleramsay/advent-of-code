class Wire {
  private path: Record<string, number> = {};

  public constructor(instructions: string[]) {
    this.processInstructions(instructions);
  }

  private processInstructions(instructions: string[]): void {
    let currentX = 0;
    let currentY = 0;
    let stepCount = 0;

    for (const instruction of instructions) {
      const direction = instruction.substr(0, 1);
      const distance = parseInt(instruction.substr(1), 10);

      for (let i = 0; i < distance; i++) {
        switch (direction) {
          case 'U': {
            currentY += 1;
            break;
          }

          case 'R': {
            currentX += 1;
            break;
          }

          case 'D': {
            currentY -= 1;
            break;
          }

          case 'L': {
            currentX -= 1;
            break;
          }

          default: {
            throw `Couldn't understand direction: ${direction}`;
          }
        }

        stepCount += 1;
        const key = `${currentX},${currentY}`;
        if (this.path[key] === undefined) {
          this.path[key] = stepCount;
        }
      }
    }
  }

  public getPath(): Record<string, number> {
    return this.path;
  }

  public static findCrossPoints(wires: Wire[]): Record<string, number[]> {
    const crossPoints: Record<string, number[]> = {};

    for (let i = 0; i < wires.length - 1; i++) {
      const originalWire = wires[i];
      const originalPath = originalWire.getPath();

      for (let j = i + 1; j < wires.length; j++) {
        const nextWire = wires[j];
        const nextPath = nextWire.getPath();

        for (const point in originalPath) {
          if (nextPath[point]) {
            crossPoints[point] = [originalPath[point], nextPath[point]];
          }
        }
      }
    }

    return crossPoints;
  }
}

export default Wire;
