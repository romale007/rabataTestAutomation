import { Locator, Page } from '@playwright/test';

/**
 * Class for text input elements
 * @param {Page} currentPage - page context
 * @param {string} locatorStr - locator
 */
export class Slider {
  locator: Locator;
  constructor(currentPage: Page, locatorStr: string) {
    this.locator = currentPage.getByTestId(locatorStr);
  }

  async value(): Promise<string> {
    const value = await this.locator.inputValue();
    return value;
  }

  async set(value: string | number, typeSequently = false) {
    if (typeSequently) {
      await this.locator.pressSequentially(String(value), { delay: 100 });
    } else {
      await this.locator.fill(String(value));
    }
  }
}
