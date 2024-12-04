"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
class Network {
    constructor() {
        this.agents = new Map();
        this.network = new Map();
        this.time = Date.now();
    }
    run() { }
}
exports.Network = Network;
