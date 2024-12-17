import { Agent } from "../src";
import type { Notification, Thread, HistoryItem  } from "../src/types";

// fixtures
const TOPIC = "JavaScript";
const DISCUSSION = `Post: I really like ${TOPIC}\n\nReply: I agree!`;

// a test agent without a feed, history or notifications
class TestAgent extends Agent {
  getNotifications(): Array<Notification> {
    return [];
  }
  getFeed(): Array<Thread> {
    return [];
  }
  getHistory(): Array<HistoryItem> {
    return [];
  }
}

// create a dummy agent
const testAgent = new TestAgent("test");

// test that the agent can write a post
test("Agent writing post", async () => {
  // write a post (inference API call)
  const post = await testAgent.post(TOPIC);
  // expect the post to contain the topic
  expect(post).toContain(TOPIC);
  // log the agent
  console.log(testAgent);
}, 60 * 1000);

// Test that the agent can write a reply
test("Agent writing reply", async () => {
  // reply to a discussion (inference API call)
  const reply = await testAgent.reply(DISCUSSION);
  // expect the reply to contain the topic
  expect(reply).toContain(TOPIC);
  // log the agent
  console.log(testAgent);
}, 60 * 1000);
