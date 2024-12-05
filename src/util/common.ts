export type ThreadItem = {
  author: number | string;
  message: string;
  stats: {
    likes: number;
    dislikes: number;
    shares: number;
  };
};

export type Thread = {
  post: ThreadItem;
  reply?: Array<ThreadItem>;
  ranking?: number;
};

export type Feed = Array<Thread>;

export type Notifcation = {
  type: "comment";
  threadItem: ThreadItem;
};

export function activation(k: number, b: number): number {
  return 2 / (1 + Math.exp(-k * b)) - 1;
}
