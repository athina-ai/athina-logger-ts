export class AthinaApiKey {
  private static apiKey: string | null = null;

  static setApiKey(key: string): void {
    this.apiKey = key;
  }

  static getApiKey(): string {
    if (!this.apiKey) {
      throw new Error("Athina API key not set");
    }
    return this.apiKey;
  }
}
