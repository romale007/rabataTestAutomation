import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Input } from '../controls';
import { Modal } from '../widgets';
import { privacyPolicy, termsAndConditions } from '../constants';

export class RegistrationPage extends BasePage {
  loginBtn: Locator;
  homeBtn: Locator;
  nameInput: Input;
  emailInput: Input;
  passwordInput: Input;
  repeatPassInput: Input;
  signUpBtn: Locator;
  agreementCheckbox: Locator;
  privacyPolicyLink: Locator;

  // Modals
  termsModal: Modal;
  privacyPolicyModal: Modal;

  constructor(currentPage: Page) {
    super(currentPage);
    this.loginBtn = this.currentPage
      .getByRole('link')
      .filter({ hasText: 'Log In' });
    this.homeBtn = this.currentPage
      .getByRole('link')
      .filter({ hasText: 'Home' });
    this.nameInput = new Input(this.currentPage, 'registration_form_fullName');
    this.emailInput = new Input(this.currentPage, 'registration_form_email');
    this.passwordInput = new Input(
      this.currentPage,
      'registration_form_plainPassword_first'
    );
    this.repeatPassInput = new Input(
      this.currentPage,
      'registration_form_plainPassword_second'
    );
    this.signUpBtn = this.currentPage
      .getByRole('button')
      .filter({ hasText: '' });

    this.agreementCheckbox = this.currentPage
      .locator('.rb-checkbox')
      .filter({ hasText: 'I Agree to the' })
      .locator('label');

    this.privacyPolicyModal = new Modal(this.currentPage, {
      title: 'Privacy Policy',
      content: privacyPolicy,
      id: 'modalPrivacy',
    });

    this.termsModal = new Modal(this.currentPage, {
      title: 'Terms of Use',
      content: termsAndConditions,
    });

    this.privacyPolicyLink = this.currentPage
      .getByTestId('registration')
      .getByText('Privacy Policy');
  }

  async testDefaultState() {
    await expect(this.loginBtn).toBeVisible();
    await expect(this.homeBtn).toBeVisible();
    await expect(this.nameInput.locator).toBeVisible();
    await expect(this.emailInput.locator).toBeVisible();
    await expect(this.passwordInput.locator).toBeVisible();
    await expect(this.repeatPassInput.locator).toBeVisible();
    await expect(this.agreementCheckbox).toBeVisible();
  }

  async openPrivacyPolicy() {
    await this.privacyPolicyLink.click();
    expect(this.privacyPolicyModal.locator).toBeVisible();
  }
}
