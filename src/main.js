// app.js
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Options } = chrome;

async function getWebDriverInstance(browser) {
  let options = new Options();
  options.addArguments(
    "--disable-extensions",
    "--disable-user-media-security=true",
    "--allow-file-access-from-files",
    "--use-fake-device-for-media-stream",
    "--use-fake-ui-for-media-stream",
    "--disable-popup-blocking",
    "--disable-infobars",
    "--enable-usermedia-screen-capturing",
    "--disable-dev-shm-usage",
    "--no-sandbox",
    "--auto-select-desktop-capture-source=Screen 1",
    "--disable-blink-features=AutomationControlled"
  );

  if (browser === "headless") {
    options.addArguments(
      "--headless",
      "--use-system-clipboard",
      "--window-size=1920x1080"
    );
  }

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  await driver.get("https://accounts.teachmint.com/");
  return driver;
}

async function enterPhoneNumberAndOTP(driver, creds) {
  try {
    await driver.findElement(By.name("phone")).sendKeys(creds[0]);
    console.log("Entered user phone number:", creds[0]);

    await driver.findElement(By.id("send-otp-btn-id")).click();
    await driver.wait(
      until.invisibilityOfElementLocated(By.css(".loader")),
      30000
    );

    for (let i = 0; i < creds[1].length; i++) {
      let otp_field = `@data-group-idx'${i}']`;
      await driver.findElement(By.xpath(otp_field)).sendKeys(creds[1][i]);
    }
    console.log("Entered OTP:", creds[1]);

    await driver.findElement(By.id("submit-otp-btn-id")).click();
    await driver.sleep(2000);

    await driver.findElement(By.css("span[onclick='onSkipPassCreationClick()']")).click();
    await driver.wait(
      until.invisibilityOfElementLocated(By.css(".loader")),
      30000
    );
    console.log("Successfully entered user phone number and OTP");
  } catch (error) {
    console.error("An error occurred while entering phone number and OTP:", error);
  }
}

async function login(admin_credentials = ["0000020232", "120992", "@Automation-2"], account_name = "@Automation-2") {
  let driver = await getWebDriverInstance();
  try {
    await enterPhoneNumberAndOTP(driver, admin_credentials);

    let user_name_xpath = `profile-user-name${account_name}']`;
    await driver.wait(until.elementToBeClickable(By.xpath(user_name_xpath)), 30000);
    await driver.findElement(By.xpath(user_name_xpath)).click();

    let dashboard_xpath = "Dashboard";
    await driver.wait(
      until.presenceOfElementLocated(By.xpath(dashboard_xpath)),
      100000
    );
    await driver.sleep(20000); // Assuming this is required to wait for the dashboard to load
    console.log("Login successful!");
  } catch (error) {
    console.error("An error occurred while logging in:", error);
  } finally {
    // await driver.quit(); // Uncomment this line if you want to close the browser after login
  }
}

async function main() {
  await login();
}

main();
