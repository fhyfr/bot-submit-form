import puppeteer from "puppeteer";
import { faker } from "@faker-js/faker";

import dotenv from "dotenv";
dotenv.config();

async function submitForm() {
  const url = process.env.TARGET_URL;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);

    // Click the button to open the form
    // await page.click(".elementor-button-wrapper a.elementor-button");

    // Generate random data
    const formData = {
      name: faker.person.fullName(),
      comment:
        "Congratulations for your wedding! I hope you have a great life together!",
      konfirmasi: "Masih Ragu",
    };

    console.log("Submitting form with data:", formData);

    // Fill out the form
    await page.type('input[name="author"]', formData.name);
    // Input text into the textarea
    await page.type("#cui-textarea-22162", formData.comment);
    // Select the option "Masih Ragu"
    await page.select("#konfirmasi", "Masih Ragu");

    // Submit the form by clicking the submit button
    await page.click('input[name="submit"]');

    console.log("Form submitted successfully \n");
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    await browser.close();
  }
}

// Execute the function multiple times
const numberOfExecutions = process.env.NUMBER_OF_REQUESTS; // Change this to the desired number of executions

for (let i = 0; i < numberOfExecutions; i++) {
  console.log(`Execution number ${i + 1}:`);
  await submitForm();

  // Random delay between 1 and 5 seconds
  const delay = Math.floor(Math.random() * 5) + 1;
  console.log(`Waiting for ${delay} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, delay * 1000));
}
