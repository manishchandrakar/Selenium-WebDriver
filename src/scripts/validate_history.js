// validate_history.js
const { By, until } = require('selenium-webdriver');

async function validateCertificateHistory(driver, yourMongoDBCollection) {
    try {
        // Navigate to the page where certificate history is displayed
        await driver.get('https://example.com/certificate-history');

        // Wait for certificate history to load
        await driver.wait(until.elementLocated(By.id('certificateHistory')), 10000);

        // Get the certificate history element
        const certificateHistoryElement = await driver.findElement(By.id('certificateHistory'));

        // Extract text from the element
        const certificateHistoryText = await certificateHistoryElement.getText();

        // Print the certificate history
        console.log('Certificate History:', certificateHistoryText);

        // Query certificate history from MongoDB
        const certificateHistoryFromDB = await yourMongoDBCollection.find({ studentName: 'Sam' }).toArray();

        // Compare the certificate history from the web page with the one from MongoDB
        if (certificateHistoryText === certificateHistoryFromDB.toString()) {
            console.log('Certificate history validated successfully!');
        } else {
            console.error('Certificate history validation failed!');
        }
    } catch (error) {
        console.error('An error occurred while validating certificate history:', error);
        throw error; // Rethrow the error to handle it in the main script
    }
}

module.exports = validateCertificateHistory;
