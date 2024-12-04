import type {ChatItem} from './inference';

export const instructions: {
  post: ChatItem;
  reply: ChatItem;
} = {
  post: {
    content: 'Write a Tweet (max 20 words) about what concerns you currently.',
    role: 'system',
  },
  reply: {
    content:
      'Reply to the following content with a Tweet (max 20 words) with respect to your interests.',
    role: 'system',
  },
};
