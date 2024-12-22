import { expect } from "jsr:@std/expect";

import { activation } from "./common.ts";

const testCases = [
  { k: 0.0, b: 0.0, expected: 0.0 },
  { k: 0.5, b: 0.5, expected: 0.8 },
  { k: 1.0, b: 1.0, expected: 1.0 },
]

for (const { k, b, expected } of testCases) {
  Deno.test(`activation(k=${k}, b=${b})`, () => {
    expect(activation(k, b)).toBeCloseTo(expected, 2);
  });
} 
