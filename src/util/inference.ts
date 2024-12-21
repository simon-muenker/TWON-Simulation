import axios, { type AxiosInstance } from "axios";

/**
 * A chat item represents a single message in a conversation.
 * @property {string} content The content of the message.
 * @property {string} role The role of the message sender.
 */
export type ChatItem = {
  content: string;
  role: string;
};

/**
 * A chat result represents the result of the chat API call.
 * @property {string} id The id of the conversation.
 * @property {string} timestamp The timestamp of the conversation.
 * @property {string} model The model used for the conversation.
 * @property {Array<ChatItem>} chat The chat history.
 * @property {string} response The response of the model.
 */
export type ChatResult = {
  id: string;
  timestamp: string;
  model: string;
  chat: Array<ChatItem>;
  response: string;
};

/**
 * The API instance.
 */
const API: AxiosInstance = axios.create({
  // base URL of the API
  baseURL: "https://inf.cl.uni-trier.de",
  // request headers
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

/**
 * Start a chat inference with the model.
 * @param {string} model The model to use for the conversation.
 * @param {Array<ChatItem>} messages The messages to send to the model.
 * @returns {Promise<ChatResult>} The result of the conversation.
 */
export async function chat(
  model: string,
  messages: Array<ChatItem>,
): Promise<ChatResult> {
  // Send a POST request to the API to start the conversation
  return await API.post("/chat/", {
    model: model,
    messages: messages,
  })
    .then((result) => {
      // log and return the result
      // console.debug(result)
      return result.data;
    })
    .catch((error) => {
      // log and rethrow the error
      console.error(error);
      throw error;
    });
}
