import { test, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url: string = "/login";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox',{name: "Username"}).describe("Username input"); 
    this.passwordInput = page.getByRole('textbox',{name: "Password"}).describe("Password input");
    this.signInButton = page.getByRole('button',{name: "Sign in"}).describe("Sign in button");
    this.errorMessage = page.getByRole('alert',{name: "Error message"}).describe("Error message");
  }

  async load() {
    await test.step("Load login page", async () => {
      await this.page.goto(this.url);
    });
  }

  async waitLoad() { 
    await test.step("Wait for login page to load", async () => {
      await this.usernameInput.waitFor({state: "visible"});
    });
  }

  async submitSignInForm(username: string, password: string) {  
    await test.step("Login with username and password", async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.signInButton.click();
    });
  }
}