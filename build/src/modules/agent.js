"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const inference_1 = require("../inference");
class Agent {
    constructor() {
        this.label = 0;
        this.model = 'llama3.1:8b-instruct-q6_K';
        this.instruction = 'You are a helpful assistant.';
        this.motivation = 0;
        this.timeBudget = 0;
        this.opinion = {};
        this.biases = {};
        this.frustrationFactor = {};
    }
    inference(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, inference_1.chat)(this.model, [
                {
                    content: this.instruction,
                    role: 'system',
                },
                message,
            ]);
            return result.response;
        });
    }
    writePost(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.inference({
                content: topic,
                role: 'user',
            });
            return post;
        });
    }
    willBeActive() {
        return false;
    }
    runLifecycle() { }
}
exports.Agent = Agent;
