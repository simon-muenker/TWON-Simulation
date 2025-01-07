import {
  atom,
  computed,
  type ReadableAtom,
  type WritableAtom,
} from "@nanostores";

import type { Thread, ThreadItem } from "./_types.ts";

export default class Feed {
  items: WritableAtom<Array<Thread>>;

  constructor() {
    this.items = atom<Array<Thread>>([]);
  }

  // Store Exposal
  public FeedStore(): ReadableAtom<Thread[]> {
    return this.items;
  }

  public ReverseFeedStore(): ReadableAtom<Thread[]> {
    return computed(
      this.items,
      (items: Array<Thread>): Array<Thread> => {
        return [...items].reverse();
      },
    );
  }

  // Getters
  public getFeed(): Array<Thread> {
    return this.items.get();
  }

  // Modifiers
  public clearFeed(): void {
    this.items.set([]);
  }

  public pushToFeed(thread: Thread): void {
    this.items.set([...this.items.get(), thread]);
  }

  public addPost(item: ThreadItem): void {
    this.pushToFeed({ post: item, replies: [] });
  }

  public addReply(threadID: number, item: ThreadItem): void {
    const feed: Array<Thread> = this.items.get();

    if (feed[threadID].replies) {
      feed[threadID].replies = [...feed[threadID].replies, item];
    } else {
      feed[threadID].replies = [item];
    }

    this.items.set([...feed]);
  }
}
