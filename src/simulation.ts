import _ from "@lodash";

import type Agent from "./agent.ts";
import type { Persona } from "./textual/personas.ts";

import Feed from "./feed.ts";
import type { ThreadItem } from "./types.ts";

export default class Simulation {
  private agents: Array<Agent>;
  private feed: Feed;

  private time: number;

  constructor() {
    this.agents = [];
    this.feed = new Feed();

    this.time = Date.now();
  }

  public post(message: string, persona: Persona): void {
    this.feed.addPost(createPost(persona, message));
  }

  public run(): void {
    while (true) {
      const activeAgent = this.sampleActiveAgent();
      const activeThreadID = this.sampleActiveThread(activeAgent);

      activeAgent.reply(this.feed.getFeed()[activeThreadID].post.message);
    }
  }

  private getRandomAgent(): Agent {
    return _.sample(this.agents) as Agent;
  }

  private sampleActiveAgent(): Agent {
    const lastPost: ThreadItem = this.feed.getFeed()[0]?.post;
    const agent: Agent = this.getRandomAgent();

    // do not post twice in a row
    if (lastPost && lastPost.author == agent.label) {
      return this.sampleActiveAgent();
    }

    return agent;
  }

  private sampleActiveThread(agent: Agent): number {
    const selectedThreadID: number = _.random(
      _.floor((this.feed.getFeed().length - 1) / 2),
    );
    const thread = this.feed.getFeed()[selectedThreadID];

    // do not reply to your own post if there is no comment
    if (!thread.replies && thread.post.author == agent.label) {
      return this.sampleActiveThread(agent);
    }

    // do not reply if the last comment was written by you
    if (thread.replies) {
      const lastReply = thread.replies.at(-1);

      if (lastReply && lastReply.author == agent.label) {
        return this.sampleActiveThread(agent);
      }
    }

    return selectedThreadID;
  }
}

function createPost(
  persona: Persona,
  message: string,
): ThreadItem {
  return {
    author: persona.name,
    message: message,
    stats: {
      likes: 0,
      dislikes: 0,
      shares: 0,
    },
  };
}
