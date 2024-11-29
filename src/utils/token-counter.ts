import * as tiktoken from "tiktoken";
import { OPENAI_MODEL_ENCODINGS } from "../constants";

interface Message {
  [key: string]: string;
}

export function getPromptTokensOpenaiChatCompletion(
  prompt: Message[],
  languageModelId: string
): number | null {
  if (prompt === null) {
    throw new Error("prompt is null");
  }

  let tokensPerMessage = 3;
  let tokensPerName = 1;

  if (
    [
      "gpt-3.5-turbo-0613",
      "gpt-3.5-turbo-16k-0613",
      "gpt-4-0613",
      "gpt-4-32k-0613",
    ].includes(languageModelId)
  ) {
    // Use default values
  } else if (languageModelId.includes("gpt-3.5-turbo")) {
    return getPromptTokensOpenaiChatCompletion(prompt, "gpt-3.5-turbo-0613");
  } else if (languageModelId.includes("gpt-4")) {
    return getPromptTokensOpenaiChatCompletion(prompt, "gpt-4-0613");
  } else {
    throw new Error(`Language model ${languageModelId} is not supported`);
  }

  try {
    const encoding = tiktoken.get_encoding(
      OPENAI_MODEL_ENCODINGS[languageModelId]
    );
    let numTokens = 0;
    for (const message of prompt) {
      numTokens += tokensPerMessage;
      for (const [key, value] of Object.entries(message)) {
        numTokens += encoding.encode(value).length;
        if (key === "name") {
          numTokens += tokensPerName;
        }
      }
    }
    numTokens += 3;
    return numTokens;
  } catch (e) {
    if (e instanceof Error && e.name === "KeyError") {
      return null;
    }
    throw e;
  }
}

export function getCompletionTokensOpenaiChatCompletion(
  response: string,
  languageModelId: string
): number | null {
  if (response === null) {
    throw new Error("response is null");
  }

  let encoding;
  try {
    if (
      [
        "gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k-0613",
        "gpt-4-0613",
        "gpt-4-32k-0613",
      ].includes(languageModelId)
    ) {
      encoding = tiktoken.get_encoding(OPENAI_MODEL_ENCODINGS[languageModelId]);
    } else if (languageModelId.includes("gpt-3.5-turbo")) {
      return getCompletionTokensOpenaiChatCompletion(
        response,
        "gpt-3.5-turbo-0613"
      );
    } else if (languageModelId.includes("gpt-4")) {
      return getCompletionTokensOpenaiChatCompletion(response, "gpt-4-0613");
    } else {
      throw new Error(`Language model ${languageModelId} is not supported`);
    }
  } catch (e) {
    if (e instanceof Error && e.name === "KeyError") {
      return null;
    }
    throw e;
  }

  try {
    const tokens = encoding.encode(response).length;
    return tokens;
  } catch (e) {
    throw e;
  }
}

export function getTokenUsageOpenaiCompletion(
  text: string,
  languageModelId: string
): number | null {
  if (text === null) {
    throw new Error("text is null");
  }

  let encoding;
  try {
    encoding = tiktoken.get_encoding(OPENAI_MODEL_ENCODINGS[languageModelId]);
  } catch (e) {
    if (e instanceof Error && e.name === "KeyError") {
      return null;
    }
    throw e;
  }

  try {
    const tokens = encoding.encode(text).length;
    return tokens;
  } catch (e) {
    throw e;
  }
}
