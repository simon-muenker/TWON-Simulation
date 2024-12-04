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
const modules_1 = require("../src/modules");
class TestAgent extends modules_1.Agent {
    getFeed() {
        return [];
    }
    getHistory() {
        return [];
    }
}
const testAgent = new TestAgent();
test('Agent writing post', () => __awaiter(void 0, void 0, void 0, function* () {
    const topic = 'JavaScript';
    const post = yield testAgent.writePost(topic);
    expect(post).resolves.toContain(topic);
}));
