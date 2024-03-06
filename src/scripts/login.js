// login.js
const { By, until } = require('selenium-webdriver');

async function login(driver, username, password) {
    try {
        // Navigate to the login page
        await driver.get('https://example.com/login');

        // Find the username and password input fields and enter the credentials
        await driver.findElement(By.id('username')).sendKeys(username);
        await driver.findElement(By.id('password')).sendKeys(password);

        // Click on the login button
        await driver.findElement(By.id('loginBtn')).click();

        // Wait for the dashboard page to load
        await driver.wait(until.elementLocated(By.xpath('Dashboard')), 10000);

        console.log('Login successful!');
    } catch (error) {
        console.error('An error occurred while logging in:', error);
        throw error; // Rethrow the error to handle it in the main script
    }
}

module.exports = login;
