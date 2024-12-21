import type { HistoryItem, Notification, Thread } from "./types.js";
import { AGENT_DEFAULTS } from "./constants.js";

import { chat, type ChatItem } from "./util/inference.js";
import { instructions } from "./textual/instructions.js";

/**
 * An agent is a simulated user that can interact with the network.
 * It has a label, a model, an instruction, and a history of actions.
 * The agent can get its feed, history, and notifications.
 * The agent can also perform actions like reading, posting, and replying.
 */
export abstract class Agent {
  public label: string | number;
  public model: string;
  public instruction: string;
  public history: Array<HistoryItem>;

  private actionBudget: number;
  private actionCosts: Record<string, number>;

  /**
   * Creates a new agent.
   */
  constructor(
    label: string | number,
    model: string = AGENT_DEFAULTS.model,
    instruction: string = AGENT_DEFAULTS.instruction,
    actionBudget: number = AGENT_DEFAULTS.actionBudget,
    actionCosts: Record<string, number> = AGENT_DEFAULTS.actionCosts,
  ) {
    this.label = label;
    this.model = model;
    this.instruction = instruction;
    this.history = [];

    this.actionBudget = actionBudget;
    this.actionCosts = actionCosts;
  }

  /**
   * Gets the agent's feed.
   * @returns {Array<Thread>} The agent's feed.
   */
  abstract getFeed(): Array<Thread>;

  /**
   * Gets the agent's notifications.
   * @returns {Array<Notification>} The agent's notifications.
   */
  abstract getNotifications(): Array<Notification>;

  /**
   * Gets the agent's available actions.
   * @returns {Record<string, CallableFunction>} The agent's available actions.
   */
  public getActions(): Record<string, CallableFunction> {
    return {
      read: this.read,
      post: this.post,
      reply: this.reply,
      ignore: (_: string) => {},
    };
  }

  /**
   * Selects an action randomly.
   * @returns {CallableFunction} The selected action.
   */
  public selectAction(): CallableFunction {
    // TODO random sampling with weights for action
    return this
      .getActions()[
        Object.keys(this.getActions())[0] as string
      ] as CallableFunction;
  }

  /**
   * Updates the agent's action budget.
   * @param {string} action The action to update the budget for.
   */
  public updateActionBudget(action: "read" | "post" | "reply"): void {
    this.actionBudget -= this.actionCosts[action] as number;
  }

  /**
   * Updates the agent's history.
   * @param {HistoryItem} action The action to add to the history.
   */
  public updateHistory(action: HistoryItem): void {
    this.history.push(action);
  }

  /**
   * Reads a message.
   * @param {string} message The message to read.
   */
  public read(message: string): void {
    this.history.push({
      type: "read",
      stimulus: message,
    });
    this.updateActionBudget("read");
  }

  /**
   * Posts a new thread.
   * @param {string} topic The topic of the thread.
   * @returns {Promise<string>} The written post.
   */
  public async post(topic: string): Promise<string> {
    const post: string = await this._inference({
      ...instructions.post,
      content: instructions.post.content.replace("{{topic}}", topic),
    });

    this.history.push({
      type: "post",
      stimulus: topic,
      response: post,
    });
    this.updateActionBudget("post");

    return post;
  }

  /**
   * Replies to a thread.
   * @param {string} discussion The discussion to reply to.
   * @returns {Promise<string>} The written comment.
   */
  public async reply(discussion: string): Promise<string> {
    const reply: string = await this._inference({
      ...instructions.reply,
      content: instructions.reply.content.replace("{{discussion}}", discussion),
    });

    this.history.push({
      type: "reply",
      stimulus: discussion,
      response: reply,
    });
    this.updateActionBudget("reply");

    return reply;
  }

  /**
   * Runs the agent.
   */
  public run(): void {
    // process notifications
    for (const notification of this.getNotifications()) {
      // selection action
      const action: CallableFunction = this.selectAction();

      // perform action
      action(notification.threadItem.message);
    }

    // process feed
    for (const thread of this.getFeed()) {
      // selection action
      const action: CallableFunction = this.selectAction();

      // perform action
      action(thread.post.message);
    }
  }

  /**
   * Performs an inference with the model.
   * @param {ChatItem} message The message to infer.
   * @returns {Promise<string>} The inferred response.
   */
  private async _inference(message: ChatItem): Promise<string> {
    const result = await chat(this.model, [
      {
        content: this.instruction,
        role: "system",
      },
      message,
    ]);

    return result.response;
  }
}
