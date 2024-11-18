import {Activation} from '../src/index';

describe('Activation.sigmoid', () => {
  test.each([
    [0, 0, 0.5],
    [1, 1, 0.7310585786300049],
    [-1, 1, 0.2689414213699951],
    [2, 3, 0.9525741268224334],
  ])('calculates sigmoid for k=%p, b=%p', (k, b, expected) => {
    expect(Activation.sigmoid(k, b)).toBeCloseTo(expected, 10);
  });

  test('handles large input values', () => {
    expect(Activation.sigmoid(100, 100)).toBeCloseTo(1, 5);
    expect(Activation.sigmoid(-100, -100)).toBeCloseTo(0, 5);
  });
});
