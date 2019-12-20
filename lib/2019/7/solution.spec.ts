import Solution from './solution';

describe('2019 Day 7', () => {
  let solution: Solution = new Solution();

  beforeAll(() => {
    solution = new Solution();
  });

  it('should pass part 1', async () => {
    const answer = await Promise.resolve(solution.part1());
    expect(answer).toBe(30940);
  });

  it('should pass part 2', async () => {
    jest.setTimeout(30000);
    const answer = await Promise.resolve(solution.part2());
    expect(answer).toBe(76211147);
  });
});
