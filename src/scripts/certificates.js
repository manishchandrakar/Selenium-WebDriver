// certificates.js
const { By, until } = require("selenium-webdriver");

async function navigateToCertificates(driver) {
  try {
    // Navigate to the certificates page
    await driver.get("https://example.com/certificates");

    // Wait for certificates page to load
    await driver.wait(until.elementLocated(By.id("certificatesPage")), 10000);

    console.log("Navigated to certificates page successfully!");
  } catch (error) {
    console.error(
      "An error occurred while navigating to certificates page:",
      error
    );
    throw error; // Rethrow the error to handle it in the main script
  }
}

module.exports = navigateToCertificates;
