"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../src/common");
describe('Activation', () => {
    test.each([
        [0.0, 0.0, 0.0],
        [0.5, 0.5, 0.8],
        [1.0, 1.0, 1.0],
    ])('calculates activation for k=%p, b=%p', (k, b, expected) => {
        expect((0, common_1.activation)(k, b)).toBeCloseTo(expected, 2);
    });
});
