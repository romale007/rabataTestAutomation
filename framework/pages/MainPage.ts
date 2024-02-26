import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Modal, PricingCalculator } from '../widgets';
import { privacyPolicy, termsAndConditions } from '../constants';

export class MainPage extends BasePage {
  readonly loginBtn: Locator;
  readonly signUpBtn: Locator;
  readonly tryForFreeBtn: Locator;
  readonly privacyPolicyLink: Locator;
  readonly termsLink: Locator;

  // Modals
  readonly termsModal: Modal;
  readonly privacyPolicyModal: Modal;

  readonly calculator: PricingCalculator;

  constructor(currentPage: Page) {
    super(currentPage);

    this.loginBtn = this.currentPage
      .getByRole('link')
      .filter({ hasText: 'Log In' });

    this.signUpBtn = this.currentPage
      .getByRole('link')
      .filter({ hasText: 'Sign Up' });

    this.tryForFreeBtn = this.currentPage
      .locator('.firstscreen')
      .getByRole('link')
      .filter({ hasText: 'Try it for free' });

    this.calculator = new PricingCalculator(this.currentPage);

    this.privacyPolicyLink = this.currentPage
      .locator('a')
      .filter({ hasText: 'Privacy policy' });
    this.termsLink = this.currentPage
      .getByRole('link')
      .filter({ hasText: 'Terms & Conditions' });

    this.privacyPolicyModal = new Modal(this.currentPage, {
      title: 'Privacy Policy',
      content: privacyPolicy,
      id: 'modalPrivacy',
    });

    this.termsModal = new Modal(this.currentPage, {
      title: 'Terms of Use',
      content: termsAndConditions,
    });
  }

  async openTermsModal() {
    await this.termsLink.click();
    expect(this.termsModal.locator).toBeVisible();
  }

  async openPrivacyPolicy() {
    await this.privacyPolicyLink.click();
    expect(this.privacyPolicyModal.locator).toBeVisible();
  }
}
