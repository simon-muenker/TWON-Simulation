/**
 * A thread item represents a single post or comment in a thread.
 * @property {number|string} author The author of the post/comment.
 * @property {string} message The content of the post/comment.
 * @property {Object} stats The statistics of the post/comment.
 * @property {number} stats.likes The number of likes.
 * @property {number} stats.dislikes The number of dislikes.
 * @property {number} stats.shares The number of shares.
 */
export type ThreadItem = {
  author: number | string;
  message: string;
  stats: {
    likes: number;
    dislikes: number;
    shares: number;
  };
};

/**
 * A thread is a collection of post and comments.
 * @property {ThreadItem} post The post of the thread.
 * @property {Array<ThreadItem>} reply The comments of the thread.
 * @property {number} ranking The ranking of the thread.
 */
export type Thread = {
  post: ThreadItem;
  reply?: Array<ThreadItem>;
  ranking?: number;
};

/**
 * A notification item represents a single notification.
 * @property {string} type The type of the notification.
 * @property {ThreadItem} threadItem The thread item of the notification.
 */
export type Notification = {
  type: "comment";
  threadItem: ThreadItem;
};

/**
 * An item in the agent's history.
 * @property {string} type The type of action the agent took.
 * @property {string} stimulus The stimulus the agent was given.
 * @property {string} response The response the agent made.
 */
export type HistoryItem = {
  type: "read" | "post" | "reply";
  stimulus: string;
  response?: string;
};
