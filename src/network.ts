import type Agent from "./agent.ts";

export default class Network {
  private agents: Map<number, Agent>;
  private connections: Map<number, number>;

  constructor() {
    this.agents = new Map();
    this.connections = new Map();
  }
}
