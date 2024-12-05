import type { Feed, ThreadItem, Notifcation } from "./util/common.ts";
import { chat, type ChatItem } from "./util/inference.ts";
import { instructions } from "./textual/instructions.ts";

export abstract class Agent {
  public label: string | number;
  public model: string;
  public instruction: string;
  public history: Array<string>;

  private timeBudget: number;

  constructor() {
    this.label = 0;
    this.model = "llama3.1:8b-instruct-q6_K";
    this.instruction = "You are a helpful assistant.";
    this.history = [];

    this.timeBudget = 0;
  }

  abstract getFeed(): Feed;
  abstract getHistory(): Array<ThreadItem>;
  abstract getNotifications(): Array<Notifcation>;

  public updateTimeBudget(action: "read" | "post" | "reply"): void {
    this.timeBudget -= {
      read: 1,
      post: 5,
      reply: 5,
    }[action];
  }

  public updateHistory(action: string): void {
    this.history.push(action);
  }

  public chooseAction(content: string): CallableFunction {
    return this.writePost;
  }

  private async inference(message: ChatItem): Promise<string> {
    const result = await chat(this.model, [
      {
        content: this.instruction,
        role: "system",
      },
      message,
    ]);

    return result.response;
  }

  public async writePost(topic: string): Promise<string> {
    const post: string = await this.inference({
      ...instructions.post,
      content: instructions.post.content.replace("{{topic}}", topic),
    });
    return post;
  }

  public async writeReply(discussion: string): Promise<string> {
    const reply: string = await this.inference({
      ...instructions.reply,
      content: instructions.reply.content.replace("{{discussion}}", discussion),
    });
    return reply;
  }

  public runLifecycle(): void {
    // process notifications
    for (const notification of this.getNotifications()) {
      // read notification
      this.updateTimeBudget("read");

      // decide what to do
      const actionFunction = this.chooseAction(notification.threadItem.message);

      // perform action
      actionFunction(notification.threadItem.message);

      // TODO: update time budget

      // add to history
      this.updateHistory("action description");
    }

    // process feed
    for (const thread of this.getFeed()) {
      // read thread
      this.updateTimeBudget("read");

      // decide what to do
      const actionFunction = this.chooseAction(thread.post.message);

      // perform action
      actionFunction(thread.post.message);

      // TODO: update time budget

      // add to history
      this.updateHistory("action description");
    }
  }
}
