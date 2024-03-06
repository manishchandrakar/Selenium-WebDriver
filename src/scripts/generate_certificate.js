// generate_certificate.js
const { By, until } = require("selenium-webdriver");

async function generateCertificate(driver, yourMongoDBCollection) {
  try {
    // Navigate to the page where certificate generation is done
    await driver.get("https://example.com/generate-certificate");

    // Wait for certificate generation page to load
    await driver.wait(
      until.elementLocated(By.id("certificateGeneration")),
      10000
    );

    // Select certificate type
    const certificateTypeDropdown = await driver.findElement(
      By.id("certificateType")
    );
    await certificateTypeDropdown.sendKeys("School Leaving");

    // Select student
    const studentDropdown = await driver.findElement(By.id("student"));
    await studentDropdown.sendKeys("Sam");

    // Update remarks
    const remarksField = await driver.findElement(By.id("remarks"));
    await remarksField.sendKeys("This is a test remark.");

    // Click on generate button
    await driver.findElement(By.id("generateBtn")).click();

    // Wait for download link to appear
    await driver.wait(until.elementLocated(By.id("downloadLink")), 10000);

    // Click on download link
    await driver.findElement(By.id("downloadLink")).click();

    // Wait for download to complete (assuming)
    await driver.sleep(5000);

    // Generate certificate data
    const certificateData = {
      studentName: "Sam",
      certificateType: "School Leaving",
      generatedAt: new Date(),
      remarks: "This is a test remark.",
    };

    // Store certificate data in MongoDB
    await yourMongoDBCollection.insertOne(certificateData);

    console.log("Certificate generated successfully!");
  } catch (error) {
    console.error("An error occurred while generating certificate:", error);
    throw error; // Rethrow the error to handle it in the main script
  }
}

module.exports = generateCertificate;
