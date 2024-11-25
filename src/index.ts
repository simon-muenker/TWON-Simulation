import { BlobOptions } from 'buffer';
import {activation} from './common';

export class Agent {
  private id: number;

  private motivation: number;
  private timeBudget: number;

  private opinion: any;
  private biases: any;
  private frustrationFactor: any;

  constructor() {
    this.id = 0;

    this.motivation = 0;
    this.timeBudget = 0;

    this.opinion = {};
    this.biases = {};
    this.frustrationFactor = {};
  }

  private getOwnPosts(): Array<Object> {
    return []
  }

  private getFeed(): Array<Object> {
    return []
  }

  private writePost(): void {
    console.debug("post written")
  }

  public willBeActive(): boolean {
    return false
  }

  public runLifecycle(): void {

  }
}

export class Network {
  private agents: Map<number, Agent>;
  private network: Map<number, number>;

  private time: number;

  constructor() {
    this.agents = new Map();
    this.network = new Map();

    this.time = Date.now()
  }

  public run(): void {

  }
}
