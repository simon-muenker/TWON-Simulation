"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activation = activation;
function activation(k, b) {
    return 2 / (1 + Math.exp(-k * b)) - 1;
}
