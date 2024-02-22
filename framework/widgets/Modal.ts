import { Locator, Page, expect } from '@playwright/test';

type ModalOptions = { title: string; content: string; id?: string };

export class Modal {
  locator: Locator;
  closeBtn: Locator;
  confirmBtn: Locator;
  options: ModalOptions;

  constructor(currentPage: Page, options: ModalOptions) {
    this.locator = options.id
      ? currentPage.getByTestId(options.id)
      : currentPage.locator('.modal-container');
    this.closeBtn = this.locator
      .locator('.modal-close')
      .filter({ hasNotText: 'OK' });
    this.confirmBtn = this.locator.locator('.btn').filter({ hasText: 'OK' });
    this.options = options;
  }

  async testDefaultState() {
    await expect(this.closeBtn).toBeVisible();
    await expect(this.confirmBtn).toBeVisible();
  }

  async test() {
    await this.testDefaultState();
    await expect(this.locator.locator('.h3')).toHaveText(this.options.title);
    await expect(this.locator.locator('.text')).toContainText(
      this.options.content
    );
  }

  async confirm() {
    await this.confirmBtn.click();
    await this.locator.waitFor({ state: 'hidden' });
  }

  async close() {
    await this.closeBtn.click();
    await this.locator.waitFor({ state: 'hidden' });
  }
}
