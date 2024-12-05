import { Agent } from "../src";
import type { Feed, ThreadItem, Notifcation } from "../src/util/common";


const TOPIC = "JavaScript";
const DISCUSSION = `Post: I really like ${TOPIC}\n\nReply: I agree!`;


class TestAgent extends Agent {
  getNotifications(): Array<Notifcation> {
    return [];
  }
  getFeed(): Feed {
    return [];
  }
  getHistory(): Array<ThreadItem> {
    return [];
  }
}

const testAgent = new TestAgent();

test("Agent writing post", async () => {
  const post = await testAgent.writePost(TOPIC);
  expect(post).toContain(TOPIC);
}, 60 * 1000);

test("Agent writing reply", async () => {
  const reply = await testAgent.writeReply(DISCUSSION);
  expect(reply).toContain(TOPIC);
}, 60 * 1000);
