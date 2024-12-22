import { expect } from "jsr:@std/expect";

import { Agent } from "../src/index.ts";
import type { Notification, Thread } from "../src/types.ts";

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
}

// create a dummy agent
const testAgent = new TestAgent("test");

// test that the agent can write a post
Deno.test("Agent writing post", async () => {
  // write a post (inference API call)
  const post = await testAgent.post(TOPIC);
  // expect the post to contain the topic
  expect(post).toContain(TOPIC);
  // log the agent
  console.log(testAgent);
});

// Test that the agent can write a reply
Deno.test("Agent writing reply", async () => {
  // reply to a discussion (inference API call)
  const reply = await testAgent.reply(DISCUSSION);
  // expect the reply to contain the topic
  expect(reply).toContain(TOPIC);
  // log the agent
  console.log(testAgent);
});
