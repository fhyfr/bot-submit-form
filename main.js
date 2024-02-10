const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");

require("dotenv").config();

async function submitFormData() {
  const url = process.env.TARGET_URL;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let counter = 0;

  try {
    while (true) {
      counter++;
      console.log("Request number #" + counter);

      await page.goto(url);

      // Generate random data
      const formData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        whatsapp: `081${faker.number.int({
          min: 1000000000,
          max: 9999999999,
        })}`,
        dateOfBirth: formatDate(
          faker.date.between({ from: "1950-01-01", to: "2000-12-31" })
        ),
      };

      console.log("Submitting form with data:", formData);

      // Fill out the form
      await page.type(
        'input[name="wnd_ShortTextField_572872053"]',
        formData.name
      );
      await page.type(
        'input[name="wnd_ShortTextField_865737820"]',
        formData.email
      );
      await page.type(
        'input[name="wnd_ShortTextField_614639426"]',
        formData.password
      );
      await page.type(
        'input[name="wnd_PhoneField_262975746"]',
        formData.whatsapp
      );
      await page.type(
        'input[name="wnd_DateField_619475723"]',
        formData.dateOfBirth
      );

      // Submit the form
      await page.click('button[type="submit"]');

      console.log("Form submitted successfully \n");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    await browser.close();
  }
}

function formatDate(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

submitFormData();
