import { Locator, Page } from '@playwright/test';

export class Calculator {
  locator: Locator;
  constructor(currentPage: Page) {
    this.locator = currentPage.locator('');
  }
}
