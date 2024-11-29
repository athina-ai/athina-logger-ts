import axios, { AxiosInstance } from "axios";
import * as rax from "retry-axios";

export class RequestHelper {
  private static client: AxiosInstance;

  private static getClient(): AxiosInstance {
    if (!this.client) {
      this.client = axios.create();
      this.client.defaults.raxConfig = {
        retry: 2,
        retryDelay: 100,
        statusCodesToRetry: [
          [408, 429],
          [500, 599],
        ],
      };
      rax.attach(this.client);
    }
    return this.client;
  }

  static async makePostRequest(
    endpoint: string,
    payload: any,
    headers: Record<string, string>
  ) {
    try {
      const response = await this.getClient().post(endpoint, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Request failed with status ${error.response.status}: ${error.response.data}`
        );
      }
      throw error;
    }
  }

  static async makePatchRequest(
    endpoint: string,
    payload: any,
    headers: Record<string, string>
  ) {
    try {
      const response = await this.getClient().patch(endpoint, payload, {
        headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Request failed with status ${error.response.status}: ${error.response.data}`
        );
      }
      throw error;
    }
  }
}
