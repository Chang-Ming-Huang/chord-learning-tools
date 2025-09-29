const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport to desktop size (1200px width as specified)
  await page.setViewport({ width: 1400, height: 900 });

  // Load the HTML file
  const filePath = 'file://' + path.resolve(__dirname, 'chord-progression.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // Wait a bit for any animations or dynamic content
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Take screenshot
  await page.screenshot({
    path: 'chord-progression-screenshot.png',
    fullPage: false
  });

  console.log('Screenshot saved as chord-progression-screenshot.png');

  await browser.close();
})();