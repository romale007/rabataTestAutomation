import { Locator, Page, expect } from '@playwright/test';
import { Slider } from '../../controls';
import { BackupRates, BaseRates, TestRatesParameters } from './types';

/**
 * @param {Page} currentPage - page context
 */
export class PricingCalculator {
  private readonly locator: Locator;
  readonly dataApiStoredSlider: Slider;
  readonly dataDownloadSlider: Slider;
  readonly dataStoredSlider: Slider;
  readonly baseTariffBtn: Locator;
  readonly backupTariffBtn: Locator;

  constructor(readonly currentPage: Page) {
    this.locator = currentPage.getByTestId('pricing');

    this.baseTariffBtn = this.locator
      .locator('label')
      .filter({ hasText: 'High-performance S3-compatible storage' });

    this.backupTariffBtn = this.locator
      .locator('label')
      .filter({ hasText: 'S3 compatible hot-backup' });

    this.dataApiStoredSlider = new Slider(
      currentPage,
      'dataApiStoredInput',
      this.locator
    );

    this.dataDownloadSlider = new Slider(
      currentPage,
      'dataDownloadInput',
      this.locator
    );

    this.dataStoredSlider = new Slider(
      currentPage,
      'dataStoredInput',
      this.locator
    );
  }

  async getRates(): Promise<BaseRates & BackupRates> {
    const data = {
      rabataMobileApi: await this.locator
        .getByTestId('rabataMobileApi')
        .textContent(),
      azureMobileApi: await this.locator
        .getByTestId('azureMobileApi')
        .textContent(),
      amazonMobileApi: await this.locator
        .getByTestId('amazonMobileApi')
        .textContent(),
      googleMobileApi: await this.locator
        .getByTestId('googleMobileApi')
        .textContent(),
      rabataMobile: await this.locator
        .getByTestId('rabataMobile')
        .textContent(),
      azureMobile: await this.locator.getByTestId('azureMobile').textContent(),
      amazonMobile: await this.locator
        .getByTestId('amazonMobile')
        .textContent(),
      googleMobile: await this.locator
        .getByTestId('googleMobile')
        .textContent(),
    };
    return {
      rabataMobileApi: +data.rabataMobileApi!.match(/\d/g)!.join(''),
      azureMobileApi: +data.azureMobileApi!.match(/\d/g)!.join(''),
      amazonMobileApi: +data.amazonMobileApi!.match(/\d/g)!.join(''),
      googleMobileApi: +data.googleMobileApi!.match(/\d/g)!.join(''),
      rabataMobile: +data.rabataMobile!.match(/\d/g)!.join(''),
      azureMobile: +data.azureMobile!.match(/\d/g)!.join(''),
      amazonMobile: +data.amazonMobile!.match(/\d/g)!.join(''),
      googleMobile: +data.googleMobile!.match(/\d/g)!.join(''),
    };
  }

  async testRateState(expectedRates: BaseRates | BackupRates) {
    const actualRates = await this.getRates();
    expect(actualRates).toMatchObject(expectedRates);
  }

  async switchToBackupRateCalculator() {
    await this.backupTariffBtn.click();
    await this.dataStoredSlider.locator.waitFor({ state: 'visible' });
  }

  async switchToBaseRateCalculator() {
    await this.baseTariffBtn.click();
    await this.dataDownloadSlider.locator.waitFor({ state: 'visible' });
  }

  async testCalculatedParams(expectedParams: TestRatesParameters) {
    if (expectedParams.dataApiStoredTarget) {
      await this.switchToBaseRateCalculator();
      await this.dataApiStoredSlider.set(expectedParams.dataApiStoredTarget!);
      await this.dataDownloadSlider.set(expectedParams.dataDownloadTarget!);
      await this.testRateState({ ...expectedParams.baseRates! });
    } else {
      await this.switchToBackupRateCalculator();
      await this.dataStoredSlider.set(expectedParams.dataStoredTarget!);
      await this.testRateState({ ...expectedParams.backupRates! });
    }
  }
}
