import { Page } from '@playwright/test';

export abstract class BasePage {
  currentPage: Page;
  constructor(currentPage: Page) {
    this.currentPage = currentPage;
  }

  async goto(url: string) {
    await this.currentPage.goto(url, { waitUntil: 'load' });
  }
}
