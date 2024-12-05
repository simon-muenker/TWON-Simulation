import axios, { type AxiosInstance } from "axios";

export type ChatItem = {
  content: string;
  role: string;
};

export type ChatResult = {
  id: string;
  timestamp: string;
  model: string;
  chat: Array<ChatItem>;
  response: string;
};

const HEADERS: Object = {
  "Content-Type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const API: AxiosInstance = axios.create({
  baseURL: "https://inf.cl.uni-trier.de",
  headers: HEADERS,
});

export async function chat(
  model: string,
  messages: Array<ChatItem>,
): Promise<ChatResult> {
  return await API.post("/chat/", {
    model: model,
    messages: messages,
  })
    .then((result) => {
      console.debug(result);
      return result.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
