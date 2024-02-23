import { testRatesParams } from './testRatesParams';
import { test as base } from '@playwright/test';
import { MainPage } from '../framework/pages';

const test = base.extend<{ mainPage: MainPage }>({
  mainPage: async ({ page }, use) => {
    await page.goto('/');
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
});

test.describe('Calculator test', () => {
  for (let preset of testRatesParams) {
    test(preset.name, async ({ mainPage }) => {
      // const mainPage = new MainPage(page);
      await mainPage.calculator.testCalculatedParams(preset.use);
    });
  }
});
