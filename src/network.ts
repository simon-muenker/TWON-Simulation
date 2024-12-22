import type { Agent } from "./agent.ts";

export class Network {
  private agents: Map<number, Agent>;
  private network: Map<number, number>;

  private time: number;

  constructor() {
    this.agents = new Map();
    this.network = new Map();

    this.time = Date.now();
  }

  public run(): void {}
}
