import {chat, type ChatResult, type ChatItem} from '../inference';

export abstract class Agent {
  public label: string | number;
  public model: string;
  public instruction: string;

  private motivation: number;
  private timeBudget: number;

  private opinion: any;
  private biases: any;
  private frustrationFactor: any;

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

  abstract getFeed(): Array<Object>;

  abstract getHistory(): Array<Object>;

  private async inference(message: ChatItem): Promise<string> {
    const result = await chat(this.model, [
      {
        content: this.instruction,
        role: 'system',
      },
      message,
    ]);

    return result.response;
  }

  public async writePost(topic: string): Promise<string> {
    const post: string = await this.inference({
      content: topic,
      role: 'user',
    });
    return post;
  }

  public willBeActive(): boolean {
    return false;
  }

  public runLifecycle(): void {}
}
