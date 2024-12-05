import type { ChatItem } from "../util/inference.ts";

export const instructions: {
  post: ChatItem;
  reply: ChatItem;
} = {
  post: {
    content:
      "Write a Tweet (max 20 words) about the following topic: {{topic}}.",
    role: "user",
  },
  reply: {
    content:
      "Reply to the following discussion with a Tweet (max 20 words):\n{{discussion}}",
    role: "user",
  },
};
