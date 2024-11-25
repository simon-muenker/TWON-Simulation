export function activation(k: number, b: number): number {
  return 2 / (1 + Math.exp(-k * b)) - 1;
}
