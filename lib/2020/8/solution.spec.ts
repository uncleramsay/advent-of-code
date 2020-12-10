import Solution from './solution';

describe('2020 Day 8', () => {
  let solution: Solution = new Solution();

  beforeAll(() => {
    solution = new Solution();
  });

  it('should pass part 1', async () => {
    const answer = await Promise.resolve(solution.part1());
    expect(answer).toBe(1563);
  });

  it('should pass part 2', async () => {
    const answer = await Promise.resolve(solution.part2());
    expect(answer).toBe(767);
  });
});
