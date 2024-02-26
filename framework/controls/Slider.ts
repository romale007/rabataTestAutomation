import { Locator, Page } from '@playwright/test';
import { setSliderValue } from '../helpers/sliderHelper';

/**
 * Class for slider input elements
 * @param {Page} currentPage - page context
 * @param {string} locatorStr - locator
 */
export class Slider {
  readonly locator: Locator;

  constructor(
    private readonly currentPage: Page,
    readonly id: string,
    readonly wrapper?: Locator
  ) {
    this.currentPage = currentPage;
    this.locator = wrapper
      ? wrapper.getByTestId(id)
      : currentPage.getByTestId(id);
  }

  async value(): Promise<string> {
    const value = await this.locator.inputValue();
    return value;
  }

  async set(value: string | number): Promise<void> {
    await setSliderValue(this.currentPage, this.locator, Number(value));
  }
}
