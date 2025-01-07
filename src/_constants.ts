/**
 * The default values for an Agent.
 */
export const AGENT_DEFAULTS: {
  // default language Model
  model: string;
  // default instruction/persona
  instruction: string;
  // default action budget
  actionBudget: number;
  // default cost of each action in terms of action points.
  actionCosts: Record<string, number>;
} = {
  instruction: "You are a helpful assistant.",
  model: "llama3.1:8b-instruct-q6_K",
  actionBudget: 50,
  actionCosts: {
    // reading a post or comment.
    read: 1,
    // posting a new post.
    post: 5,
    // replying to an existing post.
    reply: 5,
  },
};
