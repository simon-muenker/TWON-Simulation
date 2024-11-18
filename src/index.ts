export class Activation {
  static sigmoid(k: number, b: number): number {
    return 1 / (1 + Math.exp(-k * b));
  }
}
