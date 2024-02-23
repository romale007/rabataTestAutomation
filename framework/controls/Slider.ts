import { Locator, Page } from '@playwright/test';
import { setSliderValue } from '../helpers/sliderHelper';

/**
 * Class for slider input elements
 * @param {Page} currentPage - page context
 * @param {string} locatorStr - locator
 */
export class Slider {
  currentPage: Page;
  locator: Locator;

  constructor(currentPage: Page, id: string, wrapper?: Locator) {
    this.currentPage = currentPage;
    this.locator = wrapper
      ? wrapper.getByTestId(id)
      : currentPage.getByTestId(id);
  }

  async value(): Promise<string> {
    const value = await this.locator.inputValue();
    return value;
  }

  async set(value: string | number) {
    await setSliderValue(this.currentPage, this.locator, Number(value));
  }
}
